import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  addNewUser,
  getUser,
  getUsers,
  loginUser,
  removeUser,
  updateUser,
} from "../../services/userService";
import { AuthRequest, User } from "../../types/User";
import { validateUser } from "../../utils/validateUser";
import { userSlice } from "./userSlice";

const { actions } = userSlice;

export const fetchUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const response = await getUsers();
    response.success
      ? dispatch(actions.setUsersSuccess(response.value))
      : dispatch(actions.setUserFail(response.message));
  };
};

export const fetchUser = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await getUser(id);
    response.success
      ? dispatch(actions.setUserSuccess(response.value))
      : dispatch(actions.setUserFail(response.message));
  };
};

export const addUser = (
  user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const validUser = validateUser(user, false);
    if(!validUser.success) return dispatch(actions.createUserFail(validUser.message));

    const response = await addNewUser(user);
    response.success
      ? dispatch(actions.createUserSuccess(response.value))
      : dispatch(actions.createUserFail(response.message));
  };
};

export const deleteUser = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await removeUser(id);
    response.success
      ? dispatch(actions.eliminateUserSuccess(id))
      : dispatch(actions.eliminateUserFail(response.message));
  };
};

export const editUser = (
  user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const validUser = validateUser(user);
    if(!validUser.success) return dispatch(actions.modifyUserFail(validUser.message));

    const response = await updateUser(user);
    response.success
      ? dispatch(actions.modifyUserSuccess(response.value))
      : dispatch(actions.modifyUserFail(response.message));
  };
};

export const login = (
  user: AuthRequest
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response = await loginUser(user);
    if (response.success) {
      dispatch(actions.loginUserSuccess(response.value));
      localStorage.setItem("token", JSON.stringify(response.value.token));
    } else {
      dispatch(actions.loginUserFail(response.message));
    }
  };
};

export const logout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(actions.logoutUser());
  };
};

export const cancelUserMessage = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => dispatch(actions.eliminateUserMessage());
}
