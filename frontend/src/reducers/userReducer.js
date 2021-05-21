import * as userActions from '../actions/userActions';

const initialState = {
    user: {},
    logged: false,
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case userActions.GET_USER:

            return { ...state, loading: true };

        case userActions.GET_USER_SUCCESS:

            return { ...state, user: action.payload, loading: false };

        case userActions.GET_USER_FAILURE:

            return { ...state, loading: false };

        case userActions.REGISTER:

            return { ...state, loading: true };

        case userActions.REGISTER_SUCCESS:

            return { ...state, user: action.payload, loading: false };

        case userActions.REGISTER_FAILURE:

            return { ...state };

        case userActions.LOGIN:

            return { ...state, loading: true };

        case userActions.LOGIN_SUCCESS:

            return { ...state, user: action.payload, logged: true, loading: false };

        case userActions.LOGIN_FAILURE:

            return { ...state, logged: false, loading: false };

        case userActions.LOGOUT:

            return { ...state, user: {}, logged: false };

        case userActions.UPDATE_USER:

            return { ...state, loading: true };

        case userActions.UPDATE_USER_SUCCESS:

            return { ...state, user: action.payload, loading: false };

        case userActions.UPDATE_USER_FAILURE:

            return { ...state, loading: false };

        case userActions.DELETE_USER:

            return { ...state, loading: true };

        case userActions.DELETE_USER_SUCCESS:

            return { ...state, user: {}, loading: false };

        case userActions.DELETE_USER_FAILURE:

            return { ...state, loading: false };

        default:
            return state;
    }
}

export default userReducer;