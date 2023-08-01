import { Router } from "express";
import { Octokit } from "octokit";
import { dataBase } from "./DBConfig.js";

// import axios from "axios";
const router = Router();
const octokit = new Octokit({
  //   auth: process.env.TOKEN,
});

// const url = "https://github.com/Gayle-Thompson-Igwebike/GOOD-PR-v1";
// const { owner, repo } = extractOwnerAndRepoFromUrl(url);
// console.log("Owner:", owner); // Output: "Gayle-Thompson-Igwebike"
// console.log("Repo:", repo); // Output: "GOOD-PR-v1"

// CODE TO GET REPO LINK FROM THE DATABASE

const repoLink = dataBase
  .query("SELECT repo_link FROM fp_teams")
  .then((result) => {
    if (result.rowCount === 0) {
      console.log("No link found");
    } else {
      const values = result.rows.map((eachRow) => eachRow.repo_link);
      console.log(values);
      return values;
    }
  })
  .catch((error) => {
    console.log(error);
  });

//   TO GET EACH REPO LINK
// const eachURL = repoLink.forEach((link) => {
//   console.log(link);
//   return link;
// });

//   FUNCTION TO TRANSFORM REPO LINK URL INTO OWNER AND REPO FOR THE PUT REQUEST FOR PULL REQUESTS

function extractOwnerAndRepoFromUrl(url) {
  // Remove "https://" from the URL
  const urlWithoutProtocol = url.replace(/^https:\/\//i, "");

  // Split the URL by "/"
  const urlParts = urlWithoutProtocol.split("/");
  console.log(urlParts);

  // Extract the owner and repo from the URL
  const owner = urlParts[1];
  const repo = urlParts[2];

  return { owner, repo };
}

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

// UPDATE REQUEST TO UPDATE INFORMATION ON DATABASE WITH PULL REQUEST AMOUNT FOR THE WHOLE TEAM
export const totalTeamPRRouter = router.put("/:id", (req, res) => {
  const teamId = parseInt(req.params.id);

  const numLength = users.length;

  const updateQuery = "UPDATE fp_teams SET total_pull_req=$1 WHERE id=$2";

  console.log("teamId:", teamId);
  console.log("numLength:", numLength);

  dataBase
    .query(updateQuery, [numLength, teamId])
    .then((result) => {
      //   console.log(result);
      if (result.rowCount === 0) {
        res.status(500).json({ message: "Team does not exist" });
      } else {
        return res.status(200).json({ message: "Pull request updated" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});
