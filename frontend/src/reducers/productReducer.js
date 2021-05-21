import * as productActions from '../actions/productsActions';

const product = 
JSON.parse(localStorage.getItem('state')) ? 
JSON.parse(localStorage.getItem('state')).product.product 
: null

export const initialState = {
    product, loading: false
}

const productReducer = (state = initialState, action) => {

    switch (action.type) {

        case productActions.GET_PRODUCT:

            return { ...state, product: null, loading: true };

        case productActions.GET_PRODUCT_SUCCESS:

            return { product: action.payload, loading: false };

        case productActions.GET_PRODUCT_FAILURE:

            return { ...state, product: null, loading: false }

            default: return { ...state };
    }
}

export default productReducer;