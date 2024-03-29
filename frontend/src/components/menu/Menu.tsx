import { LogoutIcon } from "../svgs/Icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logout } from "../../store/user/userActions";
import { isAdmin } from "../../store/user/userSlice";
import { totalItems } from "../../store/cart/cartSlice";
import { emptyCart } from "../../store/cart/cartActions";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../../assets/scss/Menu.module.scss";

// Nav component displays menu options depending on authentication and user's role
const Menu = () => {
  const dispatch = useAppDispatch();

  const { authUser } = useAppSelector((state) => state.user);
  const admin = useAppSelector(isAdmin);
  const items = useAppSelector(totalItems);

  const logoutUser = (): void => {
    dispatch(logout());
    dispatch(emptyCart());
  };

  return (
    <Navbar className={"navbar navbar-dark " + styles.menuBg}>
      <Nav className={"container-fluid " + styles.header}>
        <Nav.Item className={styles.title}>
          <Navbar.Brand className={"navbar-brand " + styles.title}>
            My Store
          </Navbar.Brand>
        </Nav.Item>
        {admin && (
          <>
            <Nav.Item>
              <Nav.Link href="/new-product">Add product</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav.Item>
          </>
        )}
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
        {authUser ? (
          <Nav.Item className="ms-auto">
            <Nav.Link href={`/edit-profile/${authUser.id}`}>
              {authUser.username}
              <button className={styles.logout} onClick={logoutUser}>
                <LogoutIcon width="1.5rem" />
              </button>
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
