import { Router } from "express";
const router = Router();
import { getTeamData } from "../controllers/teamsController.js";
import { getTeamAndMemberData } from "../controllers/teamsController.js";

router.route("/team").get(getTeamData);

router.route("/team-members").get(getTeamAndMemberData);

export default router;