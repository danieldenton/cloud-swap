import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { loadBalances, addLiquidity } from "../store/interactions";
import { RootState } from "../types/state";

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

  const handleAmount = async (e) => {
    if (e.target.id === "token1") {
      setToken1Amount(e.target.value);
      const _token1Amount = ethers.utils.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenDeposit(
        tokens[0].address,
        _token1Amount,
        tokens[1].address
      );
      const _token2Amount = ethers.utils.formatUnits(
        result.toString(),
        "ether"
      );
      setToken2Amount(_token2Amount);
    } else {
      setToken2Amount(e.target.value);
      const _token2Amount = ethers.utils.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenDeposit(
        tokens[1].address,
        _token2Amount,
        tokens[0].address
      );
      const _token1Amount = ethers.utils.formatUnits(
        result.toString(),
        "ether"
      );
      setToken1Amount(_token1Amount);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    const _token1Amount = ethers.utils.parseUnits(token1Amount, "ether");
    const _token2Amount = ethers.utils.parseUnits(token2Amount, "ether");
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
            <Row className="my-3">
              <Form.Text className="text-end my-2 purple fw-bold">
                Balance: {balances[0]}
              </Form.Text>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0.0"
                  min="0.0"
                  step="any"
                  id="token1"
                  onChange={handleAmount}
                  value={token1Amount === "" ? "" : token1Amount}
                  className="bg-light border-primary"
                />
                <InputGroup.Text
                  style={{ width: "100px" }}
                  className="justify-content-center purple fw-bold bg-light border-primary"
                >
                  {symbols && symbols[0]}
                </InputGroup.Text>
              </InputGroup>
            </Row>
            <Row className="my-3">
              <Form.Text className="text-end my-2 purple fw-bold">
                Balance: {balances[1]}
              </Form.Text>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0.0"
                  step="any"
                  id="token2"
                  onChange={handleAmount}
                  value={token2Amount === "" ? "" : token2Amount}
                  className="border-primary"
                />
                <InputGroup.Text
                  style={{ width: "100px" }}
                  className="justify-content-center purple fw-bold bg-light border-primary"
                >
                  {symbols && symbols[1]}
                </InputGroup.Text>
              </InputGroup>
            </Row>
            <Row>
              {isDepositing ? (
                <Spinner
                  animation="border"
                  style={{ display: "block", margin: "0 auto", color: "red" }}
                />
              ) : (
                <Button
                  type="submit"
                  className="fw-bold"
                  style={{
                    backgroundColor: "#D8BFD8",
                    color: "purple",
                    border: "solid purple 2px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  Deposit
                </Button>
              )}
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
      {isDepositing ? (
        <Alert
          message={"Deposit Pending..."}
          transactionHash={null}
          variant={"info"}
          setShowAlert={setShowAlert}
        />
      ) : isSuccess && showAlert ? (
        <Alert
          message={"Deposit Successful"}
          transactionHash={transactionHash}
          variant={"success"}
          setShowAlert={setShowAlert}
        />
      ) : !isSuccess && showAlert ? (
        <Alert
          message={"Deposit Failed"}
          transactionHash={null}
          variant={"danger"}
          setShowAlert={setShowAlert}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Deposit;
