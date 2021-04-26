import axios from 'axios';
import { setError, setMessage, hideError } from './messageActions';
import { getProductsAction } from './productsActions'
import { getAuthToken } from '../utils/localStorage';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const DELETE_USER = 'UPDATE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const getUser = () => ({
    type: GET_USER
})

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user
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
        }
    }
}

export const register = () => ({
    type: REGISTER
})

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export function registerAction(user) {
    return async (dispatch) => {
        dispatch(register())

        try {
            const response = await axios.post(`/users/sign-up`, user);
            dispatch(registerSuccess());
        } catch (error) {
            console.log(error);
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

        // localStorage.clear();
        dispatch(login());

        try {
            const { data } = await axios.post(`/users/sign-in`, user);
            dispatch(loginSuccess(data.user));
        } catch (error) {
            dispatch(loginFailure());
            let message = "Invalid credentials";
            dispatch(setError(error.response.data.message || message));
        }
    }
}

export const logout = () => ({
    type: LOGOUT
})

export function logoutAction() {
    return (dispatch) => {
        dispatch(logout());
        localStorage.clear();
        dispatch(getProductsAction());
    }
}

export const updateUser = () => ({
    type: UPDATE_USER
})

export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user
})

export function updateUserAction(id, user) {
    return async (dispatch) => {

        dispatch(updateUser());

        try {
            let token = getAuthToken();
            const { data } = await axios.put(`/update-user/${id}`, user, {
                headers: { 'Authorization': `${token}` }
            })
            dispatch(updateUserSuccess(data.body));
        } catch (error) {
            console.log(error);
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
        }
    }
}

