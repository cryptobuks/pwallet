import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    ListView,
    View,
    ToastAndroid,
    Button
} from "react-native";
import {connect} from 'react-redux';

import {InputGroup, Spacer, Spinner} from "../components";
import {getUsers, createTransaction} from "../network/api";
import {fetchProfile} from "../actions/user-info";
import {showError} from "../utils/errorHandler";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SendScreen extends Component {


    constructor(props) {
        super(props);

        this.requestTimeoutHandler = null
        this.state = {
            searchedAdresses: [],
            recipient: '',
            submitted: false,
            amount: ''
        };

        this.updateAmount = this.updateAmount.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    updateAmount(field, value) {
        value = value.replace(/[a-zA-Z]/g, '');
        this.setState({[`${field}`]: value, submitted: true});
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        this.props.fetchProfile();
    };
    selectUser = (name) => {
        Keyboard.dismiss();
        this.setState({searchedAdresses: [], recipient: name});
    }

    searchUsers = (searchedText) => {

        if (this.requestTimeoutHandler) {
            clearTimeout(this.requestTimeoutHandler);
        }

        if (!searchedText) {
            this.setState({recipient: '', submitted: false});
            return;
        }
        this.setState({recipient: searchedText, submitted: true});
        this.requestTimeoutHandler = setTimeout(() => {
            getUsers({filter: searchedText}).then((res) => {
                const result = res.data;
                const users = Array.from(result)
                let found = []
                if (users.length) {
                    found = users.filter(function (user) {
                        return user.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
                    });
                }
                this.setState({searchedAdresses: found, recipient: searchedText});

            }).catch((err) => {
                this.setState({searchedAdresses: [], recipient: searchedText});
            })
        }, 100);

    };


    handleSubmit() {
        let name = this.state.recipient;
        let amount = this.state.amount;
        this.setState({submitted: true});

        let valid = false;
        if (name && amount) {
            valid = true;
        }

        if (valid) {
            this.setState({loading: true});

            return createTransaction({
                name: name,
                amount: amount
            }).then(response => {

                this.setState({loading: false});

                ToastAndroid.showWithGravityAndOffset(
                    'Success',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                this.fetchProfile();
            }).catch(error => {
                this.setState({loading: false});
                showError(error)
            });
        }
    }

    renderAdress = (user) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.selectUser(user.name)}>
                <View style={styles.searchItem}>
                    <Text>{user.name}, ({user.id})</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    renderButton = () => {
        if (this.state.loading) {
            return <Spinner size="large"/>;
        }
        return (
            <Button onPress={this.handleSubmit} title="Send" />
        );
    };

    render() {
        const {userInfo} = this.props
        let balance = 0

        if (userInfo.data) {
            balance = userInfo.data.user_info_token.balance
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.headerText}>Your balance:</Text>
                    <Text style={styles.balance}>{balance ? balance : 0}</Text>
                </View>
                <InputGroup
                    iconName="user-o"
                    placeholder="Type user name here"
                    value={this.state.recipient}
                    onChangeText={this.searchUsers}
                    iconError={!this.state.recipient && this.state.submitted}
                />
                <ListView
                    dataSource={ds.cloneWithRows(this.state.searchedAdresses)}
                    renderRow={this.renderAdress}
                    enableEmptySections={true}
                    keyboardShouldPersistTaps={'always'}/>
                <Spacer/>

                <InputGroup
                    keyboardType={"numeric"}
                    iconName="money"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChangeText={value => this.updateAmount("amount", value)}
                    iconError={!this.state.amount && this.state.submitted}
                />
                <Spacer/>
                {this.renderButton()}
            </View>
        );
    }
    ;
}

const
    styles = StyleSheet.create({
        container: {
            backgroundColor: '#FFFFFF',
            padding: 10
        },
        headerText: {
            textAlign: 'center',

        },
        balance: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 10,
            fontSize: 20,
        },
        searchItem: {
            margin: 10,
        }
    });

const
    mapStateToProps = (state) => {
        const {userInfo} = state.userInfo;
        return {
            userInfo
        }
    }

const
    mapDispatchToProps = dispatch => ({
        fetchProfile: () => dispatch(fetchProfile()),
    })
export default connect(mapStateToProps, mapDispatchToProps)(SendScreen)
