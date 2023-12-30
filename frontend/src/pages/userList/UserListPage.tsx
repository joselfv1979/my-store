import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { cancelUserMessage, fetchUsers } from "../../store/user/userActions";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import UserList from "../../components/userList/UserList";
import { getMessage } from "utils/handleMessage";

// Displays a list of users
const UserListPage = () => {
  const dispatch = useAppDispatch();

  const { status, users, message, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const note = getMessage(error, message);

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {status === 'loading' && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {users && <UserList />}
    </>
  );
};

export default UserListPage;
