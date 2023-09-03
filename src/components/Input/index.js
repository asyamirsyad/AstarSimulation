import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({  id, disabled, onChange, label, ...props }) => {
  return (
    <Form.Group style={{ fontFamily: "monospace" }}>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          id={id}
          onChange={onChange}
          disabled={disabled}
          style={{ borderRadius: 4 }}
          {...props}
        />
      </InputGroup>
    </Form.Group>
  );
};
export default Input;
