import axios from 'axios';
import { setError, setMessage } from './messageActions';
import { history } from '../utils/history';
import { getAuthToken } from '../utils/localStorage';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
})

export const getProductsFailure = () => ({
    type: GET_PRODUCTS_FAILURE
})

export function getProductsAction(parameters) {

    return async (dispatch) => {

        dispatch(getProducts());

        try {
            const { data } = await axios.get(`/products${parameters}`)
            console.log('dataArray',data);
            dispatch(getProductsSuccess(data));
        } catch ({ response }) {
            let message = "Couldn't get products, try it later";
            dispatch(getProductsFailure());
            dispatch(setError(message));
        }
    }
}

export const getProduct = () => ({
    type: GET_PRODUCT
})

export const getProductSuccess = (product) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: product,
})

export const getProductFailure = () => ({
    type: GET_PRODUCT_FAILURE
})

export function getProductAction(id) {

    return async (dispatch) => {

        dispatch(getProduct());

        try {
            const { data } = await axios.get(`/products/${id}`);
            setTimeout(() => {
                dispatch(getProductSuccess(data.product));
            }, 1500)
        } catch ({ response }) {
            let message = "Couldn't get product, try it later";
            setTimeout(() => {
                dispatch(getProductFailure());
                dispatch(setError(message));
            }, 1500);
        }
    }
}

export const addProduct = () => ({
    type: ADD_PRODUCT
})

export const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product,
})

export const addProductFailure = () => ({
    type: ADD_PRODUCT_FAILURE
})

export function addProductAction(product) {
    return async (dispatch) => {

        dispatch(addProduct())

        try {
            let token = getAuthToken();
            const { data } = await axios.post(`/products/product-add`, product, {
                headers: { 'Authorization': `${token}` }
            });
            if (data) {
                dispatch(addProductSuccess(data.body));
                dispatch(setMessage(data.message));
                setTimeout(() => {
                    history.push('/');
                }, 2000);
            }
        } catch ({ response }) {
            let message = "Couldn't create product, try it later";
            dispatch(addProductFailure());
            dispatch(setError(response.data.message || message));
        }
    }
}

export const deleteProduct = () => ({
    type: DELETE_PRODUCT
})

export const deleteProductSuccess = (id) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: id,
})

export const deleteProductFailure = () => ({
    type: DELETE_PRODUCT_FAILURE
})

export function deleteProductAction(id) {

    return async (dispatch) => {

        dispatch(deleteProduct())

        try {
            let token = getAuthToken();
            const { data } = await axios.delete(`/products/${id}`, {
                headers: { 'Authorization': `${token}` }
            });
            if (data) {
                dispatch(deleteProductSuccess(id));
                dispatch(setMessage(data.message));
                setTimeout(() => {
                    history.push('/');
                }, 2000);
            }
        } catch (error) {
            let message = "Couldn't delete this product"
            dispatch(deleteProductFailure());
            dispatch(setError(error.response.data.message || message));
        }
    }
}

export const editProduct = () => ({
    type: EDIT_PRODUCT
})

export const editProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product,
})

export const editProductFailure = () => ({
    type: EDIT_PRODUCT_FAILURE
})

export function editProductAction(product, id) {
    return async (dispatch) => {

        dispatch(editProduct())

        try {
            let token = getAuthToken();
            const { data } = await axios.put(`/products/product-edit/${id}`, product, {
                headers: { 'Authorization': `${token}` }
            });
            if (data) {
                console.log('data', data.body.id);
                dispatch(editProductSuccess(data.body));
                dispatch(setMessage(data.message));
                setTimeout(() => {
                    history.push('/');
                }, 2000);
            }
        } catch (error) {
            let message = "Couldn't update product, try it again later";
            dispatch(editProductFailure());
            dispatch(setError(error.response.data.message || message));
        }
    }
}