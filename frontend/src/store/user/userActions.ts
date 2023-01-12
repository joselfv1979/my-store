import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  addNewUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from "../../services/userService";
import { User } from "../../types/User";
import {
  setUserSuccess,
  setUsersSuccess,
  createUserSuccess,
  eliminateUserSuccess,
  modifyUserSuccess,
  createUserFail,
  setUserFail,
  eliminateUserFail,
  modifyUserFail,
} from "./userSlice";

export const fetchUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const response = await getUsers();
    response.success
    ? dispatch(setUsersSuccess(response.value))
    : dispatch(setUserFail(response.message));
  };
};

export const fetchUser = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await getUser(id);
    response.success
    ? dispatch(setUserSuccess(response.value))
    : dispatch(setUserFail(response.message));
  };
};

export const addUser = (
  user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await addNewUser(user);
    response.success
      ? dispatch(createUserSuccess(response.value))
      : dispatch(createUserFail(response.message));
  };
};

export const deleteUser = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await removeUser(id);
    response.success
      ? dispatch(eliminateUserSuccess(id))
      : dispatch(eliminateUserFail(response.message));
  };
};

export const editUser = (
  user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await updateUser(user);
    response.success
      ? dispatch(modifyUserSuccess(response.value))
      : dispatch(modifyUserFail(response.message));
  };
};
