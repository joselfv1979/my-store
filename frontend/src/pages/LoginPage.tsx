import React from "react";
import { Navigate } from "react-router-dom";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import LoginForm from "../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { cancelUserMessage, login } from "../store/user/userActions";
import { Message, Status } from "../types/Message";
import { AuthRequest } from "../types/User";
import { fetchProducts } from "../store/product/productActions";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { authUser, error, loading } = useAppSelector((state) => state.user);

  const note: Message = {
    type: Status.DANGER,
    text: error,
  };

  const loginUser = (user: AuthRequest) => {
    dispatch(login(user));
    dispatch(fetchProducts(""));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  if (authUser) console.log({ authUser });

  if (authUser) return <Navigate to="/" />;

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {loading ? <AppWaiting /> : <LoginForm loginUser={loginUser} />}
    </>
  );
};

export default LoginPage;
