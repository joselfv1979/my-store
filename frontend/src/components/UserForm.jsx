import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../scss/UserFormPage.module.scss";

const UserForm = ({ user, sendDataUser }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [userData, setUserData] = useState("");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname === "/edit-profile") {
      setShowPasswordInput(false);
    }
  }, [location.pathname]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    user = {
      ...user,
      ...userData,
    };

    sendDataUser(user);
  };

  const showPassword = () => {
    let pwdInput = document.querySelector(".pwd-input");
    pwdInput.type === "password"
      ? (pwdInput.type = "text")
      : (pwdInput.type = "password");
  };

  const goLogin = (event) => {
    event.preventDefault();

    history.push("/login");
  };

  return (
    <form className={styles.userForm} onSubmit={handleFormSubmit}>
      <header>
        {user.id ? (
          <h2>Your Account</h2>
        ) : (
          <>
            <h2>Register</h2>
            <p>Please fill in this form to create an account</p>
          </>
        )}
      </header>

      <fieldset>
        <div className={styles.user}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            autoFocus
            onChange={handleInputChange}
            defaultValue={user.username}
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
            required
            onChange={handleInputChange}
            defaultValue={user.email}
          />
        </div>
      </fieldset>

      {showPasswordInput ? (
        <fieldset>
          <div className={styles.pwd}>
            <input
              type="password"
              name="password"
              id="password"
              className="pwd-input"
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.eye} onClick={showPassword}></div>
        </fieldset>
      ) : null}

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Save</button>

        <p>Have an account?</p>
        <button className={styles.signin} onClick={goLogin}>
          Sign in
          <i className="fas fa-user"></i>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
