import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RegisterForm = ({ validateForm }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [showPasswordInput, setShowPasswordInput] = useState(true)

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/my-account') {
            setShowPasswordInput(false)
        }
    }, [])

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const user = {
            username, email, password, role: 'user'
        }

        if (validateForm(user)) clearForm()
    }

    const clearForm = () => {

        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("password").value = '';
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <fieldset>
                <label htmlFor="username">Username:</label>
                <input type="text"
                    name="username"
                    id="username"
                    required
                    autoFocus
                    onChange={event =>
                        setUsername(event.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email:</label>
                <input type="text"
                    name="email"
                    id="email"
                    required
                    onChange={event =>
                        setEmail(event.target.value)}
                />
            </fieldset>
            {showPasswordInput ? (
                <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        required
                        onChange={event =>
                            setPassword(event.target.value)}
                    />
                </fieldset>
            ) : null}

            <button>Submit</button>
        </form>
    )
}

export default RegisterForm;