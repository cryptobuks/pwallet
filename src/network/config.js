export const API_URL = 'http://localhost/';
export const API_URL_END = '?secrets_k=123123';

import GLOBAL from '../helpers/globals';

getApiUrl = () => (GLOBAL.API_URI ? GLOBAL.API_URI : API_URL);
getApiSecret = () => (GLOBAL.API_URI && GLOBAL.API_URI !== API_URL ? '' : API_URL_END);

//post
export const ApiNewUser = () => {
    return getApiUrl() + '/users' + getApiSecret();
};
export const ApiNewSession = () => {
    return getApiUrl() + '/sessions/create' + getApiSecret();
};

export const ApiNewTransaction = () => {
    return getApiUrl() + '/api/protected/transactions' + getApiSecret();
};
export const ApiUsersList = () => {
    return getApiUrl() + '/api/protected/users/list' + getApiSecret();
};


//get
export const ApiTransactions = () => {
    return getApiUrl() + '/api/protected/transactions' + getApiSecret();
};
export const ApiUserInfo = () => {
    return getApiUrl() + '/api/protected/user-info' + getApiSecret();
};