import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' ;

export default class RefundDetails extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {};


    // 自定义方法
    handle = () => {

    }

    // 渲染
    render() {
        return (
            <View style={styles.defaultView}>
                <View>
                    <View>

                    </View>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1
    }
})
