import axios from "axios";
import { Result } from "../types/Result";
import { AuthRequest, AuthResponse, User } from "../types/User";
import { handleError } from "../utils/handleError";
import { getHeaders } from "../utils/authHeader";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_USERS,
});

/**
 * Returns user's login data
 * @param {AuthRequest} credentials - {username, password}.
 * @returns {Result<AuthResponse, string>} User's data or an error messsage
 */
export const loginUser = async (
  credentials: AuthRequest
): Promise<Result<AuthResponse, string>> => {
  try {
    const { data } = await api.post("/sign-in", credentials);
    console.log({ data });

    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const googleLogin = async ( token: { token: string} ): Promise<Result<AuthResponse, string>> => {
  
  console.log('token-g', token);
  
  try {
    const { data } = await api.post('/auth/google', token);
    console.log({ data });

    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

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
