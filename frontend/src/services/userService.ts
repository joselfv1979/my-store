import axios from "axios";
import { Result } from "../types/Result";
import { User } from "../types/User";
import { handleError } from "../utils/handleError";
import { getHeaders } from "../utils/authHeader";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_USERS,
});

// Request to get all users
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

// Request to get a user
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

// Request to create a user
export const addNewUser = async (user: User): Promise<Result<User, string>> => {
  try {
    const { data } = await api.post(`/sign-up/`, user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

// Request to delete a user
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

// Request to update a user
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
