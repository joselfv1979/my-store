export const ADD_TO_LIST = 'ADD_TO_LIST';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';

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
