import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { cancelUserMessage, fetchUsers } from "../store/user/userActions";
import { Message, Status } from "../types/Message";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import UserList from "../components/UserList";

const UserListPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { loading, users, message, error } = useAppSelector(
    (state) => state.user
  );

  const note: Message = error
    ? {
        type: Status.DANGER,
        text: error,
      }
    : {
        type: Status.SUCCESS,
        text: message,
      };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {users && <UserList />}
    </>
  );
};

export default UserListPage;
