import * as cartActions from '../actions/cartActions';
import * as userActions from '../actions/userActions';

const cartList = JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).cart.cartList : []

export const initialState = {
    cartList
}

const cartReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {

        case cartActions.ADD_TO_LIST:

            payload.quantity = 1;

            return {
                ...state,
                cartList: [...state.cartList, payload]
            }


        case cartActions.ADD_QUANTITY:

            ++payload.quantity;

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === payload.id
                        ? payload : product)]
            }

        case cartActions.SUBTRACT_QUANTITY:

            --payload.quantity;

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === payload.id
                        ? payload
                        : product
                ).filter(product => product.quantity > 0)]
            }

        case cartActions.CLEAR_CART:

            return { ...state, cartList: [], totalPrice: null };

        case userActions.LOGOUT:

            return { ...state, cartList: [], totalPrice: null };

        default:
            return state;

    }
}

export default cartReducer;