import React from "react";
import DeveloperProfile from "../DeveloperProfile/DeveloperProfile";
import "./TeamAlphaDetails.css";

const teamAlphaData = [
  {
    name: "Saghar Hosseinmardi",
    role: "Full-Stack Developer",
    githubLink: "https://github.com/SagharHosseinmardi",
    linkedinLink: "https://www.linkedin.com/in/saghar-hosseinmardi-5b0919244/",
  },
  {
    name: "Andriana Saffo",
    role: "Full-Stack Developer",
    githubLink: "https://github.com/AndrianaOS",
    linkedinLink: "https://www.linkedin.com/in/andriana-saffo/",
  },
  {
    name: "George Primentas",
    role: "Front-End Developer",
    githubLink: "https://github.com/GeorgePrimentas",
    linkedinLink: "https://www.linkedin.com/in/georgeprimentas/",
  },
  {
    name: "Gayle Thompson Igwebike",
    role: "Full-Stack Developer",
    githubLink: "https://github.com/Gayle-Thompson-Igwebike",
    linkedinLink:
      "https://www.linkedin.com/in/gayle-thompson-igwebike-624004228/",
  },
];

const TeamAlphaDetails = () => {
  return (
    <div className="person-card-container">
      <h1 className="centered-heading">We are Team Alpha</h1>
      <p className="centered-heading">
        <span className="name-text">Saghar</span>,{" "}
        <span className="name-text">Andriana</span>,{" "}
        <span className="name-text">George</span>,{" "}
        <span className="name-text">Gayle</span>
      </p>

      <h2 className="centered-heading">CYF London#9 Trainees</h2>
      <h3 class="centered-heading">
        The <span class="colored-text">PR Tracker</span> is our Final Project
      </h3>
      <div className="team-alpha-cards">
        {teamAlphaData.map((person, index) => (
          <DeveloperProfile key={index} person={person} />
        ))}
      </div>
      <p className="white-text">-</p>
      {/* <p className="white-text">-</p> */}
    </div>
  );
};

export default TeamAlphaDetails;
