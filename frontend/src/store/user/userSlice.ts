import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  AuthUser,
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
    loginUserPending: (state) => {
      state.status = "loading";
    },
    loginUserSuccess: (state, action: PayloadAction<AuthUser>) => {
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
    setUsersPending: (state) => {
      state.status = "loading";
      state.users = [];
      state.message = undefined;
      state.error = undefined;
    },
    setUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.status = "success";
    },
    setUsersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    setUserPending: (state) => {
      state.status = "loading";
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = "success";
    },
    setUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    createUserPending: (state) => {
      state.status = "loading";
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
    eliminateUserPending: (state) => {
      state.status = "loading";
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
    modifyUserPending: (state) => {
      state.status = "loading";
    },
    modifyUserSuccess: (state, action: PayloadAction<User>) => {      
      state.users = state.users.map((item: User) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.user = action.payload;
      state.authUser = {
        ...(state.authUser as AuthUser),
        username: action.payload.username,
        role: action.payload.role,
      };
      state.message = "User updated successfully";
      state.status = "success";
    },
    modifyUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = "fail";
    },
    eliminateUserMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    },
  },
});

export const getUsers = (state: RootState) => state.user.users;

export const getUser = (state: RootState, id: string) =>
  state.user.users.find((user: User) => user.id === id);

export const isAdmin = (state: RootState) => state.user.authUser?.username === "admin";

export const getMessage = (state: RootState) => state.user.message;

export const getError = (state: RootState) => state.user.error;

export default userSlice.reducer;
