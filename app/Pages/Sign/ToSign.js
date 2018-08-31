import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' ;
import {NavigationBar, Input} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import Title from '../../Component/Title'

export default class ToSign extends Component {
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
                <Title name={'签约'} back/>
                <View style={{backgroundColor: '#fff'}}>
                    <View style={{height: px2dp(120), paddingLeft: px2dp(27)}}>
                        <View style={{
                            flexDirection: 'row', height: px2dp(120), alignItems: 'center',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: '#DDDDDD',
                            justifyContent: 'space-between'

                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: px2dp(28), color: '#666'}}>预留手机号</Text>
                                <Text
                                    style={{fontSize: px2dp(28), color: '#333', marginLeft: px2dp(35)}}>150****80</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginRight: px2dp(37)}}>
                                <View style={{
                                    height: px2dp(34),
                                    width: px2dp(1),
                                    backgroundColor: '#DDDDDD',
                                    marginRight: px2dp(36)
                                }}/>
                                <Text style={{fontSize: px2dp(28), color: '#0095ff'}}>120s重新获取</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height: px2dp(120), paddingLeft: px2dp(27)}}>
                        <View style={{
                            flexDirection: 'row', height: px2dp(120), alignItems: 'center',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: '#DDDDDD',
                            justifyContent: 'space-between'

                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: px2dp(28), color: '#666'}}>短信验证码</Text>
                                <Input
                                    placeholder={'请输入短信验证码'}
                                    placeholderTextColor={'#999999'}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                        borderColor: 'transparent',
                                        color: '#8a6d3b',
                                        textAlign: 'left'
                                    }}
                                    value={this.state.valueCustom}
                                    onChangeText={text => this.setState({valueCustom: text})}
                                />
                            </View>

                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{width: SCREEN_WIDTH, alignItems: 'center', marginTop: px2dp(78)}}>
                    <LinearGradient start={{x: 0, y: 1}}
                                    end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
                                    style={styles.linearGradientBtn}>
                        <Text
                            style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(30)}}
                        >
                            确认签约
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),

    },
    linearGradientBtn: {
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
