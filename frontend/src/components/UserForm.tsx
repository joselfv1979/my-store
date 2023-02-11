import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../scss/UserFormPage.module.scss";
import { initialUser, User } from "../types/User";

type Props = {
  saveUser: (data: User) => Promise<void>;
};

const UserForm = ({ saveUser }: Props) => {
  const [userData, setUserData] = useState<User>(initialUser);

  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await saveUser(userData);
  };

  const showPassword = () => {
    const pwdInput = document.querySelector(".pwd-input") as HTMLInputElement;
    pwdInput.type === "password"
      ? (pwdInput.type = "text")
      : (pwdInput.type = "password");
  };

  return (
    <form className={styles.userForm} onSubmit={submit}>
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
            onChange={onChange}
            defaultValue={""}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className={styles.user}>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full name"
            autoComplete="off"
            required
            autoFocus
            onChange={onChange}
            defaultValue={""}
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
            onChange={onChange}
            defaultValue={""}
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
            onChange={onChange}
          />
        </div>
        <div className={styles.eye} onClick={showPassword}></div>
      </fieldset>

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Save</button>

        <p>Have an account?</p>
        <button className={styles.signin} onClick={() => navigate("/login")}>
          Sign in
          <i className="fas fa-user"></i>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
