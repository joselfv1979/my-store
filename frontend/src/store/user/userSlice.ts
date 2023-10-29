import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  AuthResponse,
  type User,
  type UserState,
} from "../../types/User";

const initialUserState: UserState = {
  users: [],
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    userPending: (state) => {
      state.status = "loading";
      state.users = [];
      state.message = undefined;
      state.error = undefined;
    },
    setUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.status = "success";
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = "success";
    },
    setUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
      state.message = "User created succesfully";
      state.status = "success";
    },
    createUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    eliminateUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (item: User) => item.id !== action.payload
      );
      state.message = "User deleted succesfully";
      state.status = "success";
    },
    eliminateUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    modifyUserSuccess: (state, action: PayloadAction<User>) => {      
      state.users = state.users.map((item: User) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.user = action.payload;
      state.authUser = {
        ...(state.authUser as AuthResponse),
        username: action.payload.username,
        roles: action.payload.roles,
      };
      state.message = "User updated successfully";
      state.status = "success";
    },
    modifyUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    loginUserSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.authUser = action.payload;
      state.status = "success";
    },
    loginUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    logoutUser: (state) => {
      state.authUser = undefined;
      state.user = null;
      state.status = "success";
    },
    eliminateUserMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    },
  },
});

export const isAdmin = (state: RootState) =>
  state.user.authUser?.username === "admin";

export const getUsers = (state: RootState) => state.user.users;

export const getUser = (state: RootState, id: string) =>
  state.user.users.find((user: User) => user.id === id);

export const getMessage = (state: RootState) => state.user.message;

export const getError = (state: RootState) => state.user.error;

export default userSlice.reducer;
