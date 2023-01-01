import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { AppWaiting } from "../components/AppStatus";
import styles from '../scss/LoginPage.module.scss';

//{ dispatch, loading }
const LoginPage = () => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   const user = { username: name, password };

  //   dispatch(loginAction(user));
  // };

  // const showPassword = () => {
  //   let pwdInput = document.querySelector(".pwd");
  //   pwdInput.type === "password"
  //     ? (pwdInput.type = "text")
  //     : (pwdInput.type = "password");
  // };

  // const goRegister = (event) => {
  //   event.preventDefault();
  //   navigate("/register");
  // };

  const loginForm = () => {
    return (
      <form className={styles.loginForm} onSubmit={() => console.log('submit')
      }>
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
              onChange={() => console.log('submit')}
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
              onChange={() => console.log('submit')}
            />
          </div>
          <div className={styles.eye} onClick={() => console.log('submit')}></div>
        </fieldset>

        <div className={styles.buttonsContainer}>
          <button className={styles.login}>Log in</button>

          <p>Have no account?</p>

          <button className={styles.signup} onClick={() => console.log('submit')}>
            Sign up
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    );
  };

  return <>{1 ? <AppWaiting /> : loginForm()}</>;
};

// const mapStateToProps = (state) => ({
//   user: state.user.user,
//   logged: state.user.logged,
//   loading: state.user.loading,
// });

// export default connect(mapStateToProps)(LoginPage);
export default LoginPage;
