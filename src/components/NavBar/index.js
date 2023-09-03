import React from "react";
import { Navbar as NavbarReact } from "react-bootstrap";
import "./style.scss";

const Navbar = ({ title }) => {
  return (
    <>
      <NavbarReact className="navbar-top">
        <h1 style={{ fontWeight: 700, margin: 4 }}>{title}</h1>
      </NavbarReact>
    </>
  );
};

export default Navbar;
