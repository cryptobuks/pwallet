import React, {Component} from 'react';
import {
    ToastAndroid
} from 'react-native';
import Transactions from '../components/Transactions';
import {getTransactions} from "../network/api";
import {showError} from "../utils/errorHandler";


class TransactionsScreen extends Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            submitted: false,
            refreshing: false
        };
    }

    componentDidMount() {
        this._bootstrapAsync();

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

    _bootstrapAsync = () => {
        this.setState({loading: true});

        return getTransactions().then(response => {

            this.setState({loading: false});

            let result = response.data;
            if (result.trans_token) {
                this.setState({transactions: result.trans_token});
            }

        }).catch(error => {
            this.setState({loading: false});
            showError(error)
        });
    }

    handleTitlePress = () => {

    }
    handleRefresh = () => {
        this._bootstrapAsync();
    }

    render() {
        return (
            <Transactions
                data={this.state.transactions}
                refreshing={this.state.refreshing}
                handleRefresh={this.handleRefresh}
                handleTitlePress={this.handleTitlePress}
            />
        );
    }

}

TransactionsScreen.navigationOptions = {
    title: 'Transactions',
};

export default TransactionsScreen;
