import pkg from "pg";
const { Pool, PoolClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const dataBase = await pool.connect();
