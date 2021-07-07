import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserListAction, deleteUserAction } from "../actions/userActions";
import { connect } from "react-redux";
import styles from "../scss/UserListPage.module.scss";

const UserListPage = ({ dispatch, userList }) => {
  useEffect(() => {
    dispatch(getUserListAction());
  }, [dispatch]);
  console.log("users...........", userList);

  const history = useHistory();

  const UserList = () => {

    return userList.map((user, i) => (
      <li key={i} className={styles.card}>
        <div className={styles.image}></div>
        <p>{user.username}</p>
        <div className={styles.buttons}>
          <button
            className={styles.edit}
            onClick={() => history.push(`/edit-profile/${user.id}`)}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>

          <button
            className={styles.remove}
            onClick={() => {
              if (window.confirm("Are you sure to delete?")) {
                dispatch(deleteUserAction(user.id))
              }
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </li>
    ));
  };
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <ul>
        <UserList />
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userList: state.user.userList,
});

export default connect(mapStateToProps)(UserListPage);
