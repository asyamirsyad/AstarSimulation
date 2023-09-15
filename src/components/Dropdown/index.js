import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./style.scss";

const Drop = ({ label = "", options = [], onSelect, setLabel, ...props }) => {
  const [initialLabel, setInitialLabel] = useState(label);

  const handleSelect = (value) => {
    setInitialLabel(value);
    onSelect?.(value);
  };

  return (
    <Dropdown onSelect={handleSelect} {...props}>
      <Dropdown.Toggle style={{ width: "100%" }}>
        {setLabel || initialLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          backgroundColor: "white",
          border: "solid 1px #000",
          borderRadius: 4,
          fontFamily: "monospace",
        }}
      >
        {options?.map(({ label, value }) => {
          return <Dropdown.Item eventKey={value}>{label}</Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default Drop;
