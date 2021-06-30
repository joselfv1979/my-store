import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CloseIcon, LogoutIcon, CartIcon } from "./Icons";
import styles from "../scss/Menu.module.scss";

const Menu = ({ logged, user, items, userLogout }) => {
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("guest");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleClick = () => {
    setOpenMobileMenu(false);
  };

  const logout = () => {
    handleClick();
    userLogout();
  };

  useEffect(() => {
    logged ? setUsername(user.username) : setUsername("");
    logged ? setRole(user.role) : setRole("user");
    user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  }, [logged, user]);

  const CartLink = () => {
    return (
      <NavLink className={styles.cartLink} to="/cart">
        <span className={styles.cartButton}>
          <CartIcon />
        </span>
        <span className={styles.text}>Cart</span>
        <span className={styles.number}>({items})</span>
      </NavLink>
    );
  };

  const AdminSettings = () => {
    return (
      <>
        <li className={styles.users}>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li className={styles.store}>
          <NavLink to="/">Store</NavLink>
        </li>
        <li className={styles.about}>
          <NavLink to="/about">About</NavLink>
        </li>
      </>
    );
  };

  const UserSettings = () => {
    return (
      <>
        <li>
        </li>
        <li className={styles.store}>
          <NavLink to="/">Store</NavLink>
        </li>
        <li className={styles.about}>
          <NavLink to="/about">About</NavLink>
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
        <NavLink to={`/edit-profile/${user.id}`}>{username}</NavLink>
        <span className={styles.logout} onClick={logout}>
          <LogoutIcon />
        </span>
      </li>
    );
  };

  const SignNav = () => {
    return (
      <li className={styles.sign}>
        <NavLink to="/login" className={styles.login}>
          Login
        </NavLink>
        <NavLink to="/register" className={styles.register}>
          Register
        </NavLink>
      </li>
    );
  };

  document.addEventListener(
    "click",
    (e) => {
      if (e.target.tagName === "A") {
        setOpenMobileMenu(false);
      }
    },
    false
  );

  const UserMenu = () => {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.mobileHeader}>
            <h3>My Store</h3>
            <span onClick={() => setOpenMobileMenu(false)}>
              <CloseIcon />
            </span>
          </div>
          <ul className={styles.settings}>{roleSettings(username)[role]}</ul>
          <>{logged ? <UsernameNav /> : <SignNav />}</>
        </div>
        <div className={styles.shadow}></div>
      </>
    );
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Store</h1>
      {isAdmin ? null : <CartLink />}
      <div className={styles[`${openMobileMenu ? "open" : "menu"}`]}>
        <UserMenu />
      </div>
      <button
        className={styles.hamburguer}
        onClick={() => setOpenMobileMenu(true)}
      >
        <i className="fa fa-bars bars-button"></i>
      </button>
    </header>
  );
};

export default Menu;
