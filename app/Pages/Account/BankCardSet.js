import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native' ;
import {View, Text} from 'react-native-animatable';
import Title from '../../Component/Title';
import LinearGradient from 'react-native-linear-gradient'
import FinancialDetails from "./FinancialDetails";

export default class BankCardSet extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {
        duration: 1500,
        animation: 'fadeInRight'
    };


    // 自定义方法
    handle = () => {
        this.refs.touch.animate('fadeOut', 2000)
    }

    // 渲染
    render() {
        const {duration, animation} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={'银行卡设置'} rightText={'资金明细'} back onPress={() => Actions.FinancialDetails()}/>
                <ScrollView>

                    <View animation={animation}
                          duration={duration}
                          delay={0}>
                        <TouchableOpacity activeOpacity={.7} style={{
                            paddingVertical: px2dp(15),
                            paddingHorizontal: px2dp(30),
                            height: px2dp(240)
                        }}>
                            <LinearGradient start={{x: 0, y: 1}}
                                            end={{x: 1, y: 0}} colors={['#e8b64f', '#f18a4c',]}
                                            style={styles.linearGradient}>
                                <View style={{flex: 1, paddingHorizontal: px2dp(36)}}>
                                    <View
                                        style={{
                                            height: px2dp(115),
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{
                                                backgroundColor: 'rgba(255,255,255,.7)',
                                                height: px2dp(58),
                                                width: px2dp(58),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: px2dp(29)
                                            }}>
                                                <Image style={{width: px2dp(38), height: px2dp(38)}}
                                                       source={Images.Bank1}/>
                                            </View>
                                            <Text
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: '#fff',
                                                    fontSize: px2dp(34),
                                                    paddingLeft: px2dp(20)
                                                }}
                                            >广发银行</Text>
                                        </View>
                                        <Text
                                            style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                                        >
                                            储蓄卡
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <Text
                                            style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                                        >
                                            **** **** **** 2263
                                        </Text>
                                    </View>
                                </View>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View animation="fadeInRight"
                          duration={1500}
                          delay={500}>
                        <TouchableOpacity style={{
                            paddingVertical: px2dp(15),
                            paddingHorizontal: px2dp(30),
                            height: px2dp(240)
                        }}>
                            <LinearGradient start={{x: 0, y: 1}}
                                            end={{x: 1, y: 0}} colors={['#fa7d66', '#fe547d',]}
                                            style={styles.linearGradient}>
                                <Text
                                    style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                                >
                                    'Default Button Text'
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View animation="fadeInRight"
                          duration={1500}
                          delay={1000}>
                        <TouchableOpacity style={{
                            paddingVertical: px2dp(15),
                            paddingHorizontal: px2dp(30),
                            height: px2dp(240)
                        }}>
                            <LinearGradient start={{x: 0, y: 1}}
                                            end={{x: 1, y: 0}} colors={['#3b5ba3', '#3b5ba3',]}
                                            style={styles.linearGradient}>
                                <Text
                                    style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                                >
                                    'Default Button Text'
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View animation="fadeInRight"
                          duration={1500}
                          delay={1500}>
                        <TouchableOpacity style={{
                            paddingVertical: px2dp(15),
                            paddingHorizontal: px2dp(30),
                            height: px2dp(240)
                        }}>
                            <LinearGradient start={{x: 0, y: 1}}
                                            end={{x: 1, y: 0}} colors={['#02b7a5', '#1a86a4',]}
                                            style={styles.linearGradient}>
                                <Text
                                    style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                                >
                                    'Default Button Text'
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1
    },
    linearGradient: {
        borderRadius: px2dp(10),
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        height: px2dp(90),
        flex: 1
    },
})
