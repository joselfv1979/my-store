export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const CLEAR = 'CLEAR';

export function setError(message) {
    return {
        type: ERROR,
        message
    }
}

export function clearMessage() {
    return {
        type: CLEAR
    }
}

export function setMessage(message) {
    return {
        type: SUCCESS,
        message
    }
}
