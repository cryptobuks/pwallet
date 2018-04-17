import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import {Button} from "react-native-elements";

import {InputGroup, Spacer} from "../components";
import {StorageHelper} from "../helpers/StorageHelper";

import GLOBAL from '../helpers/globals';


class DevToolsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api: GLOBAL.API_URI,
            loading: false,
            validApi: true
        };

        this.updateForm = this.updateForm.bind(this);
        this.clearStorage = this.clearStorage.bind(this);
        this.saveApiUrl = this.saveApiUrl.bind(this);
    }


    _gotoLogin() {
        const {navigation} = this.props;
        navigation.dispatch({type: 'Logout'})
    }

    clearStorage() {
        StorageHelper.clear();
    }

    saveApiUrl() {
        if (this.validateApi()) {
            GLOBAL.API_URI = this.state.api;
            StorageHelper.saveApiUrl(this.state.api);
            this._gotoLogin()
        } else {
            this.setState({validApi: false});
        }
    }

    updateForm(field, value) {
        this.setState({[`${field}`]: value});
    }

    validateApi = () => {
        let api = this.state.api;
        let re = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
        return api && re.test(api);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formSection}>
                    <View style={styles.formSectionInner}>
                        <View>
                            <View style={styles.btnView}>
                                <Button
                                    onPress={this.clearStorage}
                                    title="Clear Storage"
                                    buttonStyle={styles.signUpBtn}
                                    textStyle={{
                                        fontSize: 13,
                                        fontWeight: "bold"
                                    }}
                                />
                            </View>
                            <Spacer/>
                            <Text style={styles.labelText}>{' Api BASE URL (format: http://IP:PORT):'}</Text>
                            <InputGroup
                                iconName=""
                                value={this.state.api}
                                placeholder="Api url"
                                onChangeText={value => this.updateForm("api", value)}
                                iconError={!this.state.validApi}
                            />
                            <View style={styles.btnView}>
                                <Button
                                    onPress={this.saveApiUrl}
                                    title="Set Api url and restart App"
                                    textStyle={{
                                        fontSize: 13,
                                        fontWeight: "bold"
                                    }}
                                    buttonStyle={styles.signUpBtn}
                                />
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnView: {
        paddingLeft: 35,
        paddingRight: 35
    },
    labelText: {
        color: '#000',
        marginBottom: 10
    },
    container: {
        flex: 1,
        height: '100%',
    },
    formSection: {
        flex: 1,
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
    }
});

export default DevToolsScreen;
