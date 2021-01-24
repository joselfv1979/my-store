import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const users = [
    {
        username: 'admin',
        password: '1234'
    },
    {
        username: 'user',
        password: '1234'
    }
]

const LoginPage = () => {

    const {setUsername} = useContext(UserContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const history = useHistory();

    const logging = () => {
        setUsername(name);
        history.push('/');
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        const [result] = users.filter(item => item.username === name && item.password === password);

        result ? logging() : setError('Invalid credentials');
    }

    return (
        <div>
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>x</button>
                </div>
            ) : null}
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        onChange={event =>
                            setName(event.target.value)
                        }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={event =>
                            setPassword(event.target.value)
                        }
                    />
                </fieldset>

                <button>Login</button>

            </form>
        </div>
    )
}

export default LoginPage;