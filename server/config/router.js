import { Router } from "express";
const router = Router();
import { getTeamData } from "../controllers/teamsController.js";
import { getTeamAndMemberData } from "../controllers/teamsController.js";
import { allTeamMembersPRs } from "../controllers/teamsController.js";
import { teamAndMemberInfo } from "../controllers/teamsController.js";

router.route("/team").get(getTeamData); // PATH TO GET ALL TEAMS INFORMATION FROM fp_teams TABLE IN DATABASE

router.route("/team-members").get(getTeamAndMemberData); // PATH TO GET ALL TEAMS INFORMATION FROM fp_teams AND fp_members TABLES IN DATABASE. SEARCH QUERY INCLUDED

router.route("/teamPr").get(allTeamMembersPRs); //PATH TO GET ALL TEAMS PR COUNT

router.route("/teamInfo/:id").get(teamAndMemberInfo); //PATH TO GET SPECIFIC TEAM PR COUNT BY ID

export default router;
