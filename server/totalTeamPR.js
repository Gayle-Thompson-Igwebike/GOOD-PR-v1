import { Router } from "express";
import { Octokit } from "octokit";
import { dataBase } from "./DBConfig.js";

// import axios from "axios";
const router = Router();
const octokit = new Octokit({
  //   auth: process.env.TOKEN,
});

// FUNCTION TO GET USERS THAT HAVE MADE PULL REQUESTS
const pullRes = async () => {
  const owner = "Gayle-Thompson-Igwebike";
  const repo = "Good-PR-v1";
  const response = await octokit.request(`GET /repos/${owner}/${repo}/pulls`, {
    state: "all",
  });
  const users = response.data.map((item) => {
    return item.user.login;
  });
  console.log(users);
  return users;
};

// FUNCTION TO COUNT PULL REQUESTS PER PERSON
const prCount = async (users) => {
  const count = {};

  for (let eachName of users) {
    count[eachName] = count[eachName] ? count[eachName] + 1 : 1;
  }
  console.log(count);
  return count;
};

const users = await pullRes();
prCount(users);
// const pullRequestCount = prCount(users);

// UPDATE REQUEST TO UPDATE INFORMATION ON DATABASE WITH PULL REQUEST AMOUNT FOR THE WHOLE TEAM
export const totalTeamPRRouter = router.put("/:id", async (req, res) => {
  const teamId = parseInt(req.params.id);

  //   const userNum = await pullRes();

  const numLength = users.length;

  const updateQuery = "UPDATE fp_teams SET total_pull_req=$1 WHERE id=$2";

  console.log("teamId:", teamId);
  console.log("numLength:", numLength);

  dataBase
    .query(updateQuery, [numLength, teamId])
    .then((result) => {
      console.log(result);
      if (result.rowCount === 0) {
        res.status(500).json({ message: "Team does not exist" });
      } else {
        return res.status(200).json({ message: "Pull request updated" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
