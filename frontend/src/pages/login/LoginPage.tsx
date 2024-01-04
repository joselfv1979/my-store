import { Navigate } from "react-router-dom";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import LoginForm from "../../components/loginForm/LoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { AuthRequest } from "../../types/User";
import { useState } from "react";
import RequestPasswordResetModal from "components/requestPasswordResetModal/RequestPasswordResetModal";
import GoogleLoginComponent from "components/googleLogin/GoogleLogin";
import { cancelUserMessage, login, loginGoogle } from "store/user/userActions";
import { CredentialResponse } from "@react-oauth/google";
import { getMessage } from "utils/handleMessage";

// Displays a view for user login and password reset requests
const LoginPage = () => {
  const dispatch = useAppDispatch();

  const { authUser, error, message, loading } = useAppSelector(
    (state) => state.user
  );
  const [showPasswordResetModal, setShowPasswordResetModal] =
    useState<boolean>(false);

  const note = getMessage(error, message);

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
      {loading ? (
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
