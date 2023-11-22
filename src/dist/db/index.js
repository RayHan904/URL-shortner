import pg from "pg";
const { Pool } = pg;
// export const pool = new Pool({
//   user: config.DB_USER,
//   host: config.DB_HOST,
//   port: config.DB_PORT,
//   database: config.DATABASE,
// });
const conStr = process.env.POSTGRES_URL
    ? process.env.POSTGRES_URL + "?sslmode=require"
    : "postgres://default:YqHu2J5lbRIQ@ep-lively-term-48823164-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require";
export const pool = new Pool({
    connectionString: conStr,
});
//# sourceMappingURL=index.js.map