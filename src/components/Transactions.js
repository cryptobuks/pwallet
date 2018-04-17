import React, {Component} from 'react';
import {
    Text,
    FlatList,
    RefreshControl,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftActionActivated: false,
            toggle: false
        };
    }

    handleTitlePress = (story, pageY) => {
        const {navigation, route} = this.props;
        navigation.navigate(route, {story, pageY});
    };

    _keyExtractor = item => {
        return item.id ? item.id.toString() : item
    };

    handleLeftActionComplete = item => {
        this.setState({toggle: !this.state.toggle});
        this.props.handleLeftActionComplete(item);
    };

    onTitlePress = (event, item) => {
        const {pageY} = event.nativeEvent;
        this.props.handleTitlePress(item, pageY);
    };
    _renderItem = ({item}) => {
        const {
            container,
            textContainer,
            amountText,
            author,
            timeAgo,
        } = styles;
        return (
            <View style={container}>
                <View
                    style={[
                        {
                            backgroundColor: 'transparent'
                        }
                    ]}
                />
                <View style={container}>
                    <View style={textContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={event => this.onTitlePress(event, item)}
                        >
                        </TouchableOpacity>
                        <Text style={author}>
                            To: {item.username}
                        </Text>
                        <Text style={timeAgo}>
                            {item.date}
                        </Text>
                    </View>
                    <Text style={amountText}>
                        {item.amount && item.amount.toString().indexOf('-') !== -1 ? "" : "+"} {item.amount}
                    </Text>
                </View>
            </View>
        );
    };

    _renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                }}
            />
        );
    };

    _renderFooter = () => {
        //if (!this.props.isLoading) return null;

        return (
            <View style={{paddingVertical: 50}}/>
        );
    };

    handleOnEndReached = () => {

    };

    handleOnRefresh = () => {
        this.props.handleRefresh()
    };

    render() {
        const {saveStoryText} = styles;
        const {data, refreshing} = this.props;
        return (
            <View>
                <StatusBar barStyle="light-content"/>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={data}
                    renderItem={this._renderItem}
                    initialNumToRender={20}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this.handleOnEndReached}
                    onEndReachedThreshold={1}
                    removeClippedSubviews={false}
                    indicatorStyle={'white'}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.handleOnRefresh}
                            tintColor={saveStoryText.color}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    saveStoryText: {
        fontWeight: '500',
        color: '#c4dff6',
        fontSize: 22,
        marginRight: 20
    },
    amountText: {
        color: '#61afef',
        fontSize: 20,
        textAlign: 'right',
        marginEnd: 10
    },
    author: {
        color: '#e5c07b',
        fontSize: 15,
        paddingTop: 5
    },
    timeAgo: {
        color: '#ABB2BF',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 5,
    },
});

export default Transactions;
