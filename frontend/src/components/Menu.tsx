import { LogoutIcon } from "./Icons";
import styles from "../scss/Menu.module.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../store/user/userActions";
import { isAdmin } from "../store/user/userSlice";
import { totalItems } from "../store/cart/cartSlice";

const Menu = () => {
  const dispatch = useAppDispatch();

  const { loggedUser } = useAppSelector((state) => state.user);
  const admin = useAppSelector(isAdmin);
  const items = useAppSelector(totalItems);

  const logoutUser = () => dispatch(logout());

  return (
    <Navbar
      className="navbar navbar-dark"
      style={{ backgroundColor: "#252537" }}
    >
      <Nav className={"container-fluid " + styles.header}>
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
          <Nav.Link href="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            {items > 0 && <span className={styles.badge}>{items}</span>}
          </Nav.Link>
        </Nav.Item>
        {admin && (
          <Nav.Item>
            <Nav.Link href="/new-product">Add product</Nav.Link>
          </Nav.Item>
        )}
        {loggedUser ? (
          <Nav.Item className="ms-auto">
            <Nav.Link href={`/edit-profile/${"0"}`}>
              {loggedUser.username}
              <span className={styles.logout} onClick={logoutUser}>
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
