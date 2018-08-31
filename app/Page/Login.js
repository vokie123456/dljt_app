/**
 * Created by Rabbit on 2017/11/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {NavigationBar, Toast} from 'teaset';
import {observer} from 'mobx-react/native';
import Button from '../Component/BigButton'
import {observable} from 'mobx';
// 加载loading
import Loading from '../Component/Loading'
import LoginInput from '../Page/others/LoginInput';
const LoginView = (props) => {
    return (
        <ScrollView style={styles.loginViewStyle}>
            <KeyboardAwareScrollView>
                <View style={{width: SCREEN_WIDTH, alignItems: 'center'}}>
                    <ImageBackground style={{width: px2dp(125), height: px2dp(125), marginVertical: px2dp(105)}}
                                     source={Images.userBg}/>
                </View>
                <LoginInput placeholder='请输入账号'
                            onChangeText={props.onChangeTopText}
                />
                <View style={{marginBottom: px2dp(100)}}>
                    <LoginInput placeholder='请输入密码'
                                secureTextEntry
                                onChangeText={props.onChangeBottomText}
                    />
                    <View style={{
                        backgroundColor: Theme.transparentColor,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',

                    }}>
                    </View>
                </View>
                <Button name={'登录'} onPress={props.onPress} />
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

@observer
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileCode: '',
            verifyCode: '',
            disAble: false,
            visible: false
        };
    }
    @observable mobileCode = '';
    @observable verifyCode = '';

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={
                    <Text style={{fontSize: px2dp(34)}}>登录</Text>
                }
                               style={{height: px2dp(130), backgroundColor: 'white'}}
                               statusBarStyle='default'
                               rightView={
                                   <TouchableOpacity style={{marginRight: px2dp(36)}}>
                                       <Text style={{color: '#fff', fontSize: px2dp(28)}}>找回密码</Text>
                                   </TouchableOpacity>
                               }
                />
                <LoginView onPress={() => this.onLoginPress()}
                           onChangeTopText={(text) =>
                               this.setState({
                                   mobileCode: text
                               })
                           }
                           onChangeBottomText={(text) =>
                               this.setState({
                                   verifyCode: text
                               })
                           }
                />
                <Loading visible={this.state.visible}/>
            </View>
        );
    }
    onLoginPress = () => {
        let url='';
        const {mobileCode, verifyCode} = this.state;
        console.log("adads",this.state);
        let formData = new FormData();
        formData.append("username", mobileCode);
        formData.append("smcode", verifyCode);
        if (!Config.isTest){
            url = Config.baseApi + Config.loginApi.loginUrl+'?isMobile=1&username=admin&password=eXVzZWVuX2hyeTIwMDkxMD' +
                'AxODg=';
            this._loginCommit(url);
        }else{
            // base64加密开始

            if (!isEmpty(this.state.mobileCode) && !isEmpty(this.state.verifyCode)){
                url = Config.baseApi + Config.loginApi.loginUrl+'?isMobile=1&username='+this.state.mobileCode+'&password='+ encode64(this.state.verifyCode);
                this._loginCommit(url);
            }else if (isEmpty(this.state.mobileCode)){
                Toast.message('请输入账号')
                return;
            }else if(isEmpty(this.state.verifyCode)){
                Toast.message('请输入密码')
                return;
            }

        }

    }
    _loginCommit(url){
        this.setState({
            visible: true,
            disAble: true
        });
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                this.setState({
                    disAble: false,
                    visible: false
                });
                console.log('login', responseText);
                responseText.success ? this._toMain(responseText) : Toast.message(responseText.msg);
            }
        })
    }


    _toMain = (responseText) => {
        console.log("用户登录信息",responseText);
        storage.save({
            key: 'curUserInfo',
            data: {
                tokenStr: responseText
            }
        });
        // AsyncStorage.setItem('curUserInfo',responseText+"");
        storage.save({
            key: 'isLogin',
            data: true
        });
        Toast.success("登录成功");
        this.setState({
            disAble: false
        })
        Actions.root();
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    loginViewStyle: {
        marginTop: px2dp(120),
        flex: 1,

    },
    loginButtonStyle: {
        marginLeft: px2dp(108),
        marginRight: px2dp(108),
        height: px2dp(80),
        marginTop: px2dp(142),
        backgroundColor: '#ff7000',
        borderColor: Theme.transparentColor,
        borderRadius: 20

    },
    createAccountStyle: {
        color: Theme.primaryColor,
        fontSize: FONT_SIZE(13),

    },
    forgetPassStyle: {
        marginTop: px2dp(28),
        height: px2dp(32),
        marginRight: px2dp(108),
        color: '#ff7000',
        fontSize: FONT_SIZE(12),
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
    lineSty: {
        width: px2dp(192),
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc'
    }
});