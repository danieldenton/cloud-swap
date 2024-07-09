import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";

export const InputWithSelection = ({
  title,
  disabled,
  handleInputToken,
  token,
  symbols,
  balances,
  handleInput,
}) => {
  return (
    <Row className="my-3">
      <div className="d-flex justify-content-between">
        <Form.Label className="purple fw-bold">
          <strong>{title}</strong>
        </Form.Label>
        <Form.Text className="purple fw-bold">
          Balance:{" "}
          {token === symbols[0]
            ? balances[0]
            : token === symbols[1]
            ? balances[1]
            : 0}
        </Form.Text>
      </div>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="0.0"
          min="0.0"
          step="any"
          onChange={title === "Input" ? (e) => handleInput(e) : undefined}
          disabled={disabled}
          className="bg-light border-primary purple"
        />
        <DropdownButton
          variant="outline-primary"
          title={token ? token : "Select Token"}
        >
          <Dropdown.Item onClick={(e) => handleInputToken(e)}>
            RUMP
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleInputToken(e)}>
            USD
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </Row>
  );
};

export default InputWithSelection;
