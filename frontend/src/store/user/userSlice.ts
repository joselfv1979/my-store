import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUser, User } from "../../types/User";

export interface UserState {
  users: User[];
  user: User;
  loggedUser?: User;
  message?: string;
  error: boolean;
  loading: boolean;
}

const initialUserState: UserState = {
  users: [],
  user: initialUser,
  error: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "product",
  initialState: initialUserState,
  reducers: {
    usersLoading: (state) => {
      state.loading = true;
    },
    setUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    },
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.loading = false;
      state.error = true;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    createUserFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    eliminateUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (item: User) => item.id !== action.payload
      );
    },
    eliminateUserFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    modifyUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((item: User) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    modifyUserFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
      state.error = true;
    },
    loginUserFail: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    logoutUser: (state) => {
      state.loggedUser = undefined;
    },
  },
});

export const {
  setUsersSuccess,
  setUserSuccess,
  createUserSuccess,
  eliminateUserSuccess,
  modifyUserSuccess,
  setUserFail,
  createUserFail,
  eliminateUserFail,
  modifyUserFail,
  loginUserSuccess,
  loginUserFail,
  logoutUser
} = userSlice.actions;

export default userSlice.reducer;
