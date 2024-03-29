import { Button, Card } from 'react-bootstrap'
import { User } from '../../types/User'
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteUser } from "../../store/user/userActions";
import styles from "../../assets/scss/UserListPage.module.scss";

type Props = {
    user: User;
}
// Component for displaying a user
const UserCard = ({ user }: Props) => {
  const dispatch = useAppDispatch();;

const removeUser = () => {
  if (user.id) dispatch(deleteUser(user.id));
}
  return (
    <Card className={styles.card}>
        <Card.Title>{user.username}</Card.Title>
        <Card.Body>{user.email}</Card.Body>
        <Button variant="danger" onClick={() => removeUser()}>
        <i className="fas fa-trash-alt"></i>
      </Button>
    </Card>
  )
}

export default UserCard