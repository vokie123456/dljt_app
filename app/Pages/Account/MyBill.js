import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView} from 'react-native' ;
import Title from '../../Component/Title'
import Icon from 'react-native-vector-icons/Ionicons';

export default class MyBill extends Component {
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
                <ImageBackground
                    source={Images.billBG}
                    style={{height: px2dp(410), width: SCREEN_WIDTH, position: 'absolute'}}
                />
                <Title name={'我的账单'} back transparent/>
                <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{color: '#d6e7ff', fontSize: px2dp(26)}}>全部未还(元)</Text>
                    <Text style={{color: '#fff', fontSize: px2dp(56), marginVertical: px2dp(30)}}>2460.00</Text>
                    <TouchableOpacity style={{
                        justifyContent: "center",
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: px2dp(162),
                        height: px2dp(50),
                        borderRadius: px2dp(23)
                    }}>
                        <Text style={{fontSize: px2dp(26), color: '#3399fe'}}>一键还款</Text>
                    </TouchableOpacity>
                </View>

                <View style={[{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    flex: 1,
                    top: px2dp(370),
                    paddingHorizontal: px2dp(30)
                }]}>
                    <View style={{
                        width: SCREEN_WIDTH - px2dp(60),
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: 'transparent',
                        borderRadius: px2dp(10),
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        //以下是阴影属性：
                        shadowOffset: {width: 3, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        shadowColor: '#000',
                        //注意：这一句是可以让安卓拥有灰色阴影
                        elevation: 4,
                        zIndex: iOS ? 1 : 0,
                        justifyContent: 'center',
                        marginBottom: px2dp(20),


                    }}>
                        <ScrollView style={{flex: 1, width: px2dp(693)}}>
                            <TouchableOpacity style={{

                                height: px2dp(120),
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{
                                        width: px2dp(66), height: px2dp(66),
                                        marginHorizontal: px2dp(30),
                                        borderRadius: px2dp(33),
                                        backgroundColor: '#EBF7FF',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{fontSize: px2dp(26), color: '#3399fe'}}>1月</Text>
                                    </View>
                                    <View style={{justifyContent: 'center'}}>
                                        <Text style={{fontSize: px2dp(30), color: '#333'}}>2340.00元</Text>
                                        <Text style={{
                                            fontSize: px2dp(24),
                                            color: '#666',
                                            marginTop: px2dp(10)
                                        }}>剩余120.00元待还</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        fontSize: px2dp(28),
                                        color: '#999999',
                                        marginRight: px2dp(20)
                                    }}>已结清</Text>
                                    <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}
                                          style={{marginRight: px2dp(44)}}/>

                                </View>

                            </TouchableOpacity>

                        </ScrollView>

                    </View>
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
})
