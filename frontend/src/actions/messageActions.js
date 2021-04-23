// errorTypes
export const SET_ERROR = "SET_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";
// messageTypes
export const SET_MESSAGE = 'SET_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

// errorActions
export function setError(error) {
    return {
        type: SET_ERROR,
        error: error
    }
}

export function hideError() {
    return {
        type: HIDE_ERROR
    }
}

//messageActions 
export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message: message
    }
}

export function hideMessage() {
    return {
        type: HIDE_MESSAGE
    }
}

