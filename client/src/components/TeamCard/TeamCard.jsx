import React, { useEffect, useState } from "react";
import "./TeamCard.css";
import CardInfo from "../CardInfo/CardInfo";
import HundredSquareChart from "../HundredSquareChart/HundredSquareChart";
import { useParams } from "react-router-dom";
import DeployedAppIconSvg from "../Icons/DeployedAppIconSvg";
import GitHubIconSvg from "../Icons/GitHubIconSvg";
import GoogleDocsLogoSvg from "../Icons/GoogleDocIconSvg";
import SlackIconSvg from "../Icons/SlackIconSvg";
import ProjectBoardIconSvg from "../Icons/ProjectBoardIconSvg";

const TeamCard = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  const [rawData, setRawData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  function getAllTeamData() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/team`)
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    async function fetchRawData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/teamPr`
        );
        const rawData = await response.json();
        setRawData(rawData);
      } catch (error) {
        console.error("Error fetching raw data:", error);
      }
    }

    fetchRawData();
    getAllTeamData();
  }, []);

  const team = rawData.find((team) => team.id === numericId);
  const usersData = team?.users || {};

  const teamInfo = teamData.find((eachTeam) => eachTeam.id === numericId);

  const data = [];
  for (const user in usersData) {
    data.push(user, usersData[user]);
  }

  if (!team) {
    return null; // Handle the case where the team is not found
  }

  return (
    <div>
      <div className="card-top">
        <div className="small-team-btn">
          <p>{team ? team.teamName : "Team"}</p>
        </div>
        <HundredSquareChart data={data} />
      </div>
      <CardInfo numericId={numericId} />
      <div className="icons-container">
        <GitHubIconSvg teamRepo={teamInfo.repo_link} />
        <GoogleDocsLogoSvg teamBrief={teamInfo.project_brief} />
        <SlackIconSvg teamSlack={teamInfo.slack_channel} />
        <DeployedAppIconSvg teamSite={teamInfo.deployed_site} />
        <ProjectBoardIconSvg teamBoard={teamInfo.project_board} />
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default TeamCard;
