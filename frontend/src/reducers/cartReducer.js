import * as cartActions from '../actions/cartActions';
import * as userActions from '../actions/userActions';

export const initialState = {
    cartList: []
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case cartActions.ADD_TO_LIST:

            console.log(action.payload);

            return {
                ...state,
                cartList: [...state.cartList, action.payload]
            }


        case cartActions.ADD_QUANTITY:

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === action.payload.id
                        ? action.payload : product)]
            }

        case cartActions.SUBTRACT_QUANTITY:

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity }
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