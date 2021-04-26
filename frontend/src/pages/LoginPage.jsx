import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { loginAction } from './../actions/userActions';
import { useHistory } from "react-router-dom";
import '../css/LoginPage.css';

const LoginPage = ({ dispatch, logged }) => {

    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    const history = useHistory();

    useEffect(() => {
        if(logged){
            history.push('/')
        }
    }, [history, logged])

    const handleFormSubmit = event => {
        event.preventDefault();

        const user = { username: name, password }

        dispatch(loginAction(user));  
    }

    const showPassword = () => {
        let pwdInput = document.querySelector('.pwd-input');
        pwdInput.type === "password" ? pwdInput.type = "text" : pwdInput.type = "password";
    }

    const goRegister = event => {
        event.preventDefault();
        history.push('/register');
    }

    return (

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
        
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    logged: state.user.logged,
    error: state.message.error,
    message: state.message.message
  });

export default connect(mapStateToProps)(LoginPage);