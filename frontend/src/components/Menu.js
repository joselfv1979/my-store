import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Menu = () => {

    const { username, setUsername, role, setRole, setIsAdmin } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        if (localStorage.getItem('role')) setRole(localStorage.getItem('role'));
    }, []);

    const logout = () => {
        setUsername(null);
        setIsAdmin(false);
        setRole('guest');
        localStorage.clear();
        history.push('/');
    }

    const AdminSettings = () => {
        return (
            <>
                <NavLink className="link" to="/">Home</NavLink>
                <NavLink className="link" to="/new">New Product</NavLink>
                <NavLink className="link" to="/about">About</NavLink>
            </>
        );
    };

    const UserSettings = () => {
        return (
            <>
                <NavLink className="link" to="/">Home</NavLink>
                <NavLink className="link" to="/my-account">My account</NavLink>
                <NavLink className="link" to="/about">About</NavLink>
            </>
        );
    };

    const GuestSettings = () => {
        return (
            <>
                <NavLink className="link" to="/">Home</NavLink>
                <NavLink className="link" to="/register">Register</NavLink>
                <NavLink className="link" to="/about">About</NavLink>
            </>
        );
    };

    const roleSettings = () => ({
        admin: <AdminSettings />,
        user: <UserSettings />,
        guest: <GuestSettings />
    });

    return (
        <header className="principal">
            <ul>
                {roleSettings(username)[role]}
                {username ? (
                    <div id="login">
                        <span className="username">Hello, {username}</span>
                        <span className="link" onClick={logout}>Logout</span>
                    </div>
                ) : <NavLink className="link" id="login" to="/login">Login</NavLink>}
            </ul>

            <h1>My Store</h1>
            <p>The best products</p>
        </header>
    )
}

export default Menu;