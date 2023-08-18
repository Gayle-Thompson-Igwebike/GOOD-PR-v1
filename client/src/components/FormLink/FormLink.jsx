import React from "react";
import "./FormLink.css";
import { Link } from "react-router-dom";

const TeamNotRegistered = () => {
  // const formLinkStyle = {
  //   backgroundColor: "red",
  //   color: "white",
  //   textDecoration: "none",
  //   padding: "5px",
  //   borderRadius: "3px",
  // };

  return (
    <div>
      <Link to="/form" className="formLink">
        Can't find your team? Click here to register.
      </Link>

      {/* <a href="/registration-form-link-here" style={formLinkStyle} > 
           Can't find your team? Click here to register. 
          </a> */}
    </div>
  );
};

export default TeamNotRegistered;
