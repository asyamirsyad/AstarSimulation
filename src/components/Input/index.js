import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({ id, disabled, onChange, label, ...props }) => {
  return (
    <Form.Group>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          id={id}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </InputGroup>
    </Form.Group>
  );
};
export default Input;
