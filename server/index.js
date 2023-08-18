import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pkg from "pg";
import router from "./config/router.js";
import bodyParser from "body-parser";
const { Pool, PoolClient } = pkg;

const app = express();

const port = process.env.PORT || 8000;

export let dataBase;

async function startServer() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  dataBase = await pool.connect();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(`🚨 Incoming request: ${req.method} - ${req.url}🚨`);
    next();
  });

  app.use("/", router);

  app.post("/submit-form", async (req, res) => {
    const {
      teamName,
      projectBrief,
      slackChannel,
      githubRepo,
      githubProject,
      deployedApp,
    } = req.body;

    const members = [
      {
        memberName: req.body.memberName1,
        role: req.body.role1,
        githubUsername: req.body.githubUsername1,
      },
      {
        memberName: req.body.memberName2,
        role: req.body.role2,
        githubUsername: req.body.githubUsername2,
      },
      {
        memberName: req.body.memberName3,
        role: req.body.role3,
        githubUsername: req.body.githubUsername3,
      },
      {
        memberName: req.body.memberName4,
        role: req.body.role4,
        githubUsername: req.body.githubUsername4,
      },
    ];

    try {
      // Step 1: Insert the team data into fp_teams table and get the team_id
      const teamInsertQuery = `
        INSERT INTO fp_teams (team_name, repo_link, slack_channel, project_board, deployed_site, project_brief)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const teamValues = [
        teamName,
        githubRepo,
        slackChannel,
        githubProject,
        deployedApp,
        projectBrief,
      ];
      const teamResult = await dataBase.query(teamInsertQuery, teamValues);

      const teamId = teamResult.rows[0].id;

      // Step 2: Insert the member data into fp_members table
      const memberInsertQuery = `
        INSERT INTO fp_members (team_id, member_name, role, github_username)
        VALUES ($1, $2, $3, $4)
      `;

      for (const member of members) {
        const { memberName, role, githubUsername } = member;
        const memberValues = [teamId, memberName, role, githubUsername];
        await dataBase.query(memberInsertQuery, memberValues);
      }
      res.status(200).json({ message: "Team information submitted" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server started on port ${port} on server`);
  });
}

startServer();
