import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type User } from "../../types/User";
import { useAppSelector } from "../../hooks/redux-hooks";
import { initialUser } from "data/ConstantUtils";
import styles from "../../assets/scss/UserFormPage.module.scss";

type Props = {
  saveUser: (data: User) => Promise<void>;
  editing?: boolean;
};

const UserForm = ({ saveUser, editing = false }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  const currentUser = user ?? initialUser;

  const [userData, setUserData] = useState<User>(currentUser);

  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendDataUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveUser(userData);
  };

  const navigate = useNavigate();

  return (
    <form className={styles.userForm} onSubmit={sendDataUser}>
      <header>
        <h2>{editing ? "Edit Profile" : "Register"}</h2>
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
            value={userData.username}
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
          <button className={styles.eye} onClick={switchShown}></button>
        </fieldset>
      )}

      <div className={styles.buttonsContainer}>
        <button className={styles.login}>Save</button>

        {editing ? (
          <button className={styles.cancel} onClick={() => navigate("/")}>
            Cancel
          </button>
        ) : (
          <>
            <p>Have an account?</p>
            <button
              className={styles.signup}
              onClick={() => navigate("/login")}
            >
              <span>Sign in</span>
              <i className="fas fa-user"></i>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserForm;
