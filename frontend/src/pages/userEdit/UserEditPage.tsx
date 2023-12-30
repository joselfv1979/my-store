import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Message, Status } from "../../types/Message";
import {
  cancelUserMessage,
  editUser,
  fetchUser,
} from "../../store/user/userActions";
import { User } from "../../types/User";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import UserForm from "../../components/userForm/UserForm";

// Displays the form to edit an existing user
const UserEdit = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { status, user, message, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {    
    if (id) dispatch(fetchUser(id));
  }, [dispatch, id]);

  const note: Message = {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };

  const saveUser = async (data: User) => {
    dispatch(editUser(data));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {status === "loading" && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {user && <UserForm saveUser={saveUser} editing={true} />}
    </>
  );
};

export default UserEdit;
