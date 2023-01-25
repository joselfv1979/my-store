import React from "react";
import UserForm from "../components/UserForm";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addUser } from "../store/user/userActions";
import { User } from "../types/User";

const UserAddPage = () => {
  const dispatch = useAppDispatch();
  
  const saveUser = async (data: User) => {
    dispatch(addUser(data))
  };

  return <UserForm saveUser={saveUser} />;
};

export default UserAddPage;
