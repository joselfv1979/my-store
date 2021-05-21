import React from "react";
import { connect } from "react-redux";
import { registerAction, updateUserAction } from "./../actions/userActions";
import UserForm from "../components/UserForm";

const UserFormPage = ({ dispatch, user }) => {
  const sendDataUser = async (user) => {
    user.id ? dispatch(updateUserAction(user)) : dispatch(registerAction(user));
  };

  return <UserForm sendDataUser={sendDataUser} user={user} />;
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isSuccess: state.user.isSuccess,
  error: state.message.error,
  message: state.message.message,
});

export default connect(mapStateToProps)(UserFormPage);
