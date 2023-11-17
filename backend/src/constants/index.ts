import { config } from "dotenv";

config();

const constants = {
  PORT: process.env.PORT || 8000,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET || "myTakeHome",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  DATABASE: process.env.DATABASE || "api_shortner",
};

export default constants;
