import { Form } from "react-bootstrap";

export const CheckBox = ({ label, chekedValue, onChange }) => {
  return (
    <Form.Group
      style={{
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form.Check
        style={{ display: "flex", alignItems: "center" }}
        checked={chekedValue}
      >
        <Form.Check.Input
          checked={chekedValue}
          style={{ width: 20, height: 20 }}
          onChange={(e) => {
            onChange?.(e);
          }}
        />
        <Form.Check.Label>{label}</Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
};
