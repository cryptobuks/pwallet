import React from "react";
import {StyleSheet, View, Button as RNButton} from "react-native";

export const Button = props => (
    <View style={styles.container}>
        <RNButton {...props}/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingLeft: 35,
        paddingRight: 35
    },
});