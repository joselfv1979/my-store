import React from "react";
import { AppWaiting, AppMessage } from "../../components/appStatus/AppStatus";
import UserForm from "../../components/userForm/UserForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addUser, cancelUserMessage } from "../../store/user/userActions";
import { Message, Status } from "../../types/Message";
import { User } from "../../types/User";

const UserAddPage = () => {
  const dispatch = useAppDispatch();

  const { error, message, status } = useAppSelector((state) => state.user);

  const note: Message = {
    type: error ? Status.DANGER : Status.SUCCESS,
    text: error ?? message,
  };  
  
  const saveUser = async (data: User) => {
    dispatch(addUser(data))
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {status === 'loading' ? <AppWaiting /> : <UserForm saveUser={saveUser} />}
    </>
  );
};

export default UserAddPage;
