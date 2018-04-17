import React from "react";
import {View, ActivityIndicator} from "react-native";
import {Spacer} from "./Spacer";

const Spinner = ({size}) => {
    return (
        <View style={styles.spinnerStyle}>
            <Spacer/>
            <ActivityIndicator size={size || "large"}/>
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
};

export {Spinner};
