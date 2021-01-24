import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Logged from './Logged';

const Header = () => {

    const { username } = useContext(UserContext);

    return (
        <header className="principal">
            <ul>
                <NavLink className="link" to="/">Home</NavLink>
                <NavLink className="link" to="/new">New Product</NavLink>
                <NavLink className="link" to="/register">Register</NavLink>
                {username ? <Logged></Logged> : <NavLink className="link" id="login" to="/login">Login</NavLink>}
            </ul>
            <h1>My Store</h1>
            <p>The best products</p>
        </header>
    )
}

export default Header;