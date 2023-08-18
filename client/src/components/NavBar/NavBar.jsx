import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ title }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburgerClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowMenu(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showHamburgerMenu = windowWidth < 700;

  return (
    <div className="header-content">
      <span className="header-text">PR Tracker</span>
      {showHamburgerMenu ? (
        <button
          className={`hamburger-menu ${showMenu ? "active" : ""}`}
          onClick={handleHamburgerClick}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      ) : (
        <nav className="header-links">
          <Link to="/">Home</Link>
          <Link to="/form">Team Registration</Link>
          <Link to="/search">Search</Link>
        </nav>
      )}
      {showMenu && (
        <div
          className={`off-canvas-menu ${
            showMenu ? "show-off-canvas-menu" : ""
          }`}
        >
          <div className="list-links">
            <Link to="/">Home</Link>
          </div>
          <div className="list-links">
            <Link to="/form">Team Registration</Link>
          </div>
          <div className="list-links">
            <Link to="/search">Search</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
