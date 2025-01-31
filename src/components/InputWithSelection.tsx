import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";

interface Props {
  title: string;
  disabled: boolean;
  handleToken: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  token: string;
  symbols: string[];
  balances: number[];
  handleInput: (e: React.ChangeEvent<any>) => void
  value: string | undefined
}

export const InputWithSelection = ({
  title,
  disabled,
  handleToken,
  token,
  symbols,
  balances,
  handleInput,
  value,
}: Props) => {
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
        {title === "Input" ? (
          <Form.Control
            type="number"
            placeholder="0.0"
            min="0.0"
            step="any"
            onChange={(e) => handleInput(e)}
            disabled={disabled}
            className="bg-light border-primary purple"
          />
        ) : (
          <Form.Control
            type="number"
            placeholder="0.0"
            min="0.0"
            step="any"
            value={value}
            disabled={disabled}
            className="bg-light border-primary purple"
          />
        )}
        <DropdownButton
          variant="outline-primary purple fw-bold"
          title={token ? token : "Select Token"}
        >
          <Dropdown.Item onClick={(e) => handleToken(e)}>RUMP</Dropdown.Item>
          <Dropdown.Item onClick={(e) => handleToken(e)}>USD</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </Row>
  );
};

export default InputWithSelection;
