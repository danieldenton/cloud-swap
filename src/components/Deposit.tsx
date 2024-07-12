import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { loadBalances, addLiquidity } from "../store/interactions";
import { RootState } from "../types/state";

import InputWithoutSelection from "./InputWithoutSelection";
import ButtonComponent from "./BottonComponent";
import Alert from "./Alert";

export const Deposit = () => {
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.provider.connection);
  const account = useSelector((state: RootState) => state.provider.account);
  const tokens = useSelector((state: RootState) => state.tokens.contracts);
  const symbols = useSelector((state: RootState) => state.tokens.symbols);
  const balances = useSelector((state: RootState) => state.tokens.balances);
  const amm = useSelector((state: RootState) => state.amm.contract);
  const isDepositing = useSelector(
    (state: RootState) => state.amm.depositing.isDepositing
  );
  const isSuccess = useSelector(
    (state: RootState) => state.amm.depositing.isSuccess
  );
  const transactionHash = useSelector(
    (state: RootState) => state.amm.depositing.transactionHash
  );

  const handleAmount = async (e: React.ChangeEvent<any>) => {
    if (e.target.id === "token1") {
      setToken1Amount(e.target.value);
      const _token1Amount = ethers.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenDeposit(
        tokens[0].address,
        _token1Amount,
        tokens[1].address
      );
      const _token2Amount = ethers.formatUnits(
        result.toString(),
        "ether"
      );
      setToken2Amount(_token2Amount);
    } else {
      setToken2Amount(e.target.value);
      const _token2Amount = ethers.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenDeposit(
        tokens[1].address,
        _token2Amount,
        tokens[0].address
      );
      const _token1Amount = ethers.formatUnits(
        result.toString(),
        "ether"
      );
      setToken1Amount(_token1Amount);
    }
  };

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);

    const _token1Amount = ethers.parseUnits(token1Amount, "ether");
    const _token2Amount = ethers.parseUnits(token2Amount, "ether");
    await addLiquidity(
      provider,
      amm,
      tokens,
      [_token1Amount, _token2Amount],
      dispatch
    );
    await loadBalances(amm, tokens, account, dispatch);
    setShowAlert(true);
  };

  return (
    <div>
      <Card
        style={{
          maxWidth: "500px",
          backgroundColor: "#87CEEB",
          border: "solid 2px purple",
          borderRadius: "10px",
          height: "398px",
        }}
        className="mx-auto px-4"
      >
        {account ? (
          <Form
            onSubmit={handleDeposit}
            style={{ maxWidth: "450px", margin: "50px auto" }}
          >
            <InputWithoutSelection
              balance={balances[0]}
              shares={null}
              handleAmount={handleAmount}
              tokenAmount={token1Amount}
              symbol={symbols[0]}
            />
            <InputWithoutSelection balance={balances[1]}
              shares={null}
              handleAmount={handleAmount}
              tokenAmount={token2Amount}
              symbol={symbols[1]}/>
            <Row>
              <ButtonComponent spinner={isDepositing} title={"Deposit"} />
            </Row>
          </Form>
        ) : (
          <p
            className="d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            Please connect wallet
          </p>
        )}
      </Card>
      <Alert
        title={"Deposit"}
        transactionHash={transactionHash}
        setShowAlert={setShowAlert}
        isAction={isDepositing}
        isSuccess={isSuccess}
        showAlert={showAlert}
      />
    </div>
  );
};

export default Deposit;
