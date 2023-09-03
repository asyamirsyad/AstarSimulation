import React from "react";
import ButtonBootstrap from "react-bootstrap/Button";

const Button = ({ children, ...props }) => {
  return <ButtonBootstrap {...props}>{children}</ButtonBootstrap>;
};
export default Button;
