// import "./Home.css";
import React, { useState, useEffect } from "react";
import FormLink from "../FormLink/FormLink";
import ClickableCards from "../ClickableCards/ClickableCards";
import Search from "../Search/Search";
import TrafficLights from "../TrafficLights/TrafficLights";
import { Link, useNavigate } from "react-router-dom";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";



function Home() {
  const [teamAndMemberData, setTeamAndMemberData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [teamStatuses, setTeamStatuses] = useState([]); // Define the teamStatuses state
  
  const navigate = useNavigate();

  const handleClick = (id) => {
    // Scroll to the top of the page when the link is clicked
    window.scrollTo(0, 0);
    // Navigate to the specified route using the `navigate` function
    navigate(`/${id}`);
  };

  async function getAllTeamsAndMembersData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/teamPr`
      );
      const data = await response.json();
      setTeamAndMemberData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function getAllTeamData() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/team`)
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
      })
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    getAllTeamsAndMembersData();
    getAllTeamData();
   
  }, []);

  return (
    <div className="App">
      <WelcomeMessage />
      <section className="team-buttons">
        {teamData.length > 0 &&
          teamData.map((eachTeam) => (
            <Link
              to={`/${eachTeam.id}`}
              key={eachTeam.id}
              onClick={() => handleClick(eachTeam.id)}
            >
              <ClickableCards
                teamName={eachTeam.team_name}
                teamId={eachTeam.id}
                teamStatuses={teamStatuses} // Pass teamStatuses to ClickableCards
              />

            </Link>
          ))}
      </section>
      
      <TrafficLights
        teams={teamAndMemberData}
        setTeamStatuses={setTeamStatuses}
      />{" "}
      <FormLink />
      <Search />
    </div>
  );
}

export default Home;
