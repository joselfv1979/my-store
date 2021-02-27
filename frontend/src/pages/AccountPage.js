import React, {useEffect } from 'react';
import axios from "axios";
import RegisterForm from '../components/RegisterForm';

const AccountPage = () => {

    useEffect(() => {
        let id = localStorage.getItem('id');
        console.log(id);
    })

    return (
        <div>
            <h1>My Account</h1>
            <RegisterForm />
        </div>
    )
}

export default AccountPage;