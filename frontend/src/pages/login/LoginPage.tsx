import { Navigate } from "react-router-dom";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import LoginForm from "../../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Message, Status } from "../../types/Message";
import { AuthRequest } from "../../types/User";
import { useState } from "react";
import RequestPasswordResetModal from "components/requestPasswordResetModal/RequestPasswordResetModal";
import GoogleLoginComponent from "components/googleLogin/GoogleLogin";
import { cancelUserMessage, login, loginGoogle } from "store/user/userActions";
import { CredentialResponse } from "@react-oauth/google";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { authUser, error, status } = useAppSelector((state) => state.user);
  const [showPasswordResetModal, setShowPasswordResetModal] =
    useState<boolean>(false);

  const note: Message = {
    type: Status.DANGER,
    text: error,
  };

  const loginUser = async (user: AuthRequest) => {
    dispatch(login(user));
  };

  const loginGoogleUser = async (credential: CredentialResponse) => {    
    dispatch(loginGoogle(credential));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  if (authUser) return <Navigate to="/" />;

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {status === "loading" ? (
        <AppWaiting />
      ) : (
        <>
          <LoginForm
            loginUser={loginUser}
            setShowPasswordResetModal={setShowPasswordResetModal}
          />
          <GoogleLoginComponent loginGoogleUser={loginGoogleUser} />
        </>
      )}
      <RequestPasswordResetModal
        showPasswordResetModal={showPasswordResetModal}
        setShowPasswordResetModal={setShowPasswordResetModal}
      />
    </>
  );
};

export default LoginPage;
