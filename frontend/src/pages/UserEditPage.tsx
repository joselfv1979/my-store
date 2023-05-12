import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Message, Status } from "../types/Message.d";
import { cancelUserMessage, editUser, fetchUser } from "../store/user/userActions";
import { User } from "../types/User";
import { AppMessage, AppWaiting } from "../components/AppStatus";
import UserForm from "../components/UserForm";

const UserEdit = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { loading, user, message, error } = useAppSelector(
    (state) => state.user
  );

  console.log('user', id);
  
  const note: Message = error
  ? {
      type: Status.DANGER,
      text: error,
    }
  : {
      type: Status.SUCCESS,
      text: message,
    };

    useEffect(() => {
      if (id) dispatch(fetchUser(id));
    }, [dispatch, id]);
  
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

