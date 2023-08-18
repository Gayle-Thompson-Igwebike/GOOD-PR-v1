import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ({ title }) => {

return (
  <footer className="App-footer">
    <p>
      Made with love by{" "}
      <Link className="footer-link" to="/team-alpha">
        Team Alpha
      </Link>{" "}
      in the Summer of 2023
    </p>
  </footer>
);

}

export default Footer;