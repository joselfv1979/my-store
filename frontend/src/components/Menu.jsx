import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Menu = ({ logged, user, items, userLogout }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("guest");

  const history = useHistory();

  useEffect(() => {
    if (logged) {
      setRole(user.role);
      setUsername(user.username);
    } else {
      setRole("user");
    }
  }, [logged, user]);

  const CartLink = () => {
    return (
      <NavLink className="cart-link" to="/cart">
        <button className="cart-button" onClick={() => history.push("/cart")}>
          <i className="fas fa-shopping-cart"><span>{items}</span></i>
        </button>
        Cart
      </NavLink>
    );
  };

  const UserMenu = () => {
    return (
      <div className="menu-user">
        <NavLink to="/edit-profile">My account</NavLink>
        <span className="greeting">Hi, {username}</span>
        <span className="link" onClick={() => userLogout()}>
          <i className="fas fa-sign-out-alt"></i>
        </span>
      </div>
    );
  };

  const SignMenu = () => {
    return (
      <div className="menu-sign">
        <NavLink to="/login">Login</NavLink>
        <span> / </span>
        <NavLink to="/register">Register</NavLink>
      </div>
    );
  };

  const AdminSettings = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/new">New Product</NavLink>
        <NavLink to="/about">About</NavLink>
      </>
    );
  };

  const UserSettings = () => {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <CartLink />
      </>
    );
  };

  const roleSettings = () => ({
    admin: <AdminSettings />,
    user: <UserSettings />,
  });

  return (
    <header className="menu-container">
      <ul className="menu-ul">{roleSettings(username)[role]}</ul>
      <h2 className="menu-title">My Store</h2>
      {logged ? <UserMenu /> : <SignMenu />}
    </header>
  );
};

export default Menu;
