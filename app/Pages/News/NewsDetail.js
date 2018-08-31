import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' ;
import {NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Title from '../../Component/Title'

export default class NewsDetail extends Component {
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
                <Title name={'消息详情'} back/>
                <View style={{height: px2dp(86), paddingLeft: px2dp(30)}}>
                    <View style={{
                        borderBottomColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth,
                        flexDirection: 'row', alignItems: 'center'
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
                                {/*<Icon name={'ios-text-outline'} color={'#009EFF'}*/}
                                      {/*size={px2dp(50)} style={{backgroundColor: 'transparent'}}/>*/}
                            </View>
                        </View>
                        <View style={{marginLeft: px2dp(20)}}>
                            <Text style={{fontSize: px2dp(30), color: '#333'}}>还款提醒</Text>
                            <Text style={{fontSize: px2dp(24), color: '#999', marginTop: px2dp(10)}}>2017.10.11
                                12:12:12</Text>
                        </View>

                    </View>
                    <View style={{marginHorizontal: px2dp(20)}}>
                        <Text style={{
                            fontSize: px2dp(28),
                            color: '#666',
                            marginTop: px2dp(10),
                            lineHeight: px2dp(40)
                        }}>您在互融云机构有笔账单101.12元于01-02号到期，请及时还款以免影响您的信用！</Text>
                    </View>
                </View>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),
    },
})
