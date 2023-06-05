import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialUser, type User } from "../types/User";
import styles from "../scss/UserFormPage.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";

type Props = {
  saveUser: (data: User) => void;
  editing?: boolean;
};

const UserForm = ({ saveUser, editing = false }: Props) => {
  const { user }  = useAppSelector((state) => state.user);

  const currentUser = user ? user : initialUser;

  const [userData, setUserData] = useState<User>(currentUser);
  const [shown, setShown] = useState(false);

  const switchShown = () => setShown(!shown);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveUser(userData);
  };

  const navigate = useNavigate();

  return (
    <form className={styles.userForm} onSubmit={submit}>
      <header>
        {editing ? <h2>Edit Profile</h2> : <h2>Register</h2>}
        <p>Please fill in this form</p>
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
            defaultValue={userData.username}
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
            value={userData.fullname}
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
            value={userData.email}
          />
        </div>
      </fieldset>

      {!editing && (
        <fieldset>
          <div className={styles.pwd}>
            <input
              type={shown ? "text" : "password"}
              name="password"
              id="password"
              className="pwd-input"
              placeholder="Password"
              required
              onChange={onChange}
            />
          </div>
          <div className={styles.eye} onClick={switchShown}></div>
        </fieldset>
      )}

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Save</button>

        {!editing && (
          <>
            <p>Have an account?</p>
            <button
              className={styles.signin}
              onClick={() => navigate("/login")}
            >
              Sign in
              <i className="fas fa-user"></i>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserForm;
