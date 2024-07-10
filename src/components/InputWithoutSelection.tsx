import React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const InputWithoutSelection = ({
  balance,
  shares,
  handleAmount,
  tokenAmount,
  symbol,
}) => {
  return (
    <Row className="my-3">
      <Form.Text className="text-end my-2 purple fw-bold">
        {balance ? `Balance: ${balance}` : `Shares: ${shares}`}
        
      </Form.Text>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="0.0"
          min="0.0"
          step="any"
          id="token1"
          onChange={handleAmount}
          value={tokenAmount === "" ? "" : tokenAmount}
          className="bg-light border-primary"
        />
        <InputGroup.Text
          style={{ width: "100px" }}
          className="justify-content-center purple fw-bold bg-light border-primary"
        >
          {symbol}
        </InputGroup.Text>
      </InputGroup>
    </Row>
  );
};

export default InputWithoutSelection;
