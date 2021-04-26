import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ logged, user, userLogout}) => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('guest');

    useEffect(() => {

        if(logged){
            setRole(user.role);
            setUsername(user.username);
        }
     } , [logged, user]);

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
                <NavLink className="link" to="/">Home</NavLink>
                <NavLink className="link" to="/edit-profile">My account</NavLink>
                <NavLink className="link" to="/about">About</NavLink>
            </>
        );
    };

    const GuestSettings = () => {
        return (
            <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/about">About</NavLink>
            </>
        );
    };

    const roleSettings = () => ({
        admin: <AdminSettings />,
        user: <UserSettings />,
        guest: <GuestSettings />
    });

    return (
        <header className="menu-container">
            <div className="menu-content">
                <ul className="menu-ul">
                    {roleSettings(username)[role]}
                </ul>
                <h2 className="menu-title">My Store</h2>
                {logged ? (
                    <div className="menu-login">
                        <span className="username">Hello, {username}</span>
                        <span className="link" onClick={() => userLogout()}>Logout</span>
                    </div>
                ) : <NavLink className="menu-login" to="/login">Login</NavLink>}
            </div>

        </header>
    )
}

export default Menu;