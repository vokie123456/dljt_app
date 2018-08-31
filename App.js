/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    NativeModules,
    AppUtils,
    Platform,
    DeviceEventEmitter,
} from 'react-native';
import Router from './app/Router';
import SplashScreen from 'react-native-splash-screen';
import {Overlay, Button,} from 'teaset';

// let DeviceInfo = require('react-native-device-info');
// import {upgrade, openAPPStore, addDownListener} from 'react-native-app-upgrade'
export default class App extends Component<> {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            title: '更新',
            apkUrl: 'https://past.jinzhitou.com/attachFiles/apk/p2p_wallet.apk',
            titleProgress: '下载',
            versionCode: '2.0.1',
            stateType: false,
            buttonState: false,
            downConten: '版本更新,s,版本更新，版本更新，版本更新，版本更新版本更新，版本更新，版本更新，版本更新版本更新版本更新版本更新，版本更新，版本更新，版本更新',
        };
    }


    componentDidMount() {
        SplashScreen.hide();
        // if (Platform.OS === 'android') {
        //     //android平台
        //     if (this.state.versionCode > DeviceInfo.getReadableVersion()) {
        //         // 版本更新
        //         this._dialogBox();
        //     }
        // } else {
        //     //ios平台
        //
        // }
    }

    _update() {
        //下载最新Apk

        console.log('_update')
        // NativeModules.upgrade.upgrade(this.state.apkUrl);
        // upgrade(this.state.apkUrl)

    }

    _cancel() {
        //更新弹窗取消
        this.overlayPopView && this.overlayPopView.close();
        console.log('Cancel Pressed')
    }

    componentWillMount() {
        // DeviceEventEmitter.addListener('LOAD_PROGRESS', (msg) => {
        //     this.state = {
        //         titleProgress: '(' + msg + '%)',
        //     };
        //     if (msg == 100) {
        //         this.overlayPopView && this.overlayPopView.close();
        //     }
        //     console.log("props----------", this.state.titleProgress + '---' + msg);
        // });

        // if (Platform.OS === 'android') {
        //     //android平台
        //     addDownListener(progress => console.log('进度', progress + '%'))
        // } else {
        //     //ios平台
        // }

        // }

    }


    _dialogBox() {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center', height: SCREEN_HEIGHT / 4}}
                type={'zoomOut'}
                modal={true}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: SCREEN_WIDTH / 5 * 4 - px2dp(50),
                    minHeight: SCREEN_HEIGHT / 2 * 1 - px2dp(50),
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flexDirection: 'row', position: 'absolute', top: SCREEN_WIDTH / 9 * 1}}>
                        <Text style={{fontSize: px2dp(34), color: '#393939'}}>{this.state.title}</Text>
                    </View>
                    <Text style={{width: SCREEN_WIDTH / 1.5,}}>{this.state.downConten}</Text>
                    {this.state.stateType ?
                        <View style={{flexDirection: 'row', position: 'absolute', bottom: SCREEN_WIDTH / 13 * 1}}>
                            <Button style={{width: SCREEN_WIDTH / 4 * 1, backgroundColor: '#43a5e7'}}
                                    titleStyle={{color: '#fff'}} title='  下载  ' onPress={() => this._update()}/>

                        </View> :
                        <View style={{flexDirection: 'row', position: 'absolute', bottom: SCREEN_WIDTH / 13 * 1}}>
                            <Button style={{width: SCREEN_WIDTH / 4 * 1, backgroundColor: '#43a5e7'}}
                                    titleStyle={{color: '#fff'}} title='  取消  ' onPress={() => this._cancel()}/>
                            <View style={{width: px2dp(60)}}/>
                            <Button style={{width: SCREEN_WIDTH / 4 * 1, backgroundColor: '#43a5e7'}}
                                    titleStyle={{color: '#fff'}} title={this.state.titleProgress}
                                    onPress={() => this._update()}/>

                        </View>}
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    render() {
        return <Router />
    }
}
