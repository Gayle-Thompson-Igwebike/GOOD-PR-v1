import { Router } from "express";
import axios from "axios"; 
const router = Router();


// (git api request format)
// https://api.github.com/repos/Gayle-Thompson-Igwebike/Affirmation-page/pulls?state=all

api.github.com/search/issues?q=is:pr+repo:{owner}/{repo}/+author:{author}

// variables to hold username and repository name on GitHub.

https: export const getPRCount = router.get("/", (req, res) => {
  const repoOwner = "Gayle-Thompson-Igwebike";
  const repoName = "Affirmation-page";

  // API URL to fetch pull request data from GitHub
//   const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`;

  api.github.com/search/issues?q=is:pr+repo:{owner}/{repo}/+author:{author}


const `https://api.github.com/search/issues?q=is:pr+repo:{owner}/{repo}/+author:{author}`

const apiUrl = `https://api.github.com/search/issues?q=is:pr+repo:myusername/myrepo+author:myauthor`;


  https: axios
    .get(apiUrl)
    .then((response) => {
      const pullRequestCount = response.data.length;
      console.log(
        `Total Number of pull request contributions from ${repoOwner} in this repo is: ${pullRequestCount}`
      );

      res.status(200).json({ Message: "This is the result of your request" });
    })

    .catch((error) => {
      console.error("Error fetching pull requests:", error);
    });
});

 
