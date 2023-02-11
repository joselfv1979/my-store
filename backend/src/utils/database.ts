import { createPool } from "mysql2";
import * as dotenv from "dotenv";
import { CustomError } from "../models/CustomError";

dotenv.config();

const pool = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

if(!pool) throw new CustomError(500, "Couldn't connect to database, try it later");

console.debug("MySql Adapter Pool generated successfully");

export const promisePool = pool.promise();
