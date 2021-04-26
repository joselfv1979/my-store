import axios from 'axios';
import { setError, setMessage, hideMessage } from './messageActions';
import { getAuthToken } from '../utils/localStorage';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
})

export function getProductsAction(parameters) {

    return async (dispatch) => {

        dispatch(getProducts());

        try {
            const { data } = parameters ?
                await axios.get(`/products/filter${parameters}`)
                : await axios.get(`/products`)
                console.log(data);
            dispatch(getProductsSuccess(data));
        } catch ({ response }) {
            let message = "Couldn't get products, try it later";
            dispatch(setError(message));
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

export function addProductAction(product) {
    return async (dispatch) => {

        dispatch(addProduct())

        try {
            let token = getAuthToken();
            const { data } = await axios.post(`/products/product-add`, product, {
                headers: { 'Authorization': `${token}` }
            });
            dispatch(addProductSuccess(data.body));
            dispatch(setMessage(data.message));
        } catch ({ response }) {
            let message = "Couldn't create product, try it later";
            dispatch(dispatch(setError(message)))
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

export function deleteProductAction(id) {

    return async (dispatch) => {

        dispatch(deleteProduct())

        try {
            let token = getAuthToken();
            const response = await axios.delete(`/products/${id}`, {
                headers: { 'Authorization': `${token}` }
            });
            console.log('error', response);
            dispatch(deleteProductSuccess(id))
        } catch (error) {
            console.log('error', error.response);
            let message = "Couldn't delete this product"
            dispatch(setError(error.response.data.message || message))
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

export function editProductAction(product, id) {
    return async (dispatch) => {

        dispatch(editProduct())

        try {
            let token = getAuthToken();
            const { data } = await axios.put(`/products/product-edit/${id}`, product, {
                headers: { 'Authorization': `${token}` }
            });
            dispatch(editProductSuccess(data.body));
            dispatch(setMessage(data.message));
            setTimeout(() => {
                dispatch(hideMessage());
            }, 3000);
        } catch (error) {
            dispatch(setError(error.response.data.message))
        }
    }
}