import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/scss/LoginPage.module.scss";
import { type AuthRequest } from "../types/User";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "services/userService";

type Props = {
  loginUser: (userData: AuthRequest) => void;
};

const LoginForm = ({ loginUser }: Props) => {
  const initialState: AuthRequest = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(values);
  };

  const loginGoogle = async (res: any) => {
    try {
      console.log('google-res ',{res});
      
      const result = await googleLogin({ token: res?.credential });
      console.log('result', result);
      

    } catch (err) {
      console.log(err);
    }
  }

  const loginGoogleFail = () => {
    console.log('Login fail');
  }

  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  const navigate = useNavigate();

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <header>
        <h2>Log In</h2>
        <p>Login here using your username and password</p>
      </header>

      <fieldset>
        <div className={styles.user}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            autoFocus
            onChange={onChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className={styles.pwd}>
          <input
            type={shown ? "text" : "password"}
            name="password"
            className="pwd"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button className={styles.eye} onClick={switchShown}></button>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button id="form-login-button" className={styles.login}>
          Log in
        </button>

        <p>Have no account?</p>

        <button className={styles.signup} onClick={() => navigate("/register")}>
          <span>Sign up</span>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
        </button>
        <div className="w-25 d-flex justify-content-center m-auto">
        <GoogleLogin
        onSuccess={loginGoogle}
        onError={loginGoogleFail}></GoogleLogin>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
