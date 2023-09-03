import React from "react";
import ButtonBootstrap from "react-bootstrap/Button";
import "./style.scss";

const Button = ({ className, variant, children, ...props }) => {
  return (
    <ButtonBootstrap variant={variant} className={className} {...props}>
      {children}
    </ButtonBootstrap>
  );
};
export default Button;
