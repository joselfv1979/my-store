import * as messageActions from '../actions/messageActions';

export const initialState = {
    error: null,
    message: null
}

const messageReducer = (state = initialState, action) => {
    // const { error, message } = action;
    switch (action.type) {
        case messageActions.SET_MESSAGE:
            return { ...state, message: action.message };

        case messageActions.HIDE_MESSAGE:
            return { ...state, message: null };

        case messageActions.SET_ERROR:
            return { ...state, error: action.error };

        case messageActions.HIDE_ERROR:
            return { ...state, error: null };

        default:
            return state;
    }


}

export default messageReducer;