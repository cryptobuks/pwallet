import React, {Component} from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    ToastAndroid,
    ScrollView
} from "react-native";

import {Button} from "react-native-elements";

import {InputGroup, Spacer, Spinner} from "../components";
import Colors from "../components/Colors";
import {StorageHelper} from "../helpers/StorageHelper";
import {createUser} from "../network/api";
import GLOBAL from '../helpers/globals';
import {showError} from "../utils/errorHandler";

class RegisterScreen extends Component {
    static navigationOptions = {
        title: "Create new Parrot wallet",
        headerTintColor: Colors.white,
        headerStyle: {
            backgroundColor: Colors.headerColor,
            borderBottomWidth: 0
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            passwordConfirm: null,
            loading: false,
            submitted: false
        };

        this.updateForm = this.updateForm.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

        StorageHelper.getStoredApiUrl().then((uri) => {
            if (uri) GLOBAL.API_URI = uri;
        }).catch((err) => {
        });
    }


    tryGetToken(username, password, email) {
        this.setState({loading: true});

        return createUser({
            username: username,
            password: password,
            email: email
        }).then(response => {

            this.setState({loading: false});

            let result = response.data;
            StorageHelper.onSignIn(result.id_token);

            const {navigation} = this.props;
            navigation.dispatch({type: 'Login'})
        }).catch(error => {
            this.setState({loading: false});
            showError(error)
        });
    }

    loginUser(username, password, email) {

        let valid = false;
        if (this.state.username && this.state.password &&
            this.state.email && this.state.passwordConfirm) {
            valid = true;
        }

        if (this.state.password !== this.state.passwordConfirm) {
            ToastAndroid.showWithGravityAndOffset(
                'Passwords do not match!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            valid = false;
        }

        if (valid) {
            this.tryGetToken(username, password, email);
        } else {
            this.updateForm('tmp', '');
        }
    }

    handleLoginSubmit() {
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;

        this.loginUser(username, password, email);
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
                title="Sign Up"
                textStyle={{
                    fontSize: 12,
                    fontWeight: "bold"
                }}
                buttonStyle={styles.signUpBtn}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={[styles.scrollView, {width: '100%', height: '100%'}]}>

                    <StatusBar barStyle="light-content"/>
                    <View style={styles.formSection}>
                        <View style={styles.formSectionInner}>
                            <View>
                                <InputGroup
                                    iconName="user-o"
                                    placeholder="Username"
                                    onChangeText={value => this.updateForm("username", value)}
                                    iconError={!this.state.username && this.state.submitted}
                                />
                                <Spacer/>
                                <InputGroup
                                    iconName="envelope"
                                    keyboardType="email-address"
                                    placeholder="Email"
                                    onChangeText={value => this.updateForm("email", value)}
                                    iconError={!this.state.email && this.state.submitted}
                                />
                                <Spacer/>
                                <InputGroup
                                    secureTextEntry
                                    iconName="lock"
                                    placeholder="Password"
                                    onChangeText={value => this.updateForm("password", value)}
                                    iconError={!this.state.password && this.state.submitted}
                                />
                                <Spacer/>
                                <InputGroup
                                    secureTextEntry
                                    iconName="lock"
                                    placeholder="Password Confirm"
                                    onChangeText={value => this.updateForm("passwordConfirm", value)}
                                    iconError={!this.state.passwordConfirm && this.state.submitted}
                                />
                                <View style={styles.loginBtn}>
                                    {this.renderButton()}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.parrot
    },
    formSection: {
        flex: 2,
        padding: 10
    },
    formSectionInner: {
        padding: 20
    },
    signUpBtn: {
        marginTop: 15,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#02b875"
    },
    loginBtn: {
        paddingLeft: 35, paddingRight: 35
    }
});

export default RegisterScreen;
