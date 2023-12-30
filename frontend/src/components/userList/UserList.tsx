import { useAppSelector } from "../../hooks/redux-hooks";
import { getUsers } from "../../store/user/userSlice";
import { Col, Row } from "react-bootstrap";
import UserCard from "../userCard/UserCard";
// Component for displaying a user list
const UserList = () => {
  const users = useAppSelector(getUsers);

  return (
    <Row>
      {users.map((user) => (
        <Col key={user.id}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
};

export default UserList;
