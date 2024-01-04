import { getMessage } from "utils/handleMessage";
import { AppWaiting, AppMessage } from "../../components/appStatus/AppStatus";
import UserForm from "../../components/userForm/UserForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addUser, cancelUserMessage } from "../../store/user/userActions";
import { User } from "../../types/User";

// Displays the user registration form
const UserAddPage = () => {
  const dispatch = useAppDispatch();

  const { error, message, loading } = useAppSelector((state) => state.user);

  const note = getMessage(error, message);

  const saveUser = async (data: User) => {
    dispatch(addUser(data));
  };

  const cancelMessage = () => {
    dispatch(cancelUserMessage());
  };

  return (
    <>
      {note.text && <AppMessage note={note} cancelMessage={cancelMessage} />}
      {loading ? <AppWaiting /> : <UserForm saveUser={saveUser} />}
    </>
  );
};

export default UserAddPage;
