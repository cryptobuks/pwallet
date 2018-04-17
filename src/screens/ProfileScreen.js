import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import {Button} from "react-native-elements";
import {StorageHelper} from "../helpers/StorageHelper";


class ProfileScreen extends Component {
    logOut = () => {
        try {
            StorageHelper.onSignOut();
        } catch (error) {
        }
        const {navigation} = this.props;
        navigation.dispatch({type: 'Logout'})
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.logOut}
                    title="Logout"
                    buttonStyle={styles.signUpBtn}
                    textStyle={{
                        fontSize: 13,
                        fontWeight: "bold"
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F5FCFF',
    },
    signUpBtn: {
        marginTop: 15,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#02b875"
    }
});
ProfileScreen.navigationOptions = {
    title: 'Profile',
};

export default ProfileScreen;
