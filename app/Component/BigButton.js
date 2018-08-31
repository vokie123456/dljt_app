/**
 * Created by Rabbit 下午6:40
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BigButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={props.onPress ? props.onPress : ()=>Alert.alert('没有写点击事件哦~', null)}
                          style={{
                              height: px2dp(120),
                              justifyContent: 'center', width: SCREEN_WIDTH, alignItems: 'center',
                              ...props.style
                          }}>
            <LinearGradient start={{x: 0, y: 1}}
                            end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
                            style={styles.linearGradient}>
                <Text
                    style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                >
                    {props.name ? props.name : 'Default Button Text'}
                </Text>
            </LinearGradient>
        </TouchableOpacity>

    )
};

let styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        borderRadius: px2dp(45),
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        width: px2dp(580),
        height: px2dp(90),
        justifyContent: 'center'
    },
})
export default BigButton;