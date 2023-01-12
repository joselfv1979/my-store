import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CloseIcon, LogoutIcon, CartIcon } from "./Icons";
import styles from "../scss/Menu.module.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//{ logged, user, items, userLogout }

const Menu = () => {
  // const [username, setUsername] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [role, setRole] = useState("guest");
  // const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // const handleClick = () => {
  //   setOpenMobileMenu(false);
  // };

  // const logout = () => {
  //   handleClick();
  //   userLogout();
  // };

  // useEffect(() => {
  //   logged ? setUsername(user.username) : setUsername("");
  //   logged ? setRole(user.role) : setRole("user");
  //   user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  // }, [logged, user]);

  const CartLink = () => {
    return (
      <Link className={styles.cartLink} to="/cart">
        <span className={styles.cartButton}>
          <CartIcon />
        </span>
        <span className={styles.text}>Cart</span>
        <span className={styles.number}>({"0"})</span>
      </Link>
    );
  };

  const AdminSettings = () => {
    return (
      <>
        <li className={styles.users}>
          <Link to="/users">Users</Link>
        </li>
        <li className={styles.store}>
          <Link to="/">Store</Link>
        </li>
        <li className={styles.about}>
          <Link to="/about">About</Link>
        </li>
      </>
    );
  };

  const UserSettings = () => {
    return (
      <>
        <li></li>
        <li className={styles.store}>
          <Link to="/">Store</Link>
        </li>
        <li className={styles.about}>
          <Link to="/about">About</Link>
        </li>
      </>
    );
  };

  const roleSettings = () => ({
    admin: <AdminSettings />,
    user: <UserSettings />,
  });

  const UsernameNav = () => {
    return (
      <li className={styles.username}>
        <Link to={`/edit-profile/${"0"}`}>{"user"}</Link>
        <span className={styles.logout} onClick={() => console.log("logout")}>
          <LogoutIcon width="1rem" />
        </span>
      </li>
    );
  };

  const SignNav = () => {
    return (
      <li className={styles.sign}>
        <Link to="/login" className={styles.login}>
          Login
        </Link>
        <Link to="/register" className={styles.register}>
          Register
        </Link>
      </li>
    );
  };

  // document.addEventListener(
  //   "click",
  //   (e) => {
  //     if (e.target.tagName === "A") {
  //       setOpenMobileMenu(false);
  //     }
  //   },
  //   false
  // );

  const UserMenu = () => {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.mobileHeader}>
            <h3>My Store</h3>
            <span onClick={() => console.log("close")}>
              <CloseIcon />
            </span>
          </div>
          <ul className={styles.settings}>{"user"}</ul>
          {/* <>{'user' ? <UsernameNav /> : <SignNav />}</> */}
          <SignNav />
        </div>
        <div className={styles.shadow}></div>
      </>
    );
  };

  return (
    <Navbar className={styles.header}>
      <Container>
        <Navbar.Brand className={styles.title}>My Store</Navbar.Brand>
        {/* {'user' ? null : <CartLink />}
      <div className={styles[`${'user' ? "open" : "menu"}`]}>
        <UserMenu />
      </div>
      <button
        className={styles.hamburguer}
        onClick={() => console.log('close')}
      >
        <i className="fa fa-bars bars-button"></i>
      </button> */}
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/new-product">Add product</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/login" className={styles.login}>Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
