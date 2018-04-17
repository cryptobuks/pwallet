/**
 * @flow
 */

import type {
    NavigationScreenProp,
    NavigationEventSubscription,
} from 'react-navigation';


import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import Profile from '../screens/ProfileScreen';
import DevToolsScreen from '../screens/DevToolsScreen';
import Colors from "./Colors";
import SendScreen from "../screens/SendScreen";
import TransactionsScreen from "../screens/TransactionsScreen";


const MyHomeScreen = ({navigation}) => (
    <SafeAreaView forceInset={{horizontal: 'always', top: 'always'}}>
        <SampleText>{"Send PW"}</SampleText>
        <SendScreen navigation={navigation}/>
        <StatusBar barStyle="default"/>
    </SafeAreaView>
);

MyHomeScreen.navigationOptions = {
    title: "Log in",
    headerTintColor: Colors.white,
    headerStyle: {
        backgroundColor: Colors.headerColor,
        elevation: null
    },
    headerTitleStyle: {
        fontSize: 14,
        fontWeight: "bold"
    },
    tabBarTestIDProps: {
        testID: 'TEST_ID_HOME',
        accessibilityLabel: 'TEST_ID_HOME_ACLBL',
    },
    tabBarLabel: 'Send',
    tabBarIcon: ({tintColor, focused}) => (<Ionicons
        name={focused ? 'ios-paper-plane' : 'ios-paper-plane-outline'}
        size={26}
        style={{color: tintColor}}
    />),
};


type AllTransactionsScreenProps = {
    navigation: NavigationScreenProp<*>,
};

class AllTransactionsScreen extends React.Component<AllTransactionsScreenProps> {
    _s0: NavigationEventSubscription;
    _s1: NavigationEventSubscription;
    _s2: NavigationEventSubscription;
    _s3: NavigationEventSubscription;

    static navigationOptions = {
        tabBarLabel: 'Transactions',
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={focused ? 'md-swap' : 'ios-swap'}
                size={26}
                style={{color: tintColor}}
            />
        ),
    };

    componentDidMount() {
        this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
        this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
        this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
        this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
    }

    componentWillUnmount() {
        this._s0.remove();
        this._s1.remove();
        this._s2.remove();
        this._s3.remove();
    }

    _onEvent = a => {
        console.log('EVENT ON TRANSACTIONS TAB', a.type, a);
    };

    render() {
        const {navigation} = this.props;
        return <SafeAreaView forceInset={{horizontal: 'always', top: 'always'}}>
            <SampleText>{"Transactions"}</SampleText>
            <TransactionsScreen navigation={navigation}/>
            <StatusBar barStyle="default"/>
        </SafeAreaView>;
    }
}

type MyProfileScreenProps = {
    navigation: NavigationScreenProp<*>,
};

class MyProfileScreen extends React.Component<MyProfileScreenProps> {
    _s0: NavigationEventSubscription;
    _s1: NavigationEventSubscription;
    _s2: NavigationEventSubscription;
    _s3: NavigationEventSubscription;

    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={focused ? 'ios-man' : 'ios-man-outline'}
                size={26}
                style={{color: tintColor}}
            />
        ),
    };

    componentDidMount() {
        this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
        this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
        this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
        this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
    }

    componentWillUnmount() {
        this._s0.remove();
        this._s1.remove();
        this._s2.remove();
        this._s3.remove();
    }

    _onEvent = a => {
        console.log('EVENT ON PROFILE TAB', a.type, a);
    };

    render() {
        const {navigation} = this.props;
        return <SafeAreaView forceInset={{horizontal: 'always', top: 'always'}}>
            <SampleText>{"Profile"}</SampleText>
            <Profile navigation={navigation}/>
            <StatusBar barStyle="default"/>
        </SafeAreaView>;
    }
}

const MySettingsScreen = ({navigation}) => (
    <DevToolsScreen banner="Dev tools" navigation={navigation}/>
);

MySettingsScreen.navigationOptions = {
    tabBarLabel: 'Dev tools',
    tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
            name={focused ? 'ios-hammer' : 'ios-hammer-outline'}
            size={26}
            style={{color: tintColor}}
        />
    ),
};

const SimpleTabs = createBottomTabNavigator(
    {

        Send: {
            screen: MyHomeScreen,
            path: '',
        },
        Transactions: {
            screen: AllTransactionsScreen,
            path: 'tr',
        },
        Profile: {
            screen: MyProfileScreen,
            path: 'pr',
        },
        DevTools: {
            screen: MySettingsScreen,
            path: 'dev',
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#888',
        },
    }
);

type SimpleTabsContainerProps = {
    navigation: NavigationScreenProp<*>,
};

class SimpleTabsContainer extends React.Component<SimpleTabsContainerProps> {
    static router = SimpleTabs.router;
    _s0: NavigationEventSubscription;
    _s1: NavigationEventSubscription;
    _s2: NavigationEventSubscription;
    _s3: NavigationEventSubscription;

    componentDidMount() {
        this._s0 = this.props.navigation.addListener('willFocus', this._onAction);
        this._s1 = this.props.navigation.addListener('didFocus', this._onAction);
        this._s2 = this.props.navigation.addListener('willBlur', this._onAction);
        this._s3 = this.props.navigation.addListener('didBlur', this._onAction);
    }

    componentWillUnmount() {
        this._s0.remove();
        this._s1.remove();
        this._s2.remove();
        this._s3.remove();
    }

    _onAction = a => {
        console.log('TABS EVENT', a.type, a);
    };

    render() {
        return <SimpleTabs navigation={this.props.navigation}/>;
    }
}

export default SimpleTabsContainer;
