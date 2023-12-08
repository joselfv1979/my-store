import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import { CustomError } from "../models/CustomError";

config();

let db = "";

if (process.env.NODE_ENV === "development") {
  db = process.env.DATABASE_DEV as string;
} else if (process.env.NODE_ENV === "test") {
  db = process.env.DATABASE_TEST as string;
} else {
  db = process.env.DATABASE_PROD as string;
}

export const pool = createPool({
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: db,
  port: Number(process.env.DB_PORT),
});

export const connect = async () => {
  return pool
    .getConnection()
    .then(() => console.info("MySql Adapter Pool generated successfully"))
    .catch(() => {            
      throw new CustomError(500, "Couldn't connect to database, try it later");
    });
};
