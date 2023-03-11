import React from "react";
import { Navigate } from "react-router-dom";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import LoginForm from "../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { cancelUserMessage, login } from "../store/user/userActions";
import { Message } from "../types/Message";
import { AuthRequest } from "../types/User";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { loggedUser, error, loading } = useAppSelector((state) => state.user);

  const note: Message = {
    type: 'danger',
    text: error
  }

  const loginUser = (user: AuthRequest) => {
    dispatch(login(user));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  if (loggedUser) return <Navigate to="/" />;

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      <LoginForm loginUser={loginUser} />
    </>
  );
};

export default LoginPage;
