import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../scss/UserFormPage.module.scss";

// { user, sendDataUser }
const UserForm = () => {
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   user = {
  //     ...user,
  //     ...userData,
  //   };

  //   sendDataUser(user);
  // };

  // const showPassword = () => {
  //   let pwdInput = document.querySelector(".pwd-input");
  //   pwdInput.type === "password"
  //     ? (pwdInput.type = "text")
  //     : (pwdInput.type = "password");
  // };

  // const goLogin = (event) => {
  //   event.preventDefault();

  //   navigate("/login");
  // };

  return (
    <form className={styles.userForm} onSubmit={() => console.log('submit')
    }>
      <header>
        <h2>Register</h2>
        <p>Please fill in this form to create an account</p>
      </header>

      <fieldset>
        <div className={styles.user}>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Username"
            required
            autoFocus
            onChange={() => console.log('submit')}
            defaultValue={'username'}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className={styles.email}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="off"
            required
            onChange={() => console.log('submit')}
            defaultValue={'email'}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className={styles.pwd}>
          <input
            type="password"
            name="password"
            id="password"
            className="pwd-input"
            placeholder="Password"
            required
            onChange={() => console.log('submit')}
          />
        </div>
        <div className={styles.eye} onClick={() => console.log('submit')}></div>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Save</button>

        <p>Have an account?</p>
        <button className={styles.signin} onClick={() => console.log('submit')}>
          Sign in
          <i className="fas fa-user"></i>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
