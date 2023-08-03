import { Router } from "express";
import axios from "axios"; 
const router = Router();


// (git api request format to get all collaborators PRs)

const apiUrl = `https://api.github.com/repos/Gayle-Thompson-Igwebike/GOOD-PR-v1/pulls`;


//(git api request format to get a single users PRs)

const singleUserapiUrl = `https://api.github.com/search/issues?q=is:pr+repo:Gayle-Thompson-Igwebike/GOOD-PR-v1/+author:Gayle-Thompson-Igwebike`


 export const getPRCount = router.get("/", (req, res) => {
// variables to hold username and repository name on GitHub.
   const repoOwner = "Gayle-Thompson-Igwebike";
   const repoName = "Affirmation-page";

   axios
     .get(singleUserapiUrl)
     .then((response) => {
       const pullRequestCount = response.data.length;

       if (!response.data) {
         res.send("An error has occurred: " + response.data.message);
       } else {
         res.status(200).json({ message: "Here is the requested data" });
       }

       console.log(
         `Total Number of pull request contributions from ${repoOwner} in this repo is: ${pullRequestCount}`
       );

       
       res.status(200).json({ pullRequestCount: pullRequestCount });
     })
     .catch((error) => {
       console.error("Error fetching pull requests:", error);
       res.status(500).json({ error: "Internal server error" });
     });
 });

