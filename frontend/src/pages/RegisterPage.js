import React, { useState } from 'react';
import axios from "axios";
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {

    const [message, setMessage] = useState(null);

    const registerUser = async (user) => {
        console.log('uu', user);
        try {
            const { data } = await axios.post('/users/sign-up', user);
            if (data.success) {
                setMessage(data.message);
                console.log(data.body);
            };
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }

    const validateForm = ({ username, email, password, role }) => {

        if (username.length < 3) {
            setMessage('username must contain 3 characters at least');
            return false;
        }

        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email)) {
            setMessage("Please enter valid email address.");
            return false;
        }

        if (password.length < 4) {
            setMessage('password must contain 4 characters at least');
            return false;
        }

        const user = { username, email, password, role };
        registerUser(user);
        return true;
    }



    return (
        <div>
            <h2>Registro de usuarios</h2>
            {message ? (<div>{message}</div>) : null}
            <RegisterForm
                validateForm={validateForm}
            />
        </div>
    )
}

export default RegisterPage;