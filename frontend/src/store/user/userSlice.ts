import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthUser, type User, type UserState } from "../../types/User";

const initialUserState: UserState = {
  users: [],
  user: null,
  loading: false,
};

// Reducer functions of user state
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    loginUserPending: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.authUser = action.payload;
      state.loading = false;
    },
    loginUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.authUser = undefined;
      state.user = null;
    },
    setUsersPending: (state) => {
      state.loading = true;
      state.users = [];
      state.message = undefined;
      state.error = undefined;
    },
    setUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    setUsersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserPending: (state) => {
      state.loading = true;
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    createUserPending: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
      state.message = "User created succesfully";
      state.loading = false;
    },
    createUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    eliminateUserPending: (state) => {
      state.loading = true;
    },
    eliminateUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (item: User) => item.id !== action.payload
      );
      state.message = "User deleted succesfully";
      state.loading = false;
    },
    eliminateUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    modifyUserPending: (state) => {
      state.loading = true;
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
      state.loading = false;
    },
    modifyUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
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
export const isAdmin = (state: RootState) =>
  state.user.authUser?.username === "admin";
export default userSlice.reducer;
