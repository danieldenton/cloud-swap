import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import { removeLiquidity, loadBalances } from "../store/interactions";

import Alert from "./Alert";
import { RootState } from "../types/state";

export const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.provider.connection);
  const account = useSelector((state: RootState) => state.provider.account);
  const tokens = useSelector((state: RootState) => state.tokens.contracts);
  const balances = useSelector((state: RootState) => state.tokens.balances);
  const amm = useSelector((state: RootState) => state.amm.contract);
  const shares = useSelector((state: RootState) => state.amm.shares);
  const isWithdrawing = useSelector(
    (state: RootState) => state.amm.withdrawing.isWithdrawing
  );
  const isSuccess = useSelector(
    (state: RootState) => state.amm.withdrawing.isSuccess
  );
  const transactionHash = useSelector(
    (state: RootState) => state.amm.withdrawing.transactionHash
  );

  const handleInput = (e: React.ChangeEvent<any>) => {
    const inputValue: number = parseInt(e.target.value);
    if (e.target.value === "") {
      setAmount(0);
      return;
    }
    setAmount(inputValue);
  }

  const handleWithdraw = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setShowAlert(false);
    const _shares = ethers.utils.parseUnits(amount.toString(), "ether");
    await removeLiquidity(provider, amm, _shares, dispatch);
    await loadBalances(amm, tokens, account, dispatch);
    setShowAlert(true);
    setAmount(0);
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
            onSubmit={handleWithdraw}
            style={{ maxWidth: "450px", margin: "50px auto" }}
          >
            <Row className="my-3">
              <Form.Text className="text-end my-2 purple fw-bold">
                Shares: {shares}
              </Form.Text>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="0"
                  min="0.0"
                  step="any"
                  id="shares"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => handleInput(e)}
                  className="border-primary"
                />
                <InputGroup.Text
                  style={{ width: "100px" }}
                  className="justify-content-center purple fw-bold bg-light border-primary"
                >
                  Shares
                </InputGroup.Text>
              </InputGroup>
            </Row>
            <Row>
              {isWithdrawing ? (
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
                  Withdraw
                </Button>
              )}
            </Row>
            <hr />
            <Row>
              <p className="purple">
                <strong>RUMP Balance: </strong>
                {balances[0]}
              </p>
              <p className="purple">
                <strong>USD Balance: </strong>
                {balances[1]}
              </p>
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
      {isWithdrawing ? (
        <Alert
          message={"Withdraw Pending..."}
          transactionHash={null}
          variant={"info"}
          setShowAlert={setShowAlert}
        />
      ) : isSuccess && showAlert ? (
        <Alert
          message={"Withdraw Successful"}
          transactionHash={transactionHash}
          variant={"success"}
          setShowAlert={setShowAlert}
        />
      ) : !isSuccess && showAlert ? (
        <Alert
          message={"Withdraw Failed"}
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

export default Withdraw;
