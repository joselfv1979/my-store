import { LogoutIcon } from "./Icons";
import styles from "../scss/Menu.module.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../store/user/userActions";

const Menu = () => {
  const dispatch = useAppDispatch();

  const { loggedUser } = useAppSelector((state) => state.user);

  const logoutUser = () => dispatch(logout());

  return (
    <Navbar className={"navbar navbar-dark " + styles.header}>
      <Nav className="container-fluid">
        <Nav.Item className={styles.title}>
          <Navbar.Brand className={"navbar-brand " + styles.title}>
            My Store
          </Navbar.Brand>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/new-product">Add product</Nav.Link>
        </Nav.Item>
        {loggedUser ? (
          <Nav.Item className="ms-auto">
            <Nav.Link href={`/edit-profile/${"0"}`}>
              {loggedUser.username}
              <span className={styles.logout}
                onClick={logoutUser}
              >
                <LogoutIcon width="1.5rem" />
              </span>
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

export default Menu;
