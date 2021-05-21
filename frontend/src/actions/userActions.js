import axios from 'axios';
import { setMessage, setError, clearMessage } from './messageActions';
import { history } from '../utils/history';
import { getAuthToken } from '../utils/localStorage';
import { validateUser } from '../utils/ValidateForm';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER = 'UPDATE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const getUser = () => ({
    type: GET_USER
})

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user
})

export const getUserFailure = () => ({
    type: GET_USER_FAILURE
})

export function getUserAction(id) {

    return async (dispatch) => {

        dispatch(getUser());

        try {
            let token = getAuthToken();
            const { data } = await axios.get(`/users/${id}`, {
                headers: { 'Authorization': `${token}` }
            });
            dispatch(getUserSuccess(data.result))
        } catch (error) {
            console.log(error);
            dispatch(getUserFailure());
            dispatch(setMessage(error.response.data.message));
        }
    }
}

export const register = () => ({
    type: REGISTER
})

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const registerFailure = () => ({
    type: REGISTER_FAILURE
})

export function registerAction(user) {
    return async (dispatch) => {

        dispatch(register())

        const { valid, message } = validateUser(user);
        if (!valid) {
            dispatch(setError(message));
            return;
        }

        try {
            const { data } = await axios.post(`/users/sign-up`, user);
            if (data) {
                dispatch(registerSuccess());
                dispatch(setMessage(data.message));
                setTimeout(() => {
                    history.push('/login');
                }, 1500);
            }
        } catch (error) {
            dispatch(registerFailure());
            let message = "Sign up error, try it later"
            dispatch(setError(error.response.data.message || message))
        }
    }
}

export const login = () => ({
    type: LOGIN
})

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE,

})

export function loginAction(user) {
    return async (dispatch) => {

        dispatch(login());

        try {
            const { data } = await axios.post(`/users/sign-in`, user);
            setTimeout(() => {
                dispatch(loginSuccess(data.user));
                history.push('/');
            }, 1500)
        } catch (error) {
            let message = "Invalid credentials";
            setTimeout(() => {
                dispatch(loginFailure());
                dispatch(setError(error.response.data.message || message));
            }, 1500);
        }
    }
}

export const logout = () => ({
    type: LOGOUT
})

export function logoutAction() {
    return (dispatch) => {
        dispatch(logout());
        console.log('history');
        history.push('/');
    }
}

export const updateUser = () => ({
    type: UPDATE_USER
})

export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user
})

export const updateUserFailure = () => ({
    type: UPDATE_USER_FAILURE
})

export function updateUserAction(user) {
    return async (dispatch) => {

        dispatch(updateUser());

        try {
            let token = getAuthToken();
            const { data } = await axios.put(`/users/user-edit/${user.id}`, user, {
                headers: { 'Authorization': `${token}` }
            })
            dispatch(updateUserSuccess(data.body));
            dispatch(setMessage('Update successful'));
            setTimeout(() => {
                dispatch(clearMessage());
            }, 2000)
        } catch (error) {
            let message = 'User updating failure';
            dispatch(updateUserFailure());
            dispatch(setError(error.response.data.message || message));
        }
    }
}

export const deleteUser = () => ({
    type: DELETE_USER
})

export const deleteUserSuccess = (id) => ({
    type: DELETE_USER_SUCCESS,
    payload: id
})

export const deleteUserFailure = () => ({
    type: DELETE_USER_FAILURE
})

export function deleteUserAction(id) {
    return async (dispatch) => {

        dispatch(deleteUser());

        try {
            let token = getAuthToken();
            const { data } = await axios.delete(`/delete-user/${id}`, {
                headers: { 'Authorization': `${token}` }
            })
            dispatch(deleteUserSuccess(id));
        } catch (error) {
            console.log(error);
            let message = 'User deleting failure'
            dispatch(deleteUserFailure());
            dispatch(setMessage(error.response.data.message || message));
        }
    }
}

