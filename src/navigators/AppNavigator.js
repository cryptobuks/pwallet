import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BackHandler, ToastAndroid} from 'react-native';
import {NavigationActions, createSwitchNavigator, createStackNavigator} from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import AppStack from '../components/SimpleTabs';
import {addListener} from '../utils/redux';
import RegisterScreen from "../screens/RegisterScreen";

export const LoginStack = createStackNavigator({
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen}
});

export const AppNavigator = createSwitchNavigator({
    App: {screen: AppStack},
    Loading: {screen: LoadingScreen},
    Login: {screen: LoginStack},
});

class AppWithNavigationState extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {

        const {dispatch, nav} = this.props;

        if (nav.exit === 1) {
            BackHandler.exitApp();
            return true;
        }

        if (nav.index === 0) {
            ToastAndroid.showWithGravityAndOffset(
                'Press back again for exit!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );

            nav.exit = 1;

            setTimeout(function () {
                nav.exit = 2
            }, 1000);

            dispatch({type: 'FirstBack'});
            return true;
        }

        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {dispatch, nav} = this.props;
        return (
            <AppNavigator
                navigation={{
                    dispatch,
                    state: nav,
                    addListener,
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
