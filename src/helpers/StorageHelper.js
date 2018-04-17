import {AsyncStorage} from "react-native";
import GLOBAL from '../helpers/globals';

export var StorageHelper;
(function (StorageHelper) {
    const TOKEN_KEY = "TOKEN_KEY_2";
    const TOKEN_API = "TOKEN_KEY_3";

    function clear() {
        return AsyncStorage.clear();
    }

    function onSignIn(token) {
        GLOBAL.token = token;
        return AsyncStorage.setItem(TOKEN_KEY, token);
    }

    function saveApiUrl(uri) {
        GLOBAL.API_URI = uri;
        return AsyncStorage.setItem(TOKEN_API, uri);
    }

    function getFirstData() {
        return AsyncStorage.multiGet([
            TOKEN_KEY,
            TOKEN_API
        ]);
    }

    function onSignOut() {
        return AsyncStorage.removeItem(TOKEN_KEY);
    }

    StorageHelper.getToken = () => AsyncStorage.getItem(TOKEN_KEY)
    StorageHelper.getStoredApiUrl = () => AsyncStorage.getItem(TOKEN_API)

    StorageHelper.onSignIn = onSignIn;
    StorageHelper.getFirstData = getFirstData;
    StorageHelper.saveApiUrl = saveApiUrl;

    StorageHelper.clear = clear;
    StorageHelper.onSignOut = onSignOut;

})(StorageHelper || (StorageHelper = {}));
