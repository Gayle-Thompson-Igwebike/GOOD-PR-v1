import React from "react";
import GitHubIcon from "../../images/github-mark.svg";
import "./GitHubIcon.css";

const GitHubIconSvg = ({ teamRepo }) => {
  return (
    <div className="icons-container">
      <a className="githubRepo-icon" href={teamRepo}>
        <img src={GitHubIcon} alt="github icon" />
      </a>
    </div>
  );
};

export default GitHubIconSvg;
