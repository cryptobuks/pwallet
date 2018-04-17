import {ToastAndroid} from "react-native";

export function showError(error) {
    let errorText = error.toString();
    if (error.response) errorText = error.response.data;
    ToastAndroid.showWithGravityAndOffset(
        errorText,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
}