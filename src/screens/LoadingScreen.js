import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import GLOBAL from '../helpers/globals';

import {StorageHelper} from "../helpers/StorageHelper";
import {connect} from "react-redux";

class LoadingScreen extends React.Component<any, any> {

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {
        let that = this.props

        StorageHelper.getFirstData().then((res) => {
            const token = res[0][1];
            const uri = res[1][1];
            if (token) GLOBAL.token = token;
            if (uri) GLOBAL.API_URI = uri;
            if (token) {
                GLOBAL.token = token;
                that.appScreen()
            } else {
                that.loginScreen()
            }
        }).catch((err) => {
            that.loginScreen()
        });

    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

LoadingScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

LoadingScreen.navigationOptions = {
    title: 'Log In',
};
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    loginScreen: () => dispatch({type: 'Logout'}),
    appScreen: () => dispatch({type: 'Login'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
