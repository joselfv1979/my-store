import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserContext } from '../context/UserContext';
import axios from "axios";
import styles from '../css/LoginPage.css'

const LoginPage = () => {

    const { setError } = useContext(AppContext);
    const { setUsername, setRole, setIsAdmin } = useContext(UserContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    const history = useHistory();

    const logging = ({ username, role, id }) => {
        setUsername(username);
        setRole(role);
        if (role === 'admin') setIsAdmin(true);
        localStorage.setItem('username', username)
        localStorage.setItem('role', role);
        localStorage.setItem('id', id)
        history.push('/');
    }

    const checkLogging = async (user) => {
        try {
            const { data } = await axios.post('/users/sign-in', user);
            if (data.success) logging(data.user);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        const user = { username: name, password }

        checkLogging(user);
    }

    const showPassword = () => {
        let pwdInput = document.querySelector('.pwd-input');
        pwdInput.type === "password" ? pwdInput.type = "text" : pwdInput.type = "password";
    }

    const goRegister = event => {
        event.preventDefault();
        history.push('/register');
        setError(null);
    }

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleFormSubmit}>

                <div className="content">

                    <div className="header">
                        <h2>Log In</h2>
                        <p>login here using your username and password</p>
                    </div>

                    <div className="fields">
                        <fieldset>
                            <div className="user">
                                <input
                                    type="text"
                                    name="username"
                                    className="user-input"
                                    placeholder="Username"
                                    required
                                    autoFocus
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="pwd">
                                <input
                                    type="password"
                                    name="password"
                                    className="pwd-input"
                                    placeholder="Password"
                                    required
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="eye" onClick={showPassword}>
                            </div>
                        </fieldset>

                    </div>

                </div>

                <div className="buttons">

                    <button className="log-in">Log in</button>

                    <p>Have no account?</p>

                    <button className="sign-up"
                        onClick={goRegister}
                    >
                        Sign up
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </button>
                    
                </div>

            </form>
        </div>
    )
}

export default LoginPage;