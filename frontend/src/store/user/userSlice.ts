import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialUser, User } from "../../types/User";

export interface UserState {
  users: User[];
  user: User;
  loggedUser?: User;
  message?: string;
  error?: string;
  loading: boolean;
}

const initialUserState: UserState = {
  users: [],
  user: initialUser,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    usersLoading: (state) => {
      state.loading = true;
      state.users = [];
      state.message = undefined;
      state.error = undefined;
    },
    setUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
      state.message = "User created succesfully";
    },
    createUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    eliminateUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (item: User) => item.id !== action.payload
      );
      state.message = "User deleted succesfully";
    },
    eliminateUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    modifyUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((item: User) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.message = "User updated successfully";
    },
    modifyUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    loginUserFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.loggedUser = undefined;
    },
    eliminateUserMessage: (state) => {
      state.message = undefined;
      state.error = undefined;
    }
  },
});

export const isAdmin = (state: RootState) =>
  state.user.loggedUser?.username === "admin";

export const getUsers = (state: RootState) => state.user.users;

export const getUser = (state: RootState, id: string) =>
  state.user.users.find((user: User) => user.id === id);

export const getMessage = (state: RootState) => state.user.message;

export const getError = (state: RootState) => state.user.error;

export default userSlice.reducer;
