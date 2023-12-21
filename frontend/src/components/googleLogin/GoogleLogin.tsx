import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

type Props = {
  loginGoogleUser: (credentialResponse: CredentialResponse) => Promise<void>
}

const GoogleLoginComponent = ({ loginGoogleUser }: Props) => {
  const [showGoogleLogin, setShowGoogleLogin] = useState(true);

  const toggleShowGoogleLogin = () => setShowGoogleLogin(!showGoogleLogin);

  const loginGoogleFail = () => {
    console.log("Login fail");
  };

  return (
    <ToastContainer position="top-end" className="m-5">
      <Toast bg={'light'} show={showGoogleLogin} onClose={toggleShowGoogleLogin}>
      <Toast.Header className="d-flex justify-content-between">
            Login with Google
          </Toast.Header>
        <Toast.Body className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={loginGoogleUser}
            onError={loginGoogleFail}
          ></GoogleLogin>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default GoogleLoginComponent;
