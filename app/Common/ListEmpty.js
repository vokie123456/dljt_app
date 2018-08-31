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

export default class ListEmpty  extends Component {
    render() {
        return (
            <View style={styles.loadingMore}>
                <Text style={styles.loadingText}>暂无数据</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingMore: {
        flex:1,
        width:width,
        height:height/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: px2dp(22),
        color: '#cfcfcf'
    }
});