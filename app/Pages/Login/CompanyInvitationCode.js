import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image} from 'react-native' ;
import LinearGradient from 'react-native-linear-gradient';
import LoginInput from './Component/LoginInput';
import Title from "../../Component/Title";
import Button from '../../Component/BigButton'

export default class CompanyInvitationCode extends Component {
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
                    source={Images.companyTitleBG}
                    style={{height: px2dp(422), width: SCREEN_WIDTH, position: 'absolute', top: px2dp(-129)}}
                />
                <Title name={'机构邀请码'} back transparent/>

                <View style={{
                    position: 'absolute', top: px2dp(181), width: SCREEN_WIDTH, height: px2dp(190),
                    alignItems: 'center'
                }}>
                    <View style={{

                        width: px2dp(180),
                        height: px2dp(180),

                        borderRadius: px2dp(90),
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowOffset: {width: 5, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        shadowColor: '#2CA4F3',
                        //注意：这一句是可以让安卓拥有灰色阴影
                        elevation: 10,
                        zIndex: iOS ? 1 : 0,
                        borderWidth: px2dp(8),
                        borderColor: 'rgba(44,164,243,.5)',
                        backgroundColor: '#fff'
                    }}>
                        <Image
                            style={{
                                width: px2dp(120),
                                height: px2dp(70),
                                resizeMode: Image.resizeMode.stretch
                            }}
                            source={require('../../Resources/images/logo.png')}
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute', width: SCREEN_WIDTH, alignItems: 'center',
                    top: px2dp(400)
                }}>
                    <Text style={{fontSize: px2dp(36), color: '#333333'}}>北京互融时代软件有限公司</Text>
                </View>
                <View style={{
                    position: 'absolute', width: SCREEN_WIDTH, alignItems: 'center',
                    top: px2dp(594)
                }}>
                    <LoginInput placeholder='请输入机构邀请码'

                    />
                </View>
                <Button onPress={() => Actions.root()} style={{marginTop: px2dp(770)}} name={'进入'}/>
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1
    },
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
