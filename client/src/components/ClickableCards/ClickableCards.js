import React from "react";
import "./ClickableCards.css";

const ClickableCards = ({ teamName, teamStatuses, teamId }) => {
  const teamStatus = teamStatuses.find((status) => status.teamId === teamId);
  if (!teamStatuses || teamStatuses.length === 0) {
    return null
  };

  // console.log("Team Name:", teamName);
  // console.log("Team Status:", teamStatus);
  // console.log("Team ID:", teamId);
  // console.log("Team Statuses:", teamStatuses);


  const boxClass = teamStatus?.anyIntervene
    ? "team-box red"
    : teamStatus?.anyAmber
    ? "team-box amber"
    : teamStatus?.allOk
    ? "team-box green"
    : "team-box";

  return (
    <main>
      <div className={boxClass}>{teamName}</div>
    </main>
  );
};

export default ClickableCards;
