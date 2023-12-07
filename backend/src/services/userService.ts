import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../utils/database";
import { IUser, UserWithoutId } from "../models/User";

export const getAllUsers = async () => {
  const sql = "select * from users";
  const [rows] = await pool.query<RowDataPacket[]>(sql);
  return rows;
};

export const getUserDataById = async (id: string) => {
  const sql = "select * from users where id = ?";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
  return rows[0];
};

export const loginUser = async (username: string, password: string) => {
  const sql = "select * from users where username = ? and password = sha1(?)";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [
    username,
    password,
  ]);
  return rows[0];
};

export const addUser = async (user: UserWithoutId) => {
  const { fullname, username, email, password, roles, image } = user;
  const sql =
    "insert into users (fullname, username, email, password, role, image) values (?, ?, ?, sha1(?), ?, ?)";

  const [{ insertId }] = await pool.query<ResultSetHeader>(sql, [
    fullname,
    username,
    email,
    password,
    roles[0],
    image,
  ]);

  return { ...user, id: String(insertId)};
};

export const updateUser = async (id: string, user: IUser) => {
  const { fullname, username, email, image } = user;
  const sql =
    "update users set fullname = ?, username = ?, email = ?, image = ? where id = ?";

  const [{ affectedRows }] = await pool.query<ResultSetHeader>(sql, [
    fullname,
    username,
    email,
    image,
    id,
  ]);
  return affectedRows;
};

export const deleteUser = async (id: string) => {
  const sql = "delete from users where id = ?";
  const [{ affectedRows }] = await pool.query<ResultSetHeader>(sql, [
    id,
  ]);
  return affectedRows;
};

export const usernameExist = async (username: string) => {
  const sql = "SELECT id FROM users WHERE username = ?";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [username]);
  return rows[0];
};

export const emailExist = async (email: string) => {
  const sql = "SELECT id FROM users WHERE email = ?";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [email]);
  return rows[0];
};

export const deleteAllUsers = async () => {
  const sql = "delete from users";

  await pool.query<ResultSetHeader>(sql);
}

export const getUserByEmail = async (email?: string) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [email]);
  return rows[0];
};
