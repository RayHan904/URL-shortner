import pg from "pg";
import config from "../constants/index.js";

const { Pool } = pg;

export const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DATABASE,
});
