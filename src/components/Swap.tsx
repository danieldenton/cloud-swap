import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { utils } from "ethers";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { swap, loadBalances } from "../store/interactions";

import InputWithSelection from "./InputWithSelection";
import ButtonComponent from "./BottonComponent";
import Alert from "./Alert";
import { RootState } from "../types/state";

export const Swap = () => {
  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");
  const [inputTokenAddress, setInputTokenAddress] = useState("");
  const [outputTokenAddress, setOutputTokenAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [price, setPrice] = useState(0);
  const [fee, setFee] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.provider.connection);
  const account = useSelector((state: RootState) => state.provider.account);
  const tokens = useSelector((state: RootState) => state.tokens.contracts);
  const symbols = useSelector((state: RootState) => state.tokens.symbols);
  const balances = useSelector((state: RootState) => state.tokens.balances);
  const amm = useSelector((state: RootState) => state.amm.contract);
  const isSwapping = useSelector(
    (state: RootState) => state.amm.swapping.isSwapping
  );
  const isSuccess = useSelector(
    (state: RootState) => state.amm.swapping.isSuccess
  );
  const transactionHash = useSelector(
    (state: RootState) => state.amm.swapping.transactionHash
  );

  const getPrice = async () => {
    if (inputToken === outputToken) {
      setPrice(0);
      return;
    }
    if (inputToken === "RUMP") {
      setPrice((await amm.token2Balance()) / (await amm.token1Balance()));
    } else {
      setPrice((await amm.token1Balance()) / (await amm.token2Balance()));
    }
  };

  const handleInputToken = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setInputToken(target.innerHTML);
    if (inputToken && outputToken) {
      getPrice();
    }
  };

  const handleOutputToken = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setOutputToken(target.innerHTML);
    if (inputToken && outputToken) {
      getPrice();
    }
  };

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!outputToken) {
      window.alert("Please select a token");
      return;
    }
    if (inputToken === outputToken) {
      window.alert("Invalid token pair");
      return;
    }
    if (inputToken === "RUMP") {
      setInputTokenAddress(tokens[0].address);
      setOutputTokenAddress(tokens[1].address);
    } else {
      setInputTokenAddress(tokens[1].address);
      setOutputTokenAddress(tokens[0].address);
    }
    if (e.target.value === "0" || e.target.value === "") {
      setOutputAmount("");
    } else {
      setInputAmount(e.target.value);
      const _token1Amount = utils.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenSwap(
        inputTokenAddress,
        outputTokenAddress,
        _token1Amount
      );
      const _token2Amount = utils.formatUnits(result[0].toString(), "ether");
      const _fee = utils.formatUnits(result[1].toString(), "ether");
      setOutputAmount(_token2Amount);
      setFee(_fee);
    }
  };

  const handleSwap = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);
    if (inputToken === outputToken) {
      window.alert("Invalid token pair");
      return;
    }
    const _inputAmount = utils.parseUnits(inputAmount, "ether");
    if (inputToken === "RUMP") {
      await swap(provider, amm, tokens[0], tokens[1], _inputAmount, dispatch);
    } else {
      await swap(provider, amm, tokens[1], tokens[0], _inputAmount, dispatch);
    }
    await loadBalances(amm, tokens, account, dispatch);
    await getPrice();
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
            onSubmit={handleSwap}
            style={{ maxWidth: "450px", margin: "50px auto" }}
          >
            <InputWithSelection
              title={"Input"}
              disabled={!inputToken}
              handleToken={handleInputToken}
              token={inputToken}
              symbols={symbols}
              balances={balances}
              handleInput={handleInput}
              value={undefined}
            />
            <InputWithSelection
              title={"Output"}
              disabled={true}
              handleToken={handleOutputToken}
              token={outputToken}
              symbols={symbols}
              balances={balances}
              handleInput={handleInput}
              value={outputAmount}
            />
            <Row>
              <ButtonComponent spinner={isSwapping} title="Swap" />
              {isSwapping ? (
                <></>
              ) : (
                <>
                  <Form.Text className="purple fw-bold">
                    Exchange Rate: {price}
                  </Form.Text>
                  <Form.Text className="purple fw-bold">
                    .03% Fee: {fee}
                  </Form.Text>
                </>
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
      <Alert
        title={"Swap"}
        transactionHash={transactionHash}
        setShowAlert={setShowAlert}
        isAction={isSwapping}
        isSuccess={isSuccess}
        showAlert={showAlert}
      />
    </div>
  );
};

export default Swap;
