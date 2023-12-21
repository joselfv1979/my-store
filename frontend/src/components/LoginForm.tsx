import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/scss/LoginPage.module.scss";
import { type AuthRequest } from "../types/User";

type Props = {
  loginUser: (userData: AuthRequest) => Promise<void>;
  setShowPasswordResetModal: (show: boolean) => void;
};

const LoginForm = ({ loginUser, setShowPasswordResetModal }: Props) => {
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

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser(values);
  };

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
              autoComplete="off"
              onChange={onChange}
            />
          </div>
          <button className={styles.eye} onClick={switchShown}></button>
        </fieldset>

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className="btn btn-link link-info d-block mx-auto"
            onClick={() => setShowPasswordResetModal(true)}
          >
            Forgot password?
          </button>
          <button id="form-login-button" className={styles.login}>
            Log in
          </button>
          <span className="d-block">Have no account?</span>

          <button
            className={styles.signup}
            onClick={() => navigate("/register")}
          >
            <span>Sign up</span>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </div>
      </form>
  );
};

export default LoginForm;
