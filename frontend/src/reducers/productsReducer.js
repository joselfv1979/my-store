import * as actions from '../actions/productsActions'

export const initialState = {
    products: [],
    loading: false,
    error: null,
    // product: {}
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PRODUCTS:
            return { ...state, loading: true };
        case actions.GET_PRODUCTS_SUCCESS:
            return { products: action.payload, loading: false, error: null };
        case actions.GET_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case actions.ADD_PRODUCT:
            return { ...state, error: null };
        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case actions.ADD_PRODUCT_FAILURE:
            return { ...state, error: action.error };
        case actions.DELETE_PRODUCT:
            return { ...state, error: null };
        case actions.DELETE_PRODUCT_SUCCESS:
            return {
                products: state.products.filter(product => product.id !== Number(action.payload)),
                error: null
            };
        case actions.DELETE_PRODUCT_FAILURE:
            return {
                ...state, error: action.error
            };
        case actions.EDIT_PRODUCT:
            return {
                ...state, error: null
            };
        case actions.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products.map((product) => product.id === Number(action.payload.id) ?
                    action.payload : product)]
            };
        case actions.EDIT_PRODUCT_FAILURE:
            return {
                ...state, error: ''
            };
        default:
            return state;
    }
}

export default productsReducer;