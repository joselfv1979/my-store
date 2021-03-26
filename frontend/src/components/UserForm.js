import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import { useLocation, useHistory } from 'react-router-dom';

const UserForm = ({ user, id, setUser, validateUserData }) => {

    const [showPasswordInput, setShowPasswordInput] = useState(true);

    const { setError } = useContext(AppContext);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.pathname === '/edit-profile') {
            setShowPasswordInput(false);
        }
    }, [location.pathname])

    const handleInputChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = (event) => {

        event.preventDefault();

        validateUserData(user);

        // if(validateUserData(user)) {
        //     document.getElementById('username').value='';
        //     document.getElementById('email').value='';
        //     if(showPasswordInput) document.getElementById('password').value='';
        // }
    }

    const showPassword = () => {
        let pwdInput = document.querySelector('.pwd-input');
        pwdInput.type === "password" ? pwdInput.type = "text" : pwdInput.type = "password";
    }

    const goLogin = event => {

        event.preventDefault();

        history.push('/login');

        setError(null);
    }

    return (
        <form className="user-form" onSubmit={handleFormSubmit}>

            <div className="content">

                <div className="header">
                    {id ? <h2>My Account</h2> : <h2>Register</h2>}
                </div>

                <div className="fields">
                    <fieldset>
                        <div className="user">
                            <input type="text"
                                name="username"
                                id="username"
                                className="user-input"
                                placeholder="Username"
                                required
                                autoFocus
                                onChange={handleInputChange}
                                defaultValue={user.username}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="email">
                            <input type="text"
                                name="email"
                                id="email"
                                className="email-input"
                                placeholder="Email"
                                required
                                onChange={handleInputChange}
                                defaultValue={user.email}
                            /></div>
                    </fieldset>

                    {showPasswordInput ? (
                        <fieldset>
                            <div className="pwd">
                                <input type="password"
                                    name="password"
                                    id="password"
                                    className="pwd-input"
                                    placeholder="Password"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="eye" onClick={showPassword}>
                            </div>
                        </fieldset>
                    ) : null}

                </div>

                <div className="buttons">

                    <button className="log-in"
                    >Save</button>

                    <p>Have an account?</p>
                    <button className="sign-in"
                        onClick={goLogin}
                    >
                        Sign in
                    <i className="fas fa-user"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UserForm;