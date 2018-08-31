import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Alert} from 'react-native' ;
import Title from '../../Component/Title'
import Button from '../../Component/BigButton'
import {ActionPopover} from 'teaset';

export default class ManagementOfBankCard extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {
        hasCard: false
    };


    // 自定义方法
    handle = () => {
        this.refs.rootView.measureInWindow((x, y, width, height) => {
            let items = [
                {title: '看一下', onPress: () => Actions.BankCardSet()},
                {title: '不行?', onPress: () => alert('Remove')},
                {title: '好吧', onPress: () => alert('Share')},
            ];
            ActionPopover.show({x, y, width, height}, items);
        });
    }

    // 渲染
    render() {
        return (
            <View style={styles.defaultView}>
                <Title name={'银行卡设置'} back rightText={'管理'} onPress={
                    () => this.handle()
                }/>
                <View ref='rootView' style={{width: SCREEN_WIDTH, alignItems: 'center', marginTop: px2dp(174)}}>
                    <ImageBackground style={{width: px2dp(258), height: px2dp(174)}} source={Images.cardEmpty}/>
                    <Text style={{marginTop: px2dp(46), fontSize: px2dp(30), color: '#999'}}>还没绑定银行卡,请先添加银行卡</Text>
                    <Button name={'立即添加银行卡'} style={{marginTop: px2dp(120)}} onPress={() => Actions.AddBankCard()}/>
                </View>
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
        height: px2dp(130),
    },
})
