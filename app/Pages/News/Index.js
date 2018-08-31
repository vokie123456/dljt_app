import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' ;
import {NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import Title from '../../Component/Title'

export default class Index extends Component {
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
                <Title name={'消息'}/>
                <TouchableOpacity
                    onPress={() => Actions.NewsDetail()}
                    style={{
                        width: SCREEN_WIDTH,
                        height: px2dp(150),
                        backgroundColor: '#fff',
                        paddingLeft: px2dp(30)
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#F5F5F5'
                    }}>
                        <View style={{
                            width: px2dp(66), height: px2dp(150), alignItems: 'center', justifyContent: 'center',

                        }}>
                            <View style={{
                                width: px2dp(66),
                                height: px2dp(66),
                                borderRadius: px2dp(33),
                                backgroundColor: '#EBF7FF',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon name={'ios-text-outline'} color={'#009EFF'}
                                      size={px2dp(50)} style={{backgroundColor: 'transparent'}}/>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', flex: 1, marginLeft: px2dp(20)}}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{fontSize: px2dp(30), color: '#333'}}>通知消息</Text>
                                <Text style={{
                                    fontSize: px2dp(24),
                                    color: '#999',
                                    marginRight: px2dp(43)
                                }}>2017.10.11</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: px2dp(26),
                                    color: '#999',
                                    marginTop: px2dp(10)
                                }}>您在互融云建档,请及时激活</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: SCREEN_WIDTH,
                    height: px2dp(150),
                    backgroundColor: '#fff',
                    paddingLeft: px2dp(30)
                }}>
                    <View style={{
                        flexDirection: 'row', flex: 1, borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#F5F5F5'
                    }}>
                        <View style={{
                            width: px2dp(66), height: px2dp(150), alignItems: 'center', justifyContent: 'center',

                        }}>
                            <View style={{
                                width: px2dp(66),
                                height: px2dp(66),
                                borderRadius: px2dp(33),
                                backgroundColor: '#EBF7FF',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon name={'ios-text-outline'} color={'#009EFF'}
                                      size={px2dp(50)} style={{backgroundColor: 'transparent'}}/>
                            </View>
                        </View>
                        <View style={{justifyContent: 'center', flex: 1, marginLeft: px2dp(20)}}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{fontSize: px2dp(30), color: '#333'}}>通知消息</Text>
                                <Text style={{
                                    fontSize: px2dp(24),
                                    color: '#999',
                                    marginRight: px2dp(43)
                                }}>2017.10.11</Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: px2dp(26),
                                    color: '#999',
                                    marginTop: px2dp(10)
                                }}>您在互融云建档,请及时激活</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),
    },
})
