import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { cancelUserMessage, fetchUsers } from "../../store/user/userActions";
import { Message, Status } from "../../types/Message";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import UserList from "../../components/userList/UserList";

const UserListPage = () => {
  const dispatch = useAppDispatch();

  const { status, users, message, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const note: Message = {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };  

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
