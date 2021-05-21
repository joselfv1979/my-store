import { setMessage } from './messageActions';

export const ADD_TO_LIST = 'ADD_TO_LIST';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addToList = (product) => ({
    type: ADD_TO_LIST,
    payload: product
})

export const addQuantity = (product) => ({
    type: ADD_QUANTITY,
    payload: product
})

export const subtractQuantity = (product) => ({
    type: SUBTRACT_QUANTITY,
    payload: product
})

export const clearCart = () => ({
    type: CLEAR_CART,
})

export function clearCartAction(message) {
    return (dispatch) => {
        dispatch(clearCart());
        dispatch(setMessage(message));
    }
}
