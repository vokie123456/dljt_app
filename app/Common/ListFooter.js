/**
 * Created by 11974 on 2017/8/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const {width, height}=Dimensions.get('window');

export default class ListFooter  extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            hasMore: false
        };
    }
    render() {
        if (this.state.hasMore) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}> ~~没有更多数据了~~</Text>
                </View> )
        }else{
            return (<View/>)
        }
    }
}

const styles = StyleSheet.create({
    loadingMore: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: px2dp(20),
        width: width,
        height:px2dp(50)
    },
    loadingText: {
        fontSize: px2dp(20),
        color: '#cfcfcf'
    }
});