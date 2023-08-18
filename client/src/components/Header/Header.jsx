import React from "react";
import logo from "../../images/cyf-logo.png";
import NavBar from "../NavBar/NavBar.jsx";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <header className="App-header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="CYF logo" />
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
