import { config } from "dotenv";

config();

const constants = {
  PORT: parseInt(process.env.PORT) || 8000,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  URL:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : `http://localhost:${parseInt(process.env.PORT)}`,
  SECRET: process.env.SECRET || "myTakeHome",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DATABASE: process.env.DATABASE || "api_shortner",
  ANALYTICS_TABLE: process.env.ANALYTICS_TABLE || "analytics",
  USERS_TABLE: process.env.USERS_TABLE || "users",
  URLS_TABLE: process.env.URLS_TABLE || "urls",
};

export default constants;
