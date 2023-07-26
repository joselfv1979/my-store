import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import { CustomError } from "../models/CustomError";

config();

let db: string;

if (process.env.NODE_ENV === "production") {
  db = process.env.DATABASE_PROD;
} else if (process.env.NODE_ENV === "development") {
  db = process.env.DATABASE_DEV;
} else {
  db = process.env.DATABASE_TEST;
}

export const pool = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: db,
});

export const connect = async () => {
  return pool
    .getConnection()
    .then(() => console.info("MySql Adapter Pool generated successfully"))
    .catch(() => {
      throw new CustomError(500, "Couldn't connect to database, try it later");
    });
};
