import React from "react";
import {View, StyleSheet} from "react-native";

let styles = {};

const Spacer = () => <View style={styles.container}/>;

styles = StyleSheet.create({
    container: {
        height: 1,
        marginTop: 20
    }
});

export {Spacer};
