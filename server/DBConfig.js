import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool, PoolClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const dataBase = await pool.connect();
