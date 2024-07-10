import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { swap, loadBalances } from "../store/interactions.ts";

import InputWithSelection from "./InputWithSelection.tsx"
import ButtonComponent from "./BottonComponent.tsx";
import Alert from "./Alert.tsx";
import { RootState } from "../types/state";

export const Swap = () => {
  const [inputToken, setInputToken] = useState("");
  const [outputToken, setOutputToken] = useState("");
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

  const handleInputToken = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setInputToken(target.innerHTML);
  };

  const handleOutputToken = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    setOutputToken(target.innerHTML);
  };

  const handleInput = async (e: React.ChangeEvent<any>) => {
    console.log("hey")
    if (!outputToken) {
      window.alert("Please select a token");
      return;
    }

    if (inputToken === outputToken) {
      window.alert("Invalid token pair");
      return;
    }

    if (inputAmount === "0" || inputAmount === "") {
      setOutputAmount("");
      return;
    }

    if (inputToken === "RUMP") {
      setInputAmount(e.target.value);
      const _token1Amount = ethers.utils.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenSwap(
        tokens[0].address,
        tokens[1].address,
        _token1Amount
      );
      const _token2Amount = ethers.utils.formatUnits(
        result[0].toString(),
        "ether"
      );
      console.log(_token1Amount)
      const _fee = ethers.utils.formatUnits(result[1].toString(), "ether");

      setOutputAmount(_token2Amount);
      setFee(_fee);
    } else {
      setInputAmount(e.target.value);
      const _token2Amount = ethers.utils.parseUnits(e.target.value, "ether");
      const result = await amm.calculateTokenSwap(
        tokens[1].address,
        tokens[0].address,
        _token2Amount
      );
      const _token1Amount = ethers.utils.formatUnits(
        result[0].toString(),
        "ether"
      );
      const _fee = ethers.utils.formatUnits(result[1].toString(), "ether");

      setOutputAmount(_token1Amount);
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

    const _inputAmount = ethers.utils.parseUnits(inputAmount, "ether");

    if (inputToken === "RUMP") {
      await swap(provider, amm, tokens[0], tokens[1], _inputAmount, dispatch);
    } else {
      await swap(provider, amm, tokens[1], tokens[0], _inputAmount, dispatch);
    }

    await loadBalances(amm, tokens, account, dispatch);
    await getPrice();
    setShowAlert(true);
  };

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

  useEffect(() => {
    if (inputToken && outputToken) {
      getPrice();
    }
  }, [inputToken, outputToken]);

  const alertProps = [
    {
      message: "Swap Pending...",
      transactionHash: "",
      variant: "info",
    },
    {
      message: "Swap Successful",
      transactionHash: transactionHash,
      variant: "success",
    },
    {
      message: "Swap Failed",
      transactionHash: "",
      variant: "danger",
    },
  ];

  const alerts = alertProps.map((a, idx) => {
    return (
      <Alert
        key={idx}
        message={a.message}
        transactionHash={a.transactionHash}
        variant={a.variant}
        setShowAlert={setShowAlert}
      />
    );
  });

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
              handleInputOrValue={handleInput}
            />
            <InputWithSelection
              title={"Output"}
              disabled={true}
              handleToken={handleOutputToken}
              token={outputToken}
              symbols={symbols}
              balances={balances}
              handleInputOrValue={outputAmount}
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
      {isSwapping ? (
        <>{alerts[0]}</>
      ) : isSuccess && showAlert ? (
        <>{alerts[1]}</>
      ) : !isSuccess && showAlert ? (
        <>{alerts[2]}</>
      ) : null}
    </div>
  );
};

export default Swap;
