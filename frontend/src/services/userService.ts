import axios from "axios";
import { Result } from "../types/Result";
import { User } from "../types/User";
import { handleError } from "../utils/handleError";
import { getHeaders } from "../utils/authHeader";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_USERS,
});

/**
 * Returns all users
 * @returns {Result<User[], string>} All user or an error messsage
 */
export const getUsers = async (): Promise<Result<User[], string>> => {
  try {
    const { data } = await api.get("/", {
      headers: getHeaders(),
    });
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

/**
 * Returns one user
 * @param {string} id - The user id.
 * @returns {Result<User, string>} User or an error messsage
 */
export const getUser = async (id: string): Promise<Result<User, string>> => {
  try {
    console.log("id", id);
    console.log("heders", getHeaders());

    const { data } = await api.get(`/${id}`, {
      headers: getHeaders(),
    });
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

/**
 * Returns one user
 * @param {User} user - Object of type User.
 * @returns {Result<User, string>} User or an error messsage
 */
export const addNewUser = async (user: User): Promise<Result<User, string>> => {
  try {
    const { data } = await api.post(`/sign-up/`, user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

/**
 * Returns one user
 * @param {string} id - The user id.
 * @returns {Result<string, string>} User or an error messsage
 */
export const removeUser = async (
  id: string
): Promise<Result<string, string>> => {
  try {
    const { data } = await api.delete(`/${id}`, {
      headers: getHeaders(),
    });
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const updateUser = async (user: User): Promise<Result<User, string>> => {
  try {
    const { data } = await api.put(`/user-edit/${user.id}`, user, {
      headers: getHeaders(),
    });
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
