import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../utils/localStorage";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserAction } from "./../actions/userActions";
import { setError } from "../actions/messageActions";
import styles from "../scss/EditUserPage.module.scss";

const UserEdit = ({ match, dispatch, user }) => {
  const { id } = match.params;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUser = async (id) => {
      try {
        let token = getAuthToken();
        console.log("dispatch");
        const { data } = await axios.get(`/users/${id}`, {
          headers: { Authorization: `${token}` },
        });
        setUserData(data.user);
      } catch (error) {
        dispatch(setError(error.response.data.message));
      }
    };
    getUser(id);
  }, [dispatch, id]);

  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const getOutForm = () => {
    user.role === "admin" ? history.push("/users") : history.push("/");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserAction(userData));
    getOutForm();
  };

  return (
    <div className={styles.modal} onSubmit={handleFormSubmit}>
      <form className={styles.form}>
        <h2>Edit</h2>
        <fieldset>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            onChange={handleInputChange}
            defaultValue={userData.username}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
            defaultValue={userData.email}
          />
        </fieldset>
        <div className={styles.buttons}>
          <button className={styles.save}>Save</button>
          <button className={styles.cancel} onClick={getOutForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isSuccess: state.user.isSuccess,
  error: state.message.error,
  message: state.message.message,
});

export default connect(mapStateToProps)(UserEdit);
