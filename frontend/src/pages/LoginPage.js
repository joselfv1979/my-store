import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import axios from "axios";

const LoginPage = () => {

    const { setUsername, setRole, setIsAdmin } = useContext(UserContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const history = useHistory();

    const logging = ({username, role, id}) => {
        setUsername(username);
        setRole(role);
        if(role === 'admin') setIsAdmin(true);
        localStorage.setItem('username', username)
        localStorage.setItem('role', role);
        localStorage.setItem('id', id)
        history.push('/');
    }

    const checkLogging = async (user) => {
        try {
            const { data } = await axios.post('/users/sign-in', user);
            if(data.success) logging(data.user);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        const user = { username: name, password }

        checkLogging(user);
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