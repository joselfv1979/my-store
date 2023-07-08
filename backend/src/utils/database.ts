import { Pool, createPool } from "mysql2/promise";
import { config } from "dotenv";
import { CustomError } from "../models/CustomError";

config();

export const pool: Pool = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

pool
  .getConnection()
  .then(() => console.debug("MySql Adapter Pool generated successfully"))
  .catch(() => {
    throw new CustomError(500, "Couldn't connect to database, try it later");
  });

