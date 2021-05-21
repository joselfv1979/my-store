import * as messageActions from '../actions/messageActions';

export const initialState = {
    message: null
}

const messageReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case messageActions.SUCCESS:
            return { ...state, message: action.message, type: 'success' };

        case messageActions.ERROR:
            return { ...state, message: action.message, type: 'error' };

        case messageActions.CLEAR:
            return { ...state, message: null };

        default:
            return state;
    }
}

export default messageReducer;