import axios from "axios";
import { Result } from "../types/Result";
import { AuthRequest, User } from "../types/User";
import { handleError } from "../utils/handleError";

const api = axios.create({
  baseURL: "/users",
});

export const loginUser = async (credentials: AuthRequest): Promise<Result<User, string>> => {
  try {
    const { data } = await api.post("/sign-in", credentials);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
}

export const getUsers = async (): Promise<Result<User[], string>> => {
  try {
    const { data } = await api.get("/");
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const getUser = async (id: string): Promise<Result<User, string>> => {
  try {
    const { data } = await api.get(`/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const addNewUser = async (
  user: User
): Promise<Result<User, string>> => {
  try {
    const { data } = await api.post(`/sign-up/`, user);
    console.log("created user", data);
    
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const removeUser = async (
  id: string
): Promise<Result<string, string>> => {
  try {
    const { data } = await api.delete(`/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const updateUser = async (
  user: User
): Promise<Result<User, string>> => {
  try {
    const { data } = await api.put(`/edit/${user.id}`, user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
