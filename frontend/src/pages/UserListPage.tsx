import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../scss/UserListPage.module.scss";

//{ dispatch, userList }
const UserListPage = () => {
  // useEffect(() => {
  //   dispatch(getUserListAction());
  // }, [dispatch]);

  const navigate = useNavigate();

  const userList: string[] = [];
  const UserList = () => {

    return userList.map((i) => (
      <li key={i} className={styles.card}>
        <div className={styles.image}></div>
        <p>{'username'}</p>
        <div className={styles.buttons}>
          <button
            className={styles.edit}
            onClick={() => navigate(`/edit-profile/${'0'}`)}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>

          <button
            className={styles.remove}
            onClick={() => {
              if (window.confirm("Are you sure to delete?")) {
                console.log('delete')
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
        {/* <UserList /> */}
      </ul>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   userList: state.user.userList,
// });

// export default connect(mapStateToProps)(UserListPage);
export default UserListPage;
