import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native' ;
import Title from '../../Component/Title';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'

const SECTIONS = [
    {
        title: '关于登录使用',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于金融邀请码',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于切换金融公司',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于还款日历功能',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于还款功能',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于支持银行',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '关于一键还款功能',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
    {
        title: '联系我们',
        content: '1.如何登录?需要验证手机身份,才可以登录使用快还APP,不验证手机身份的快还APP不提供还款服务'
    },
];
export default class AboutUs extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {};


    // 自定义方法
    handle = () => {

    }


    _renderHeader = (section, index, isActive, sections) => {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{
                    backgroundColor: (isActive ? 'rgb(255,255,255)' : 'rgb(255,255,255)'),
                    paddingLeft: px2dp(30),
                    width: SCREEN_WIDTH,
                    height: px2dp(100)
                }}>
                <View style={{
                    paddingRight: px2dp(30), flex: 1,
                    borderBottomWidth: (isActive ? 0 : StyleSheet.hairlineWidth),
                    borderBottomColor: '#ddd',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <Image source={Images.Question}
                               style={{width: px2dp(35), height: px2dp(35), marginRight: px2dp(12)}}/>
                        <Animatable.Text style={styles.headerText}>{section.title}</Animatable.Text>
                    </View>
                    {
                        isActive ? <Icon color={'#333'} size={px2dp(50)} name={'ios-arrow-up-outline'}/> :
                            <Icon color={'#333'} size={px2dp(50)} name={'ios-arrow-down-outline'}/>
                    }
                </View>

            </Animatable.View>
        );
    }
    _renderContent = (section, i, isActive, sections) => {
        return (
            <Animatable.View
                duration={700}
                transition="backgroundColor"
                style={{
                    backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)'),
                    paddingHorizontal: px2dp(30),
                    paddingBottom: px2dp(20)
                }}>
                <Animatable.Text
                    duration={700}
                    easing="ease-out"
                    animation={isActive ? 'fadeInDown' : 'fadeOutDown'}
                    style={{lineHeight: px2dp(50), fontSize: px2dp(26), color: '#666'}}
                >
                    {section.content}
                </Animatable.Text>
            </Animatable.View>
        );
    }

    // 渲染
    render() {
        return (
            <View style={styles.defaultView}>
                <Title name={'常见问题'} back/>
                <Accordion
                    sections={SECTIONS}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                />
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    headerText: {
        fontSize: px2dp(30),
        color: '#333'
    }
})
