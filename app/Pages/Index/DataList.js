import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native' ;
import LinearGradient from 'react-native-linear-gradient';

export default class DataList extends Component {
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

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: px2dp(137),
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    justifyContent: 'space-between',
                    paddingHorizontal: px2dp(40),
                    borderBottomColor: '#EFEFF1',
                    backgroundColor: '#fff'
                }}>
                    <View>
                        <Text style={{fontWeight: '800', fontSize: px2dp(32)}}>总计应还
                            <Text style={{fontSize: px2dp(50), color: '#ED6D7B', paddingHorizontal: 5}}>1200.00</Text> 元</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.handle()} style={styles.toPayBtn}>
                        <LinearGradient start={{x: 0, y: 1}}
                                        end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
                                        style={styles.linearGradient}>
                            <Text
                                style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(24)}}
                            >
                                一键还款
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.itemView}>
                        <View>
                            <Text style={{
                                fontSize: px2dp(30),
                                fontWeight: '600',
                                marginBottom: px2dp(25)
                            }}>北京软件有限公司</Text>
                            <View style={{flexDirection: 'row', marginBottom: px2dp(25)}}>
                                <Text style={{
                                    color: '#EC6D7B', marginRight: 3, backgroundColor: '#FCE5E7',
                                    padding: px2dp(2), fontSize: px2dp(24)
                                }}>逾期</Text>
                                <Text style={{
                                    color: '#5BAAF6', marginRight: 3, backgroundColor: '#E7F3FE',
                                    padding: px2dp(2), fontSize: px2dp(24)
                                }}>代扣失败</Text>
                            </View>
                            <Text
                                style={{
                                    marginBottom: px2dp(25),
                                    fontSize: px2dp(30),
                                    color: '#ED6D7B'
                                }}>1200.00<Text style={{

                                fontSize: px2dp(20),
                                color: '#000'
                            }}>元</Text></Text>
                            <Text style={styles.dateSty}>2018-01-23</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.handle()} style={styles.toPayBtn}>
                            <Text style={styles.toPayText}>
                                去还款
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <View>
                            <Text style={{
                                fontSize: px2dp(30),
                                fontWeight: '600',
                                marginBottom: px2dp(25)
                            }}>北京软件有限公司</Text>
                            <View style={{flexDirection: 'row', marginBottom: px2dp(25)}}>

                                <Text style={{
                                    color: '#5BAAF6', marginRight: 3, backgroundColor: '#E7F3FE',
                                    padding: px2dp(2), fontSize: px2dp(24)
                                }}>到期</Text>
                            </View>
                            <Text
                                style={{
                                    marginBottom: px2dp(25),
                                    fontSize: px2dp(30),
                                    color: '#ED6D7B'
                                }}>1200.00<Text style={{

                                fontSize: px2dp(20),
                                color: '#000'
                            }}>元</Text></Text>
                            <Text style={styles.dateSty}>2018-01-23</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.handle()} style={styles.toPayBtn}>
                            <Text style={styles.toPayText}>
                                去还款
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <View style={{
                    zIndex: -1,
                    position: 'absolute',
                    bottom: px2dp(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SCREEN_WIDTH
                }}>
                    <Text style={{fontSize: px2dp(28), color: '#bbbbbb'}}>互融云快还,为您的信用护航</Text>
                </View>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        marginTop: px2dp(22)
    },
    linearGradient: {
        alignItems: 'center',
        borderRadius: 15,
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        width: px2dp(130),
        height: px2dp(50),
        justifyContent: 'center'
    },
    itemView: {
        flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EFEFF1',
        paddingVertical: px2dp(35), paddingHorizontal: px2dp(37),
        backgroundColor: '#fff', justifyContent: 'space-between',
        height: px2dp(260)
    },
    toPayBtn: {
        width: px2dp(130),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4f8ff1', borderRadius: 20, alignItems: 'center',
        backgroundColor: '#fff',
        //以下是阴影属性：
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        height: px2dp(50),
        justifyContent: 'center'
    },
    toPayText: {
        fontSize: px2dp(24),
        backgroundColor: 'transparent',
        color: '#4f8ff1',

    },
    dateSty: {
        fontSize: px2dp(24),
        color: '#ccc'
    }
})
