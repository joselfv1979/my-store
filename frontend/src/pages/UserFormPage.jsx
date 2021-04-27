import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import UserForm from '../components/UserForm';
import { validateUser } from '../utils/ValidateForm';
import '../css/UserFormPage.css';


const UserFormPage = () => {

    const history = useHistory();

    const [user, setUser] = useState({});
    const [id, setId] = useState(null);

    useEffect(() => {

        let userId = localStorage.getItem('id');

        if (userId) {
            setId(userId);

            const getUser = async (id) => {

                try {
                    const { data } = await axios.get(`/users/${id}`);
                    if (data.success) {
                        //console.log(data.user);
                        setUser(data.user);
                    };
                } catch (error) {
                    //console.log(error);
                }
            };
            getUser(userId);
        }
    }, []);

    // const validateUserData = (user) => {
    //     const { valid, message } = validateUser(user);
    //     valid ? sendDataUser(user) : setError(message);
    //     return valid;
    // }

    const sendDataUser = async (user) => {

        id ? updateUser(user) : createUser(user);
    }

    const createUser = async (user) => {

        try {
            const { data } = await axios.post('/users/sign-up', user);
            if (data.success) {
                // setMessage(data.message);
                // setTimeout(() => {
                //     setMessage(null);
                //     history.push('/login');
                // }, 2000)
            };
        } catch ({ response }) {
            // response.data.message ?
            //     setError(response.data.message) :
            //     setError("Couldn't create this user");
        }
    }

    const updateUser = async (user) => {

        try {
            const { data } = await axios.put(`/users/user-edit/${id}`, user);
            if (data.success) {
                // setMessage(data.message);
                // setTimeout(() => {
                //     setMessage(null);
                // }, 2000)
            };
        } catch ({ response }) {
            // response.data.message ?
            //     setError(response.data.message) :
            //     setError("Couldn't update this user");
        }
    }

    return (
        <div className="user-container">
            <UserForm
                // validateUserData={validateUserData}
                user={user}
                id={id}
                setUser={setUser}
            />
        </div>
    )
}

export default UserFormPage;