import { IUser } from "../models/User";
import { execute } from "../utils/database";

export const getAllUsers = async () => {
  const sql = "select * from users";

  return execute<IUser[]>(sql, []);
};

export const getUserDataById = async (id: string) => {
  const sql = "select * from users where id = ?";

  return execute<IUser>(sql, [id]);
};

export const getUser = async (username: string, password: string) => {
  const sql = "select * from users where username = ? and password = sha1(?)";

  return execute<IUser>(sql, [username, password]);
};

export const addUser = async (user: IUser) => {
  const { username, email, password, roles, image } = user;
  const sql =
    "insert into users (username, email, sha1(password), roles, image) values (?, ?, sha1(?), ?)";

  const result = await execute<{ affectedRows: number }>(sql, [
    username,
    email,
    password,
    roles,
    image,
  ]);
  return result.affectedRows > 0;
};

export const updateUser = async (id: string, user: IUser) => {
  const { username, email, roles, image } = user;
  const sql = "update users set username = ?, email = ? where id = ?";

  const result = await execute<{ affectedRows: number }>(sql, [
    username,
    email,
    roles,
    image,
    id,
  ]);
  return result.affectedRows > 0;
};

export const deleteUser = async (id: string) => {
  const sql = "delete from users where id = ?";

  const result = await execute<{ affectedRows: number }>(sql, [id]);
  return result.affectedRows > 0;
};

export const usernameExist = async (username: string) => {
  const sql = "SELECT id FROM users WHERE username = ?";

  const result = await execute<string>(sql, [username]);
  return result;
};

export const emailExist = async (email: string) => {
  const sql = "SELECT id FROM users WHERE email = ?";

  const result = await execute<string>(sql, [email]);
  return result;
};
