import React, {useEffect } from 'react';
import axios from "axios";
import RegisterForm from '../components/RegisterForm';

const AccountPage = () => {

    useEffect(() => {
        let id = localStorage.getItem('id');
        console.log(id);
        const getUser = async (id) => {
            try {
                const { data } = await axios.get(`/users/${id}`);
                if (data.success) {
                    // setMessage(data.message);
                    console.log(data.user);
                };
            } catch (error) {
                // setMessage(error.response.data.message)
                console.log(error);
            }
         };
         getUser(id);
    }, [])

    return (
        <div>
            <h1>My Account</h1>
            <RegisterForm />
        </div>
    )
}

export default AccountPage;