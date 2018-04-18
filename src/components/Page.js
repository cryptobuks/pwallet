import React, {Component} from "react";
import {ScrollView, View } from "react-native";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cachedHeight: '100%',
            containerHeight: null,
        }
    }

    render() {
        return (
            <View onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;

                if (this.state.cachedHeight !== height) {
                    this.setState({
                        cachedHeight: height
                    })
                }
                else {
                    this.setState({
                        containerHeight: height
                    })
                }
            }}
                  style={{paddingBottom: this.props.tabsHeight, width: '100%',height: this.state.containerHeight || '100%'}}
            >
                <ScrollView style={{width: '100%',height: this.state.containerHeight || '100%'}}>
                    {this.props.children}
                </ScrollView>
            </View>
        )
    }
}

export {Page}