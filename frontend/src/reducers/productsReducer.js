import * as productActions from '../actions/productsActions';
import * as cartActions from '../actions/cartActions';

export const initialState = {
    productList: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).products.productList : [],
    loading: false,
}

const productsReducer = (state = initialState, action) => {

    switch (action.type) {

        case productActions.GET_PRODUCTS:

            return { ...state, loading: true };

        case productActions.GET_PRODUCTS_SUCCESS:

            return { productList: action.payload, loading: false };

        case productActions.ADD_PRODUCT:

            return { ...state };

        case productActions.ADD_PRODUCT_SUCCESS:

            return {
                ...state,
                productList: [action.payload, ...state.productList]
            };

        case productActions.DELETE_PRODUCT:

            return { ...state };

        case productActions.DELETE_PRODUCT_SUCCESS:

            return {
                productList: state.productList.filter(product => product.id !== Number(action.payload))
            };

        case productActions.EDIT_PRODUCT:

            return { ...state };

        case productActions.EDIT_PRODUCT_SUCCESS:

            return {
                ...state,
                productList: state.productList.map(product => product.id === Number(action.payload.id)
                    ? action.payload : product)
            };

        case cartActions.ADD_TO_LIST:

            action.payload.quantity = 1;

            return {
                ...state,
                productList: [...state.productList.map(product =>
                    product.id === action.payload.id
                        ? action.payload : product)]
            }

        case cartActions.ADD_QUANTITY:

            ++action.payload.quantity;

            return {
                ...state,
                productList: [...state.productList.map(product =>
                    product.id === action.payload.id
                        ? action.payload : product)]
            }

        case cartActions.SUBTRACT_QUANTITY:

            --action.payload.quantity;

            return {
                ...state,
                productList: [...state.productList.map(product =>
                    product.id === action.payload.id
                        ? action.payload : product)]
            }

        default:
            return state;
    }

}

export default productsReducer;