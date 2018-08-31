import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native' ;
import Title from '../../Component/Title'
import Icon from 'react-native-vector-icons/Ionicons'
import {Input, Overlay, Label, ActionPopover} from 'teaset';
import Button from '../../Component/BigButton'

export default class AddBankCard extends Component {
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
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
            >
                <View style={{
                    backgroundColor: '#fff',
                    minWidth: 260,
                    minHeight: 180,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Label type='title' size='xl' text='北京银行'/>
                    <Label type='title' size='xl' text='工商银行'/>
                    <Label type='title' size='xl' text='建设银行'/>
                    <Label type='title' size='xl' text='北京银行'/>
                    <Label type='title' size='xl' text='北京银行'/>


                </View>
            </Overlay.PopView>
        );

        return (
            <View style={styles.defaultView}>
                <Title name={'添加银行卡'} back/>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: px2dp(73),
                    paddingHorizontal: px2dp(28)
                }}>
                    <Text style={{color: '#666', fontSize: px2dp(28)}}>请绑定支持的储蓄卡</Text>
                    <Text onPress={() => Overlay.show(overlayView)}
                          style={{color: '#3399fe', fontSize: px2dp(28)}}>查看支持银行</Text>
                </View>
                <View style={{backgroundColor: '#fff'}}>
                    <View style={{width: SCREEN_WIDTH, paddingLeft: px2dp(28)}}>
                        <View style={styles.itemSty}>
                            <View style={styles.insideItemSty}>
                                <Text style={styles.itemTextSty}>银行卡号</Text>
                                <Text style={{fontSize: px2dp(28), color: '#333'}}>2336 789 3045 2395</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name={'md-qr-scanner'} size={px2dp(50)} color={'#333'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemSty}>
                            <View style={styles.insideItemSty}>
                                <Text style={styles.itemTextSty}>卡户银行</Text>
                                <Input
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: 'transparent',
                                        textAlign: 'left',
                                        flex: 1,
                                        paddingLeft: 0
                                    }}
                                    value={this.state.valueCustom}
                                    placeholder={'通过银行卡判断开户行'}
                                    onChangeText={text => this.setState({valueCustom: text})}
                                />
                            </View>

                        </View>
                        <View style={styles.itemSty}>
                            <View style={styles.insideItemSty}>
                                <Text style={styles.itemTextSty}>预留手机号</Text>
                                <Text style={{fontSize: px2dp(28), color: '#333'}}>150*****80</Text>
                            </View>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    width: 1,
                                    height: px2dp(34),
                                    backgroundColor: '#dddc',
                                    marginRight: px2dp(36)
                                }}/>
                                <Text style={{color: '#3399fe', fontSize: px2dp(28)}}>
                                    获取验证码
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemSty}>
                            <View style={styles.insideItemSty}>
                                <Text style={styles.itemTextSty}>短信验证码</Text>
                                <Input
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderColor: 'transparent',
                                        textAlign: 'left',
                                        flex: 1,
                                        paddingLeft: 0
                                    }}
                                    value={this.state.valueCustom}
                                    placeholder={'请输入短信验证码'}
                                    onChangeText={text => this.setState({valueCustom: text})}
                                />
                            </View>

                        </View>
                    </View>
                </View>
                <Button style={{marginTop: px2dp(96)}} name={'添加银行卡'} onPress={() => alert('添加')}/>

            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    itemSty: {
        height: px2dp(120),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: px2dp(28)
    },
    itemTextSty: {
        fontSize: px2dp(28), color: '#666', width: px2dp(180)
    },
    insideItemSty: {
        flexDirection: 'row', alignItems: 'center',
    }


})
