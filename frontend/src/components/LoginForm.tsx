import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../scss/LoginPage.module.scss";
import { AuthRequest } from "../types/User";

export type Props = {
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

  const showPassword = () => {
    const pwdInput = document.querySelector(".pwd") as HTMLInputElement;
    pwdInput.type === "password"
      ? (pwdInput.type = "text")
      : (pwdInput.type = "password");
  };

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
            required
            autoFocus
            onChange={onChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className={styles.pwd}>
          <input
            type="password"
            name="password"
            className="pwd"
            placeholder="Password"
            required
            onChange={onChange}
          />
        </div>
        <div className={styles.eye} onClick={showPassword}></div>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Log in</button>

        <p>Have no account?</p>

        <button className={styles.signup} onClick={() => navigate("/register")}>
          Sign up
          <i className="fa fa-user-plus" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
