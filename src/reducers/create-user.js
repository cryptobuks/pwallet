import {
    CREATE_USER,
    CREATE_USER_FAILURE,
    CREATE_USER_SUCCESS
} from '../actions/types';

const initialState = {
    isLoading: false,
    refreshing: false,
    hasError: false,
    idToken: []
};

const createUser = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {...state, isLoading: true, hasError: false};
        case CREATE_USER_SUCCESS:
            return {...state, isLoading: true, hasError: false, idToken: action.payload};
        case CREATE_USER_FAILURE:
            return {...state, isLoading: false, hasError: true};
        default:
            return state;
    }
};

export default createUser
