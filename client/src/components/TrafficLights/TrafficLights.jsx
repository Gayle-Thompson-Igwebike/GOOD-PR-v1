import  { useEffect } from "react";

const TrafficLights = ({ teams, setTeamStatuses }) => {
  useEffect(() => {
    console.log("Teams received:", teams); // Log the received teams prop

    const calculatedStatuses = teams.map((team) => {
      console.log("Calculating for team:", team.id); // Log the current team being processed

      const totalPullRequests = team.pullRequestCount;
      const sizeOfTeam = Object.keys(team.users).length;

      const minimumContribution = 100 / (sizeOfTeam + 1);
      const maximumContribution = 100 / (sizeOfTeam - 1);
      // Amber range
      const minimumAmberContribution = 100 / (sizeOfTeam + 1 - 0.5);
      const maximumAmberContribution = 100 / (sizeOfTeam - 1 + 0.5);

      const usersWithStatus = Object.entries(team.users).map(
        ([user, prCount]) => {
          const percentage = (prCount / totalPullRequests) * 100;
          const contribution = percentage.toFixed(2);
          // Old code
          // const status =
          //   contribution >= minimumContribution &&
          //   contribution <= maximumContribution
          //     ? "OK"
          //     : "INTERVENE";

          // New code
            const status =
              contribution < minimumContribution ||
              contribution > maximumContribution
                ? "INTERVENE"
                : contribution <= minimumAmberContribution ||
                  contribution >= maximumAmberContribution
                ? "AMBER"
                : "OK";

                       console.log(
    `User: ${user}, PR Count: ${prCount}, Contribution: ${contribution}%, Status: ${status}`
  );


          return {
            user,
            prCount,
            contribution: contribution + "%",
            status,
          };
        }
      );

      // Old code
      // const anyIntervene = usersWithStatus.some(
      //   (user) => user.status === "INTERVENE"
      // );
      // const allOk = !usersWithStatus.some(
      //   (user) => user.status === "INTERVENE"
      // );

      // New code (lines 58-66)
      const anyIntervene = usersWithStatus.some(
        (user) => user.status === "INTERVENE"
      );

      const anyAmber = usersWithStatus.some(
        (user) => user.status === "AMBER"
      );

      const allOk = !anyIntervene && !anyAmber;

      console.log("Users with Status:", usersWithStatus); // Log the calculated usersWithStatus array

      return {
        teamId: team.id,
        anyIntervene,
        anyAmber,
        allOk,
      };
    });

    console.log("Calculated Statuses:", calculatedStatuses); // Log the calculated statuses array

    // Update the teamStatuses state using setTeamStatuses function
    setTeamStatuses(calculatedStatuses);

    console.log("Updated teamStatuses:", calculatedStatuses); // Log the updated teamStatuses state
  }, [teams, setTeamStatuses]);

  return null; // This component doesn't render anything
};

export default TrafficLights;
