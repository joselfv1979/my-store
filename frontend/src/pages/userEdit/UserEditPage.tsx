import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  cancelUserMessage,
  editUser,
  fetchUser,
} from "../../store/user/userActions";
import { User } from "../../types/User";
import { AppMessage, AppWaiting } from "../../components/appStatus/AppStatus";
import UserForm from "../../components/userForm/UserForm";
import { getMessage } from "utils/handleMessage";

// Displays the form to edit an existing user
const UserEdit = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, user, message, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {    
    if (id) dispatch(fetchUser(id));
  }, [dispatch, id]);

  const note = getMessage(error, message);

  const saveUser = async (data: User) => {
    dispatch(editUser(data));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {user && <UserForm saveUser={saveUser} editing={true} />}
    </>
  );
};

export default UserEdit;
