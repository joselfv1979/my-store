import * as productActions from '../actions/productsActions';
import * as userActions from '../actions/userActions';
import * as cartActions from '../actions/cartActions';

const productList = JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).product.productList : [];

const product = JSON.parse(localStorage.getItem('state')) ?
    JSON.parse(localStorage.getItem('state')).product.product : null;

export const initialState = {
    productList, product, loading: false
}

const productsReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {

        case productActions.GET_PRODUCTS:

            return { ...state, loading: true };

        case productActions.GET_PRODUCTS_SUCCESS:

            return { ...state, productList: payload, loading: false };

        case productActions.GET_PRODUCTS_FAILURE:

            return { ...state, loading: false };

        case productActions.GET_PRODUCT:

            return { ...state, product: null, loading: true };

        case productActions.GET_PRODUCT_SUCCESS:

            return { ...state, product: payload, loading: false };

        case productActions.GET_PRODUCT_FAILURE:

            return { ...state, product: null, loading: false };

        case productActions.ADD_PRODUCT:

            return { ...state };

        case productActions.ADD_PRODUCT_SUCCESS:

            return {
                ...state,
                productList: [payload, ...state.productList]
            };

        case productActions.ADD_PRODUCT_FAILURE:

            return { ...state };

        case productActions.DELETE_PRODUCT:

            return { ...state };

        case productActions.DELETE_PRODUCT_SUCCESS:

            return {
                productList: state.productList.filter(product => product.id !== Number(payload))
            };

        case productActions.DELETE_PRODUCT_FAILURE:

            return { ...state };

        case productActions.EDIT_PRODUCT:

            return { ...state };

        case productActions.EDIT_PRODUCT_SUCCESS:

            return {
                ...state,
                productList: state.productList.map(product => Number(product.id) === Number(payload.id)
                    ? { ...product, ...payload } : product)
            };

        case productActions.EDIT_PRODUCT_FAILURE:

            return { ...state };

        case userActions.LOGOUT:

            return {
                ...state,
                productList: [...state.productList.map(product => product = { ...product, quantity: 0 })]
            }

        case cartActions.CLEAR_CART:

            return {
                ...state,
                productList: [...state.productList.map(product => product = { ...product, quantity: 0 })]
            }

        default:
            return state;
    }

}

export default productsReducer;