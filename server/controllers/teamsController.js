import { getAllTeamInfo } from "../repositories/teamsRepository.js";
import { getAllTeamAndMembersInfo } from "../repositories/teamsRepository.js";
import { getAllTeamMembersPRs } from "../repositories/teamsRepository.js";
import { getTeamAndMemberInfo } from "../repositories/teamsRepository.js";

// GETS ALL TEAMS INFORMATION FROM fp_teams TABLE IN DATABASE
export async function getTeamData(req, res) {
  try {
    const allTeamNames = await getAllTeamInfo();
    return res.status(200).json(allTeamNames);
  } catch (error) {
    console.error("Error fetching team data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GETS ALL TEAMS INFORMATION FROM fp_teams AND fp_members TABLES IN DATABASE
// IF THERE IS A SEARCH QUERY IT MODIFIES THE DATA AND PRESENTS THE RESULTS BASED ON THE SEARCH QUERY
export async function getTeamAndMemberData(req, res) {
  try {
    const searchTerm = req.query.term || "";
    const allTeamAndMemberData = await getAllTeamAndMembersInfo(searchTerm);
    return res.status(200).json(allTeamAndMemberData);
  } catch (error) {
    console.error("Error fetching team data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// RETURNS AN ARRAY OF OBJECTS FOR EACH TEAM
// THIS INCLUDES THE NUMBER OF PULL REQUESTS DONE BY EACH MEMBER OF THE TEAM BASED ON THEIR GITHUB USERNAME
export async function allTeamMembersPRs(req, res) {
  try {
    const teamsPRs = await getAllTeamMembersPRs();
    return res.status(200).json(teamsPRs);
  } catch (error) {
    console.error("Error fetching team data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// RETURNS A SPECIFIC TEAM INFORMATION DEPENDING ON THE ID
export async function teamAndMemberInfo(req, res) {
  try {
    const teamID = parseInt(req.params.id);

    const getAllTeamAndMembersInfo = await getTeamAndMemberInfo(teamID);

    return res.status(200).json(getAllTeamAndMembersInfo);
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
}
