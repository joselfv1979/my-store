import * as actions from '../actions/cartActions';

export const initialState = {
    cartList: [],
    totalPrice: null,
    error: null
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case actions.ADD_TO_LIST:

            action.payload.quantity = 1;

            return {
                ...state,
                cartList: [...state.cartList, action.payload]
            }

        case actions.ADD_QUANTITY:

            ++ action.payload.quantity;

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === action.payload.id
                        ? action.payload : product)]
            }

        case actions.SUBTRACT_QUANTITY:

            -- action.payload.quantity;

            return {
                ...state,
                cartList: [...state.cartList.map(product =>
                    product.id === action.payload.id
                        ? {...product, quantity: action.payload.quantity}
                        : product
                ).filter(product => product.quantity > 0)]
            }

        default:
            return state;
    }
}

export default cartReducer;