import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native' ;
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

                <Title name={'签约'} back={false}/>
                <View style={{height: px2dp(388), width: SCREEN_WIDTH}}>
                    <View style={{
                        height: px2dp(113), backgroundColor: '#fff', paddingLeft: px2dp(30),
                        alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <View>
                            <Text style={{fontSize: px2dp(32), color: '#333'}}>华为Mate9 4GB+32GB[分6期]</Text>
                            <Text style={{fontSize: px2dp(24), color: '#666666'}}>合同编号: 23378967899</Text>
                        </View>
                        <View style={{
                            backgroundColor: 'orange',
                            height: px2dp(42),
                            width: px2dp(125),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{fontSize: px2dp(26), color: '#fff'}}>待签约</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: '#fff',
                        height: px2dp(275),
                        width: SCREEN_WIDTH,
                        paddingHorizontal: px2dp(30)
                    }}>
                        <View style={{
                            backgroundColor: '#FAFAFA', flex: 1, height: px2dp(206),
                            alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{marginLeft: px2dp(25)}}>
                                <Text style={{fontSize: px2dp(42), color: '#ec616f'}}>10000.00</Text>
                                <Text
                                    style={{fontSize: px2dp(26), color: '#666', paddingTop: px2dp(10)}}>借款金额</Text>
                            </View>
                            <View style={{marginRight: px2dp(40)}}>
                                <Text style={{fontSize: px2dp(26), color: '#666'}}>期限:12个月</Text>
                                <Text style={{
                                    fontSize: px2dp(26),
                                    color: '#666',
                                    paddingVertical: px2dp(10)
                                }}>放款时间:2017-12-12</Text>
                                <Text style={{fontSize: px2dp(26), color: '#666'}}>到期时间:2019-12-12</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            height: px2dp(69),
                            justifyContent: "space-around",
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity>
                                <Text style={{fontSize: px2dp(28), color: '#666'}}>取消签约</Text>
                            </TouchableOpacity>
                            <View style={{width: px2dp(1), height: px2dp(32), backgroundColor: '#666'}}/>
                            <TouchableOpacity onPress={() => Alert.alert(
                                '确定要签约吗?',
                                null,
                                [
                                    {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: '确定', onPress: () => Actions.ToSign()},
                                ],
                                {cancelable: false}
                            )}>
                                <Text style={{fontSize: px2dp(28), color: '#3399fe'}}>立即签约</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>


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
