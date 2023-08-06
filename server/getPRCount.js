import { Router } from "express";
import axios from "axios";
const router = Router();

// (api request to get all collaborators PRs including closed prs is:  https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all

//example using our goodpR-V1- repo below:

const PullRequestsApiUrl = `https://api.github.com/repos/Gayle-Thompson-Igwebike/GOOD-PR-v1/pulls?state=all`;

export const getAllTeamMembersPRs = router.get("/", (req, res) => {
  const repoOwner = "Gayle-Thompson-Igwebike";
  const repoName = "GOOD-PR-v1";

  axios
    .get(PullRequestsApiUrl)
    .then((response) => {
      const pullRequestCount = response.data.length;

      if (!response.data) {
        res.send("An error has occurred: " + response.data.message);
      } else {
        res.status(200).json({
          message: `Total Number of pull request contributions from this repo is: ${pullRequestCount}`,
        });
      }
      res.status(200).json({ pullRequestCount: pullRequestCount });
    })
    .catch((error) => {
      console.error("Error fetching pull requests:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

export const getUserPRs = router.get("/:username", (req, res) => {
  const repoOwner = "Gayle-Thompson-Igwebike";
  const repoName = "GOOD-PR-v1";
  const author = req.params.username; // Get the individual GitHub username from the route parameter

  const singleUserapiUrl = `https://api.github.com/search/issues?q=is:pr+repo:${repoOwner}/${repoName}/+author:${author}`;

  axios
    .get(singleUserapiUrl)
    .then((response) => {
      const pullRequests = response.data.items;
      const pullRequestCount = pullRequests.length;

      console.log(
        `Total Number of pull request contributions by ${author} in this repo is: ${pullRequestCount}`
      );

      res.status(200).json({ pullRequestCount });
    })
    .catch((error) => {
      console.error("Error fetching pull requests:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
