import { createPool } from "mysql2";
import { config } from "dotenv";
import { CustomError } from "../models/CustomError";

config();

export const pool = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

pool.getConnection((err) => {
  if (err) {
    throw new CustomError(500, "Couldn't connect to database, try it later");
  }
  console.debug("MySql Adapter Pool generated successfully");
});

export const promisePool = pool.promise();
