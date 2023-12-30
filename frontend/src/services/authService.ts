import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { Result } from "types/Result";
import { AuthRequest, AuthUser } from "types/User";
import { handleError } from "utils/handleError";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH,
});

/**
 * Returns user's login data
 * @param {AuthRequest} credentials - {username, password}.
 * @returns {Result<AuthResponse, string>} User's data or an error messsage
 */
export const loginUser = async (
  credentials: AuthRequest
): Promise<Result<AuthUser, string>> => {
  try {
    const { data } = await api.post("/sign-in", credentials);

    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

// Allows users to sign in or sign up for a Google account
export const googleLogin = async (
  credential: CredentialResponse
): Promise<Result<AuthUser, string>> => {
  try {
    const { data } = await api.post("/google-auth", credential);

    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

// Password reset request
export const requestPasswordReset = async (body: { email: string }) => {
  try {
    await api.post("/request-password-reset", body);
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

// Sends new password
export const passwordReset = async (
  body: { password: string },
  token: string
) => {
  try {
    await api.put("/password-reset", body, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};
