'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import SmallButton from '../../Component/SmallButton';
import {Input, Select,Toast} from 'teaset';
import Icon from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modalbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                editable={props.disabled? false : true}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>

    )
}
const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
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
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
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
    let that = props.that;
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultSelect require placeholder={'请选择'} name={'开户类型：'} value={props.customerTypeValue}
                                   items={props.customerType} onSelected={props.onSelectedCustomerType}/>
                    <DefaultSelect require placeholder={'请选择'} name={'账户类型：'} value={props.zhanghuTypeValue}
                                   items={props.zhanghuType} onSelected={props.onSelecteZhanghuType}/>
                    <DefaultSelect require placeholder={'请选择'} name={'银行类型：'} value={props.bankStatusValue}
                                   items={props.bankStatusItems} onSelected={props.onSelectedbankStatus}/>

                    <DefaultInput require placeholder={'请输入网点名称'} value={props.bankOutletsName} name={'网点名称：'}
                                  onChangeText={props.onChangeBankName}/>
                    <DefaultInput require placeholder={'请输入开户名称'} value={props.name} name={'开户名称：'}
                                  onChangeText={props.onChangeBankKaihu}/>
                    <DefaultInput require keyboardType={"numeric"} value={props.accountnum} placeholder={'请输入银行账号'}
                                  name={'银行账号：'}
                                  onChangeText={props.onChangeBankNumber}/>
                    <DefaultInput placeholder={'请添加备注'} value={props.remarks} name={'备注：'}
                                  onChangeText={props.onChangeReMarks}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
        /*<DefaultSelect1 require placeholder={'请选择'} name={'开户地区：'} value={props.areaName}
         items={props.AreaNameArray} onSelected={props.onSelectedcityStatus}/>*/
    )

}

export default class MyBanksDetail extends Component {

    // 构造
    constructor(props) {
        super(props);
        console.log(">>>>>>>>>>>>", props.data)
        this.state = {
            customerTypeValue: null,
            customerType: [
                {text: "企业", value: "1"},
                {text: "个人 ", value: "0"}
            ],
            openType: '',
            zhanghuTypeValue: null,
            zhanghuType: [],
            bankStatusValue: null,
            bankStatusItems: [],
            areaName: '',
            bankid: '',
            bankOutletsName: '',
            name: '',
            accountnum: '',
            remarks: '',
            accountType: '',
        };
    }

    AreaNameArray = ['上海', '北京', '天津'];

    componentDidMount() {
        this._loadBank();
        this._setState1()
    }

