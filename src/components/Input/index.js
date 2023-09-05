import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

const Input = ({
  placeholder,
  suffix,
  type,
  id,
  disabled,
  onChange,
  label,
  ...props
}) => {
  let inputType;
  let inputAs;
  let inputSuffix = suffix || "";
  let inputPlaceholder = placeholder || "";

  switch (type) {
    case "text":
      inputType = "text";
      break;
    case "number":
      inputAs = NumericFormat;
      inputType = "number";
      inputSuffix = suffix;
      break;
    default:
      inputType = "text";
      break;
  }
  return (
    <Form.Group style={{ fontFamily: "monospace" }}>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          id={id}
          as={inputAs}
          suffix={inputSuffix}
          onChange={onChange}
          disabled={disabled}
          placeholder={inputPlaceholder}
          style={{ borderRadius: 4 }}
          {...props}
        />
      </InputGroup>
    </Form.Group>
  );
};
export default Input;
