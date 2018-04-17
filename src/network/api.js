import axios from 'axios'
import {
    ApiNewSession,
    ApiNewTransaction,
    ApiNewUser,
    ApiTransactions,
    ApiUserInfo,
    ApiUsersList
} from "./config";

const httpClient = axios.create({
    timeout: 2500
});
import GLOBAL from '../helpers/globals';

export function createUser(params) {
    return httpClient.post(ApiNewUser(), params);
}

export function createSession(params) {
    console.log(ApiNewSession(), params)
    return httpClient.post(ApiNewSession(), params);
}

export function createTransaction(params) {
    return httpClient.post(ApiNewTransaction(), params, {
        headers: {Authorization: "bearer " + GLOBAL.token}
    });
}

export function getUsers(params) {
    return httpClient.post(ApiUsersList(), params, {
        headers: {Authorization: "bearer " + GLOBAL.token}
    });
}


//get
export function getTransactions() {
    return httpClient.get(ApiTransactions(), {
        headers: {Authorization: "bearer " + GLOBAL.token}
    });
}

export function getProfile() {
    return httpClient.get(ApiUserInfo(), {
        headers: {Authorization: "bearer " + GLOBAL.token}
    });
}
