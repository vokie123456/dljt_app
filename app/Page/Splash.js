/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Animated,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import Loading from '../Component/Loading';
const splashImg = require('../Resources/images/banner/launch_screen.jpg');
const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

export default class Splash extends Component<> {
    constructor(props) {
        super(props);
        this.state = {
            // bounceValue: new Animated.Value(1),
            isLogin: ''
        };
    }
    componentDidMount() {
        // Animated.timing(this.state.bounceValue, {
        //     toValue: 1.2,
        //     duration: 1000
        // }).start();
        SplashScreen.hide();
        // this.timer = setTimeout(() => {
            storage.load({
                key: 'isLogin',
            }).then(ret => {
                console.log("index页登录信息Splash", ret);
                if(!ret){
                    Actions.Login();
                }else{
                    Actions.Index_key();
                }
            }).catch(err => {
                Actions.Login();
                console.warn(err.message);
            })
        // }, 1000);
    }
    componentWillUnmount() {
        // clearTimeout(this.timer);
    }
    render() {
        return(
            <View style={{backgroundColor: 'transparent'}}/>
            // {/*<Animated.Image*/}
            //     {/*style={{*/}
            //         {/*width: maxWidth,*/}
            //         {/*height: maxHeight,*/}
            //         {/*transform: [{ scale: this.state.bounceValue }]*/}
            //     {/*}}*/}
            //     {/*source={splashImg}*/}
            // {/*/>*/}
        )
    }
}
