import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native' ;
import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable';

export default class DataListDeatil extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {};


    // 自定义方法
    handle = () => {

    }
    initData = () => {
        let a = []
        for (let i = 0; i < 20; i++) {
            a.push(
                <View style={styles.itemSty} key={i}>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <View style={styles.itemLeftSty}>
                            <Text style={{color: '#FD7184',fontSize:px2dp(22)}}>逾期</Text>
                        </View>
                        <View>
                            <Text
                                style={styles.textSty}>1200.00<Text style={{
                                fontSize: px2dp(20),
                                color: '#666666'
                            }}> 元</Text></Text>
                            <Text style={{fontSize:px2dp(20),color:'#666',}}>2018-01-21</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.handle()} style={styles.toPayBtn}>
                        <Text style={styles.toPayText}>
                            立即还款
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return a;
    }

    // 渲染
    render() {
        return (
            <View style={styles.defaultView}>
                <ScrollView style={styles.defaultView}>
                    {this.initData()}
                </ScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    alignItems: 'center'
                }}>
                    <View style={{marginLeft: px2dp(25)}}>
                        <Text>合计: <Text style={{color: '#ec616f', fontSize: px2dp(42)}}>1200.00</Text> 元</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.handle()} style={styles.payBtnSty}>
                        <LinearGradient start={{x: 0, y: 1}}
                                        end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
                                        style={styles.linearGradient}>
                            <Text
                                style={{backgroundColor: 'transparent', color: '#fff',   fontSize: px2dp(32)}}
                            >
                                立即还款
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1
    },
    toPayBtn: {
        width: px2dp(130), borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#5384dc', borderRadius: 20, alignItems: 'center',
        backgroundColor: '#fff',

        //以下是阴影属性：
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        height: px2dp(50)
    },
    toPayText: {
        fontSize: px2dp(25),
        backgroundColor: 'transparent',
        color: '#5384dc',
        padding: 5
    },
    itemSty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: px2dp(26),
        alignItems: 'center',
        paddingVertical: px2dp(40),
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff',
        height:px2dp(136)
    },
    itemLeftSty: {
        backgroundColor: '#FFE4E8',
        borderColor: 'red',
        borderWidth: StyleSheet.hairlineWidth,
        height: px2dp(60),
        width: px2dp(60),
        borderRadius: px2dp(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: px2dp(25)
    },
    textSty: {
        marginBottom: px2dp(26),
        fontWeight: '600',
        fontSize: px2dp(30),
    },
    payBtnSty: {
        height: px2dp(88),
        width: px2dp(186)

    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
