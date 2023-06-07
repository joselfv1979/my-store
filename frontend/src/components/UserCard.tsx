import { Card } from 'react-bootstrap'
import { User } from '../types/User'
import styles from "../scss/UserListPage.module.scss";

type Props = {
    user: User;
}
const UserCard = ({ user }: Props) => {
  return (
    <Card className={styles.card}>
        <Card.Title>{user.username}</Card.Title>
        <Card.Body>{user.email}</Card.Body>
    </Card>
  )
}

export default UserCard