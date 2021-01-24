import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Logged = () => {

    const { username, setUsername } = useContext(UserContext);
    console.log('header', username);

    const logout = () => {
        setUsername(null);
    }

    return (
        <div id="login">
            <span className="username">Hello, {username}</span>
            <span className="link" onClick={logout}>Logout</span>
        </div>
    )
}

export default Logged;

