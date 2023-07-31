import { Router } from "express";
// import axios from "axios";
const router = Router();

const pullRes = async () => {
  const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: "Gayle-Thompson-Igwebike",
    repo: "Good-PR-v1",
    state: "all",
  });
  // console.log(response.data);
  const users = response.data.map((item) => {
    return item.user.login;
  });
  console.log(users);
  return users;
};

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

router.put("/:id", async (req, res) => {
  const teamId = parseInt(req.params.id);

  const userNum = await pullRes();

  const numLength = userNum.length;

  const updateQuery = "UPDATE fp_teams SET total_pull_req=$1 WHERE id=$2";

  console.log("teamId:", teamId);
  console.log("numLength:", numLength);

  db.query(updateQuery, [numLength, teamId])
    .then((result) => {
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

export default router;
