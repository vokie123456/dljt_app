import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native' ;
import Title from '../../Component/Title'

export default class FinancialDetails extends Component {
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
                <Title back name={'资金明细'}/>
                <ScrollView>
                    <View
                        style={styles.itemSty}>
                        <View style={styles.itemTop}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                                <Text style={{fontSize: px2dp(32), color: '#333'}}>放款</Text>
                                <Text style={{fontSize: px2dp(32), color: '#ec616f'}}>+300</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: px2dp(24), color: '#666'}}>2017-10-09 12:52</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={styles.itemSty}>
                        <View style={styles.itemTop}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                                <Text style={{fontSize: px2dp(32), color: '#333'}}>放款</Text>
                                <Text style={{fontSize: px2dp(32), color: '#ec616f'}}>+300</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: px2dp(24), color: '#666'}}>2017-10-09 12:52</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    itemSty: {
        backgroundColor: '#fff',
        height: px2dp(140),
        paddingLeft: px2dp(32),
        width: SCREEN_WIDTH
    },
    itemTop: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EBEBEB',
        paddingRight: px2dp(32),
        justifyContent: 'center'
    }
})
