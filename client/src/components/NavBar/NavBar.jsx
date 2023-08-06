import React, { useState, useEffect } from "react";
import './NavBar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from "../Form/Form";

const NavBar = ({ title }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false); // State for hamburger menu visibility
  const [showAbout, setShowAbout] = useState(false); // State for showing the About component
  const [showForm, setShowForm] = useState (false); //(To hide Form upon page load)

  // Update windowWidth state on window resize
  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // Update windowWidth state on window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle hamburger menu visibility
  const handleHamburgerClick = () => {
    setShowMenu(!showMenu);
  };

  //Toggle Form visibility upon clicking Team regitration nav bar element
  const handleTeamRegistrationFormClick = () => {
    setShowForm(!showForm);
  }

  // Add event listener for hamburger menu visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowMenu(false); // Hide the off-canvas menu on window resize
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
            <Link to="/">
              Home
            </Link>
            {/* <Link to="/form">
              Team Registration
            </Link> */}
            <Link to="/search">
              Search
            </Link>
              <button className="link-button" onClick={handleTeamRegistrationFormClick}>
            Team Registration
          </button>
          </nav>
        )}
        {showMenu && (
          <div className={`off-canvas-menu ${showMenu ? "show-off-canvas-menu" : ""}`}>
            <Link to="/" className="list-links">
              Home
            </Link>
             <button className="list-links" onClick={handleTeamRegistrationFormClick}>
            Team Registration
          </button>
            <Link to="/search" className="list-links">
              Search
            </Link>
          </div>
        )}

         {showForm && (
        <div className="team-registration-form">
          <Form/>
        </div>
      )}
      </div>
     
  );
}

export default NavBar;