import React from "react";
import { Navigate } from "react-router-dom";
import { AppWaiting } from "../components/AppStatus";
import LoginForm from "../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { login } from "../store/user/userActions";
import { AuthRequest } from "../types/User";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { loggedUser } = useAppSelector((state) => state.user);

  console.log("login: ", loggedUser);

  const loginUser = (user: AuthRequest) => {
    dispatch(login(user));
  };

  if (loggedUser) return <Navigate to="/" />;

  return (
    <>
      <LoginForm loginUser={loginUser} />
    </>
  );
};

export default LoginPage;
