// import dotenv, { config } from "dotenv";
// dotenv.config();
// config();
// import { Router } from "express";
// const router = Router();
// import { getAllTeamRepos } from "./repositories/teamsRepository.js";
// import { Octokit } from "octokit";

// const octokit = new Octokit({
//   auth: process.env.TOKEN,
// });

// export const getAllTeamMembersPRs = router.get("/members", async (req, res) => {
//   try {
//     const allTeamsRepos = await getAllTeamRepos();
//     console.log(allTeamsRepos);

//     const results = [];

//     for (const repo of allTeamsRepos) {
//       const response = await octokit.request(
//         `GET /repos/${repo.owner}/${repo.repo}/pulls`,
//         {
//           state: "all",
//         }
//       );

//       const newResponse = response.data.map((eachUser) => eachUser.user.login);

//       const pullRequestCount = response.data.length;

//       const prCount = async (users) => {
//         const count = {};

//         for (let eachName of users) {
//           count[eachName] = count[eachName] ? count[eachName] + 1 : 1;
//         }
//         // console.log(count);
//         return count;
//       };

//       const eachPRCount = await prCount(newResponse);

//       results.push({
//         id: repo.id,
//         teamName: repo.teamName,
//         owner: repo.owner,
//         repo: repo.repo,
//         pullRequestCount: pullRequestCount,
//         users: eachPRCount,
//       });
//     }
//     console.log(results);
//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error fetching pull requests:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
