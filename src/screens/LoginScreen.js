import React, {Component} from "react";

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, ToastAndroid
} from "react-native";

import {Button} from "react-native-elements";

import {
    InputGroup,
    Spacer,
    Spinner
} from "../components";

import Colors from "../components/Colors";
import {StorageHelper} from "../helpers/StorageHelper";
import {createSession} from "../network/api";
import GLOBAL from '../helpers/globals';
import {showError} from "../utils/errorHandler";

class LoginScreen extends Component {
    static navigationOptions = {
        title: "Log in to Parrot Wallet",
        headerTintColor: Colors.white,
        headerStyle: {
            backgroundColor: Colors.headerColor,
            elevation: null
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            submitted: false
        };

        this.updateForm = this.updateForm.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.register = this.register.bind(this);
        this.skipLogin = this.skipLogin.bind(this);
    }

    componentDidMount() {
        /*setInterval(async () => {
            console.log('Inside setInterval')
            const data = await AsyncStorage.getAllKeys()
            console.log('inside the getAllKeys 11000')
            data.forEach(async k => {
                const value = await AsyncStorage.getItem(k)
                console.group(k)
                console.log(value)
                console.groupEnd()
            })
        }, 11000)*/
    }


    tryGetToken(email, password) {
        this.setState({loading: true});

        return createSession({
            email: email,
            password: password
        }).then(response => {

            this.setState({loading: false});
            console.log(response)
            let result = response.data;
            StorageHelper.onSignIn(result.id_token);
            GLOBAL.token = result.id_token
            const {navigation} = this.props;
            navigation.dispatch({type: 'Login'})
        }).catch(error => {
            this.setState({loading: false});
            showError(error)
        });
    }

    register() {
        const {navigation} = this.props;
        navigation.dispatch({type: 'Register'})
    }

    skipLogin() {
        const {navigation} = this.props;
        navigation.dispatch({type: 'Login'})
    }

    handleLoginSubmit() {
        let valid = false;
        if (this.state.email && this.state.password) {
            valid = true;
        }
        if (valid) {
            let email = this.state.email;
            let password = this.state.password;
            this.tryGetToken(email, password);
        } else {
            this.updateForm('tmp', '');
        }
    }

    updateForm(field, value) {
        this.setState({[`${field}`]: value, submitted: true});
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="large"/>;
        }
        return (
            <Button
                onPress={this.handleLoginSubmit}
                title="LOG IN"
                textStyle={{
                    fontSize: 13,
                    fontWeight: "bold"
                }}
                buttonStyle={styles.signUpBtn}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formSection}>
                    <View style={styles.formSectionInner}>
                        <View>
                            <View style={styles.loginLinks}>
                                <Text>{'Do not have a wallet? '}</Text>
                                <TouchableOpacity onPress={this.register}>
                                    <Text style={styles.registerLink}>{'Create new wallet'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={this.skipLogin}>
                                    <Text style={styles.skipLink}>{'skip '}</Text>
                                </TouchableOpacity>
                            </View>

                            <InputGroup
                                keyboardType="email-address"
                                iconName="user-o"
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={value => this.updateForm("email", value)}
                                iconError={!this.state.email && this.state.submitted}
                            />
                            <Spacer/>
                            <InputGroup
                                secureTextEntry
                                iconName="lock"
                                placeholder="Password"
                                value={this.state.password}
                                onChangeText={value => this.updateForm("password", value)}
                                iconError={!this.state.password && this.state.submitted}
                            />
                            <View style={styles.loginBtn}>
                                {this.renderButton()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.parrot,
    },
    formSection: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    formSectionInner: {
        padding: 20,
        paddingTop: 10
    },
    signUpBtn: {
        marginTop: 15,
        height: 38,
        borderRadius: 30,
        backgroundColor: Colors.parrotBtn
    },
    registerLink: {
        fontWeight: "bold",
    },
    loginBtn: {
        paddingLeft: 35, paddingRight: 35
    },
    skipLink: {
        flex: 1,
        textAlign: 'right',
        alignSelf: 'stretch'
    },
    loginLinks: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 10,
    }
});

export default LoginScreen
