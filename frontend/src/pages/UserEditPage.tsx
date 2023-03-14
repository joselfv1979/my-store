import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../scss/EditUserPage.module.scss";

//{ match, dispatch, user }
const UserEdit = () => {
 // const { id } = match.params;

  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   const getUser = async (id) => {
  //     try {
  //       let token = getAuthToken();
  //       const { data } = await axios.get(`/users/${id}`, {
  //         headers: { Authorization: `${token}` },
  //       });
  //       setUserData(data.user);
  //     } catch (error) {
  //       dispatch(setError(error.response.data.message));
  //     }
  //   };
  //   getUser(id);
  // }, [dispatch, id]);

  const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   setUserData({
  //     ...userData,
  //     [name]: value,
  //   });
  // };

  // const getOutForm = () => {
  //   user.role === "admin" ? navigate("/users") : navigate("/");
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(updateUserAction(userData));
  //   getOutForm();
  // };

  return (
    <div className={styles.modal} onSubmit={() => console.log('submit')
    }>
      <form className={styles.form}>
        <h2>Edit</h2>
        <fieldset>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="off"
            required
            onChange={() => console.log('submit')}
            defaultValue={'username'}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="off"
            required
            onChange={() => console.log('submit')}
            defaultValue={'emIL'}
          />
        </fieldset>
        <div className={styles.buttons}>
          <button className={styles.save}>Save</button>
          <button className={styles.cancel} onClick={() => console.log('submit')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
