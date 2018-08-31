/**
 * Created by duansailong on 2018/3/9.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {Input, Select} from 'teaset';
import Modal from 'react-native-modalbox';
import SmallButton  from '../../Component/SmallButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerType='popover'
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DefaultSelect1 = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                pickerType='popover'
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const FormInput = (props) => {
    const that = props.that
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff',}}>
                    <DefaultSelect require placeholder={'请选择'} name={'开户类型：'}
                                   value={(isEmpty(props.openType)?null:props.openType+"")}
                                   items={props.openTypeArray} onSelected={props.onSelectedOpenTypeArray}/>
                    <DefaultSelect require placeholder={'请选择'} name={'账户类型：'}
                                   value={(isEmpty(props.accountTypeValue)?null:props.accountTypeValue+"")}
                                   items={props.accountTypeArray} onSelected={props.onSelecteAccountTypeArray}/>
                    <DefaultSelect require placeholder={'请选择'} name={'银行类型：'}
                                   value={(isEmpty(props.bankStatusValue)?null:props.bankStatusValue+"")}
                                   items={props.bankStatusItems} onSelected={props.onSelectedbankStatus}/>
                    <DefaultInput require placeholder={'请输入网点名称'} name={'网点名称：'}
                                  onChangeText={props.onChangeBankOutletsName}/>
                    <DefaultInput require placeholder={'请输入开户名称'} name={'开户名称：'}
                                  onChangeText={props.onChangeName}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入银行账号'} name={'银行账号：'}
                                  onChangeText={props.onChangeAccountnum}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
/*<DefaultSelect1 require placeholder={'请选择'} name={'开户地区：'}
                value={(isEmpty(props.areaName)?null:props.areaName+"")}
                items={props.cityStatusItems} onSelected={props.onSelectedcityStatus}/>*/
/*======添加开户信息=====*/
export default class AddBanks extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(">>>>>>>>>>>>>>>>>>>>", props.allData);
        this.state = {
            openValue: '',
            openType: '',
            openTypeArray: [
                {text: "个人", value: "0"},
                {text: "企业", value: "1"}
            ],
            accountTypeValue: '',
            accountType: '',
            accountTypeArray: [],
            bankStatusValue: '',
            bankStatusItems: [],
            bankid: '',
            bankOutletsName: '',
            name: '',
            accountnum: '',
        };
    }

    componentDidMount() {
        this._loadBank();
        if (!isEmpty(this.props.newId)) {
            this.setState({id: this.props.newId});
        } else {
            this.setState({id: this.props.allData.id});
        }
    }

    cityStatusItems = ['上海', '北京', '天津'];

    _loadBank() {
        let url = Config.baseApi + "/api/loadItem1CsBank.do"
        RTRequest.fetch1(url).then((responseText) => {
            console.log("aaaa", responseText)
            if (responseText) {
                responseText.success ? this._render(responseText.result, "bankStatusItems") : Toast.message("请检查网络");
            }
        })
    }

    _render = (list, parameter) => {
        let dataBlob = [];
        let i = 0;
        for (let i = 1; i < list.length; i++) {
            let item = {
                text: list[i].text,
                value: list[i].value,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        })
        console.log("aaaa", dataBlob)
    }

    _addPersonInfo() {
        const {id,accountType,accountnum,name,bankOutletsName,accountTypeValue,bankStatusValue,areaName,openType}=this.state
        // let reg = /^([1-9]{1})(\d{15}|\d{18})$/;
        // if
        // (!reg.test(accountnum)) {
        //     Toast.message("银行账号格式不正确");
        //     return;
        // }
        let url = Config.baseApi + "/api/addEnterpriseBank.do"
            + "?enterpriseBank.isEnterprise=0"
            + "&enterpriseBank.iscredit=0"
            + "&enterpriseBank.enterpriseid=" + id
            + "&enterpriseBank.bankid=" + this.state.bankid
            + "&enterpriseBank.bankOutletsName=" + bankOutletsName
            + "&enterpriseBank.name=" + name
            + "&enterpriseBank.accountnum=" + accountnum
            + "&enterpriseBank.openType=" + openType
            + "&enterpriseBank.accountType=" + accountType;
/*
        + "&enterpriseBank.areaName=" + areaName
*/
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络");
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {openValue,accountType,bankStatusItems,bankStatusValue,openType,openTypeArray,accountTypeArray,accountTypeValue,areaName,bankOutletsName,name,accountnum} = this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                <ScrollView style={styles.container}>
                    <View>
                        <FormInput
                            that={this}
                            openTypeArray={openTypeArray}
                            openType={openType}
                            onSelectedOpenTypeArray={(item) => {
                                this.setState({
                                    openValue: item.text,
                                    openType:item.value,
                                })
                                if(item.value==="0"){
                                    this.setState({
                                        accountTypeValue:"个人储蓄户",
                                        accountType:"0",
                                        accountTypeArray: [
                                                {text: "个人储蓄户", value: "0"},
                                        ]
                                    })
                                }else if(item.value==="1"){
                                    this.setState({
                                    accountTypeValue:"基本户",
                                    accountType:"1",
                                        accountTypeArray: [
                                                {text: "基本户", value: "1"},
                                                {text: "一般户", value: "2"}
                                        ]
                                    })
                                }
                           }}
                            accountTypeArray={accountTypeArray}
                            accountTypeValue={accountTypeValue}
                            onSelecteAccountTypeArray={(item) => {
                             this.setState({
                                accountTypeValue: item.text,
                                accountType: item.value
                              })
                            }}
                            bankStatusValue={bankStatusValue}
                            bankStatusItems={bankStatusItems}
                            onSelectedbankStatus={(item) => {
							    this.setState({
							        bankStatusValue: item.text,
							        bankid: item.value,
							    })
						    }}
                            areaName={areaName}
                            cityStatusItems={this.cityStatusItems}
                            onSelectedcityStatus={(item) => {
							    this.setState({areaName: item})
						    }}

                            onChangeBankOutletsName={(bankOutletsName) => {
                            this.setState({
                                bankOutletsName
                            })
                        }}
                            onChangeName={(name) => {
                            this.setState({
                                name
                            })
                        }}
                            onChangeAccountnum={(accountnum) => {
                            this.setState({
                                accountnum
                            })
                        }}
                        />
                    </View>
                    <View
                        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: px2dp(150), paddingBottom: px2dp(10)}}>
                        <SmallButton name="保存" style={{flex: 1}} height={75} width={250}
                                     onPress={()=>this.refs.ss.open()}/>
                    </View>
                </ScrollView>
                <Modal style={styles.modal} position={"center"} ref={"ss"} swipeArea={20}>
                    <View>
                        <Text
                            style={{fontSize:28,textAlign:'center',marginBottom:px2dp(30),marginTop:px2dp(20),color:'blue'}}>
                            确认保存
                        </Text>
                    </View>
                    <View
                        style={{borderBottomRightRadius: px2dp(30),borderBottomLeftRadius: px2dp(30),flexDirection: 'row',justifyContent: 'space-around'}}>
                        <SmallButton name="确定" style={{flex: 1}} height={70} width={240}
                                     onPress={()=>this._addPersonInfo()}/>
                        <SmallButton name="取消" style={{flex: 1}} height={70} width={240}
                                     onPress={()=>this.refs.ss.close()}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modal: {
        height: global.SCREEN_HEIGHT * .2,
        width: global.SCREEN_WIDTH * .85,
        borderRadius: px2dp(10)
    }
})