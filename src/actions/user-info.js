import {
    FETCH_USERINFO,
    FETCH_USERINFO_FAILURE,
    FETCH_USERINFO_SUCCESS
} from './types';

import {getProfile} from '../network/api';

export function fetchProfile() {
    return dispatch => {
        dispatch({type: FETCH_USERINFO});
        return getProfile()
            .then(
                profile =>
                    dispatch({type: FETCH_USERINFO_SUCCESS, payload: profile})
            )
            .catch(
                (err) => {
                    if (err.response && err.response.status === 401) {
                        return dispatch({type: 'Logout'});
                    }
                    dispatch({type: FETCH_USERINFO_FAILURE, payload: err});
                }
            );
    };
}