import React from "react";
import { AppWaiting, AppMessage } from "../components/AppStatus";
import UserForm from "../components/UserForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { addUser, cancelUserMessage } from "../store/user/userActions";
import { Message, Status } from "../types/Message";
import { User } from "../types/User";

const UserAddPage = () => {
  const dispatch = useAppDispatch();

  const { error, message, loading } = useAppSelector((state) => state.user);

  const note: Message = error
  ? {
      type: Status.DANGER,
      text: error,
    }
  : {
      type: Status.SUCCESS,
      text: message,
    };
  
  const saveUser = (data: User) => {
    dispatch(addUser(data))
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {loading && <AppWaiting />}
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      <UserForm saveUser={saveUser} />
    </>
  );
};

export default UserAddPage;
