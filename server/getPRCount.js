import axios from "axios";  

// (git api request format)
// https://api.github.com/repos/Gayle-Thompson-Igwebike/Affirmation-page/pulls?state=all


// variables to hold username and repository name on GitHub.
const repoOwner = "Gayle-Thompson-Igwebike";
const repoName = "Affirmation-page";

// API URL to fetch pull request data from GitHub
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`;

axios
  .get(apiUrl)
  .then((response) => {
    const pullRequestCount = response.data.length;
    console.log(`Total Number of pull request contributions from ${repoOwner} in this repo is: ${pullRequestCount}`);
  })
  .catch((error) => {
    console.error("Error fetching pull requests:", error);
  });
