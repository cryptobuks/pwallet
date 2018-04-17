import {
    FETCH_USERINFO,
    FETCH_USERINFO_FAILURE,
    FETCH_USERINFO_SUCCESS
} from '../actions/types';

const initialState = {
    isLoading: false,
    refreshing: false,
    hasError: false,
    userInfo: []
};

const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERINFO:
            return {...state, isLoading: true, hasError: false};
        case FETCH_USERINFO_SUCCESS:
            return {...state, isLoading: true, hasError: false, userInfo: action.payload};
        case FETCH_USERINFO_FAILURE:
            return {...state, isLoading: false, hasError: true};
        default:
            return state;
    }
};

export default userInfo