    _setState1() {
        const {bankid,accountnum,remarks,name,areaName,bankOutletsName,openType,accountType,bankname} = this.props.data;
        let typeO = '';
        this.state.customerType.map((item) => {
            if (item.value == openType) {
                typeO = item.text;
            }
        })
        this.setState({
            customerTypeValue: typeO
        })
        if (!isEmpty(accountType)) {
            this.setState({
                accountType: accountType
            })
            if (accountType == "0") {
                this.setState({
                    zhanghuTypeValue: '个人储蓄户',
                    zhanghuType: [
                        {text: "个人储蓄户", value: "0"},
                    ]
                });
            } else if (accountType == "1") {
                this.setState({
                    zhanghuTypeValue: '基本户',
                    zhanghuType: [
                        {text: "基本户", value: "1"},
                        {text: "一般户", value: "2"}
                    ]
                });
            } else {
                this.setState({
                    zhanghuTypeValue: '一般户',
                    zhanghuType: [
                        {text: "基本户", value: "1"},
                        {text: "一般户", value: "2"}
                    ]
                });
            }
        }
        if (!isEmpty(openType)) {
            this.setState({
                openType: openType
            });
        }
        if (!isEmpty(bankid)) {
            this.setState({
                bankid: bankid
            });
        }
        if (!isEmpty(bankname)) {
            this.setState({
                bankStatusValue: bankname
            });
        }
        if (!isEmpty(areaName)) {
            this.setState({
                areaName: areaName
            });
        }
        /*账号*/
        if (!isEmpty(accountnum)) {
            this.setState({
                accountnum: accountnum
            });
        }
        /*开户名称*/
        if (!isEmpty(name)) {
            this.setState({
                name: name
            });
        }
        /*网点名称*/
        if (!isEmpty(bankOutletsName)) {
            this.setState({
                bankOutletsName: bankOutletsName
            });
        }
        /*备注*/
        if (!isEmpty(remarks)) {
            this.setState({
                remarks: remarks
            });
        }
    }

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
    }

    _updatePersonInfo() {
        const {remarks,accountnum,name,bankOutletsName,accountType,areaName,openType}=this.state;
        let reg = /^([1-9]{1})(\d{15}|\d{18})$/;
            if
        (!reg.test(accountnum))
        {
            Toast.message("银行账号格式不正确");
            return;
        }
        let url = Config.baseApi + "/api/updateEnterpriseBank.do"
            + "?enterpriseBank.openType=" + openType
            + "&enterpriseBank.isEnterprise=" + openType
            + "&enterpriseBank.id=" + this.props.data.id
            + "&enterpriseBank.accountType=" + accountType
            + "&enterpriseBank.bankid=" + this.state.bankid
            + "&enterpriseBank.bankOutletsName=" + bankOutletsName
            + "&enterpriseBank.name=" + name
            + "&enterpriseBank.accountnum=" + accountnum
            + "&enterpriseBank.remarks=" + remarks;
        Toast.message(url)
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络");
            }
        })
    }

    _SUCCESS() {
        Toast.message("更新成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {customerType,accountType,openType,bankStatusItems,bankStatusValue,zhanghuType,remarks,customerTypeValue,areaName,zhanghuTypeValue,bankOutletsName,name,accountnum} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View>
                    <FormInput
                        that={this}
                        customerType={customerType}
                        customerTypeValue={customerTypeValue}
                        onSelectedCustomerType={(item, index) => {
                                this.setState({
                                    customerTypeValue: item.text,
                                    openType: item.value
                                })
                                if(item.value=="0"){
                                    this.setState({
                                        zhanghuTypeValue:"个人储蓄户",
                                        accountType:"0",
                                        zhanghuType: [
                                                {text: "个人储蓄户", value: "0"},
                                        ]
                                    })
                                }else if(item.value=="1"){
                                    this.setState({
                                    zhanghuTypeValue:"基本户",
                                    accountType:"1",
                                        zhanghuType: [
                                                {text: "基本户", value: "1"},
                                                {text: "一般户", value: "2"}
                                        ]
                                    })
                                }

                           }}
                        zhanghuTypeValue={zhanghuTypeValue}
                        zhanghuType={zhanghuType}
                        onSelecteZhanghuType={(item) => {
                             this.setState({
                                zhanghuTypeValue: item.text,
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
                        AreaNameArray={this.AreaNameArray}
                        onSelectedcityStatus={(item) => {
							    this.setState({areaName: item})
						}}
                        bankOutletsName={bankOutletsName}
                        onChangeBankName={(bankOutletsName) => {
                            this.setState({
                                bankOutletsName
                            })
                        }}
                        name={name}
                        onChangeBankKaihu={(name) => {
                            this.setState({
                                name
                            })
                        }}
                        accountnum={accountnum}
                        onChangeBankNumber={(accountnum) => {
                            this.setState({
                                accountnum
                            })
                        }}
                        remarks={remarks}
                        onChangeReMarks={(remarks) => {
                            this.setState({
                                remarks
                            })
                        }}
                    />
                </View>
                <View
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: px2dp(150), paddingBottom: px2dp(10)}}>
                    <SmallButton name="更新" style={{flex: 1}} height={75} width={250}
                                 onPress={()=>this.refs.ss.open()}/>
                </View>
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
                                     onPress={()=>this._updatePersonInfo()}/>
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
    },
    modal: {
        height: global.SCREEN_HEIGHT * .2,
        width: global.SCREEN_WIDTH * .85,
        borderRadius: px2dp(10)
    }
})