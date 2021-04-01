import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

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

export const getProductsFailure = (message) => ({
    type: GET_PRODUCTS_FAILURE,
    error: message
})

export function getProductsAction() {

    return async (dispatch) => {

        dispatch(getProducts())

        try {
            const { data } = await axios.get(`/products`);

            dispatch(getProductsSuccess(data.result))
        } catch ({ response }) {
            let message = "Couldn't get products, try it later";
            dispatch(getProductsFailure(message))
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
    type: ADD_PRODUCT_FAILURE,
})

export function addProductAction(product) {
    return async (dispatch) => {

        dispatch(addProduct())

        try {
            const { data } = await axios.post(`/products/product-add`, product);

            dispatch(addProductSuccess(data.body))
        } catch ({ response }) {
            let message = "Couldn't create product, try it later";
            dispatch(getProductsFailure(message))
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
    type: DELETE_PRODUCT_FAILURE,
})

export function deleteProductAction(id) {

    return async (dispatch) => {
        
        dispatch(deleteProduct())

        try {
            await axios.delete(`/products/${id}`);

            dispatch(deleteProductSuccess(id))
        } catch (error) {
            let message = "Couldn't delete this product"
            dispatch(deleteProductFailure(message))
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
    type: EDIT_PRODUCT_FAILURE,
})

export function editProductAction(product, id) {
    return async (dispatch) => {

        dispatch(editProduct())

        try {
            const { data } = await axios.put(`/products/product-edit/${id}`, product);

            dispatch(editProductSuccess(data.body))
        } catch (error) {
            dispatch(deleteProductFailure())
        }
    }
}