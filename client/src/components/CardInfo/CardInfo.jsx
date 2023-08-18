import React, { useState, useEffect } from "react";
import "../CardInfo/CardInfo.css";
import { useParams } from "react-router-dom";

const CardInfo = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [pr, setPr] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  // Total number of Team Members
  const totalTeamMembers = allUsers.length;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/teamPr`
        );
        const data = await response.json();

        const selectedTeam = data.find((team) => team.id === numericId);

        if (selectedTeam) {
          // Convert the users object into an array
          const usersArray = Object.entries(selectedTeam.users).map(
            ([username, prCount]) => ({
              username,
              prCount,
            })
          );

          setAllUsers(usersArray);
          setPr(selectedTeam.pullRequestCount);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [numericId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table id="team-info">
      <thead>
        <tr>
          <th>Team Members</th>
          <th>Pull Requests</th>
          <th>+/- Av.</th> {/* New column */}
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map(({ username, prCount }) => (
          <tr key={username}>
            <td className="name-column">
              <div className="color-square"></div>
              {username}
            </td>
            <td className="number-align">{prCount}</td>
            <td className="number-align">
              {Math.abs(prCount - pr / totalTeamMembers) < 0.499
                ? "0"
                : (prCount - pr / totalTeamMembers).toFixed(0)}
            </td>
            <td className="number-align">
              {pr !== 0 ? ((prCount / pr) * 100).toFixed(1) : 0}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardInfo;
