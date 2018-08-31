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
import Title from '../../../Component/Title';
import Modal from 'react-native-modalbox';
import {Input, Select} from 'teaset';
import SmallButton from '../../../Component/SmallButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '   * ' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    marginRight: px2dp(34),
                    paddingLeft: 0
                }}
                editable={true}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
};

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '   * ' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1,
                    marginRight: px2dp(36),
                    paddingLeft: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                }}
                size='md'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                disabled={false}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
};
const DefaultSelect1 = (props) => {
    return (
        <View style={{
            flexDirection: 'column', borderBottomWidth: props.border ? 0 : px2dp(1),
            borderBottomColor: '#ddd', alignItems: 'center',
        }}>
            <View style={{
                flexDirection: 'row', width: SCREEN_WIDTH,
                borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
            }}>
                <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '   * ' : '  '}<Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>

            </View>
            <View style={{
                flexDirection: 'row',
            }}>
                <Select
                    style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0, marginLeft: px2dp(40)}}
                    pickerType='popover'
                    value={props.value1}
                    items={props.items1}
                    placeholder={'请选择省'}
                    getItemValue={(item, index) => item.value}
                    getItemText={(item, index) => item.text}
                    onSelected={props.onSelected1 ? props.onSelected1 : () => console.log('没回调')}
                />
                <Select
                    style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                    pickerType='popover'
                    value={props.value2}
                    items={props.items2}
                    placeholder={'请选择市'}
                    getItemValue={(item, index) => item.value}
                    getItemText={(item, index) => item.text}
                    onSelected={props.onSelected2 ? props.onSelected2 : () => console.log('没回调')}
                />
                <Select
                    style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                    pickerType='popover'
                    value={props.value3}
                    items={props.items3}
                    placeholder={'请选择区'}
                    getItemValue={(item, index) => item.value}
                    getItemText={(item, index) => item.text}
                    onSelected={props.onSelected3 ? props.onSelected3 : () => console.log('没回调')}
                />
            </View>
        </View>
    )
};

const FormInput = (props) => {
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff',}}>
                    <DefaultSelect require placeholder={'请选择'} name={'开户类型：'} value={props.openValue}
                                   items={props.openArray} onSelected={props.onSelectedOpenType}/>
                    <DefaultSelect require placeholder={'请选择'} name={'账户类型：'} value={props.accountValue}
                                   items={props.accountArray} onSelected={props.onSelectedAccountType}/>
                    <DefaultSelect require placeholder={'请选择'} name={'银行类型：'} value={props.bankName}
                                   items={props.bankType} onSelected={props.onSelectedBankType}/>
                    {/*<DefaultSelect require placeholder={'请选择'} name={'开户地区：'} value={props.areaName}*/}
                    {/*items={props.areaArray} onSelected={props.onSelectedAreaType}/>*/}
                    {/*<DefaultInput require placeholder={'请输入开户地区'} name={'开户地区：'} valOne={props.areaName}*/}
                    {/*onChangeText={props.onChangeAreaNameText}/>*/}
                    <DefaultInput require placeholder={'请输入网点名称'} name={'网点名称：'} valOne={props.bankOutletsName}
                                  onChangeText={props.onChangeBankOutletsNameText}/>
                    <DefaultInput require placeholder={'请输入开户名称'} name={'开户名称：'} valOne={props.name}
                                  onChangeText={props.onChangeNameText}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入银行账号'} name={'银行账号：'}
                                  valOne={props.accountnum}
                                  onChangeText={props.onChangeAccountNumText}/>

                    <DefaultSelect1 require placeholder={'请选择'} name={'开户地址'}
                                    value1={(isEmpty(props.parentHireCityValue) ? props.parentHireCityValue : props.parentHireCityValue + "")}
                                    value2={(isEmpty(props.hireCityValue) ? props.hireCityValue : props.hireCityValue + "")}
                                    value3={(isEmpty(props.areaCityValue) ? props.areaCityValue : props.areaCityValue + "")}
                                    items1={props.parentHireCityItems} onSelected1={props.onSelecteParentHireCity}
                                    items2={props.hireCityItems} onSelected2={props.onSelecteHireCity}
                                    items3={props.areaCityItems} onSelected3={props.onSelecteAreaCity}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
};

export default class BankAccountInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            data1: props,
            openType: '', //开户类型
            openValue: null,
            openArray: [
                {
                    text: '个人',
                    value: 0,
                },
                {
                    text: '企业',
                    value: 1,
                }
            ],
            accountType: '', //账户类型
            accountValue: '',
            accountArray: [],
            bankid: '', //银行id
            bankType: [],
            bankName: '', //银行名称
            areaName: '', //开户地区
            areaArray: [],
            bankOutletsName: '', //网点名称
            enterpriseid: '',
            id: '',
            name: '', //开户名称
            accountnum: '', //银行账号

            disabled: false,

            parentHireCity: [],//省
            parentHireCityValue: '',
            parentHireCityKey: '',
            hireCity: [],//市
            hireCityValue: '',
            hireCityKey: '',
            areaCity: [],//区
            areaCityValue: '',
            areaCityKey: '',
        };
    }

    componentDidMount() {
        this.setState({});
        if (this.props.type1 === "see") {
            this._updateState();
            this._loadItemBankType()
            this._getValueForItem()
        }
        this._loadItemBankType()
        this._parentHireCity();
    }

    //调整页面执行的生命周期
    componentWillReceiveProps(nextProps) {
        this.setState({})
    }

    _getValueForItem() {
        let openV = '';
        this.state.openArray.map((item) => {
            if (item.value == this.props.data.openType) {
                openV = item.text
            }
            console.log('openV', this.props.data.openType, openV);
            this.setState({
                openValue: openV
            })
        });

    }

    //银行类型
    _loadItemBankType = () => {
        let url = Config.baseApi + Config.publicApi.loadItem1CsBank;
        RTRequest.fetch1(url).then((responseText) => {
            console.log('responseText<><><><><>', url, responseText);
            responseText.success ? this._parsingList(responseText.result, 'bankType') : Toast.message(responseText.msg)
        })
    };

    //解析数组
    _parsingList = (list, parameter) => {
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
        });
        console.log([parameter] + "---", dataBlob);
    };
    _subStrNo = (str, splitSymbol) => {
        let b = str.split(splitSymbol, str.length);
        return b;
    }

    _updateState() {
        if (isEmpty(this.props)) {
            return;
        }
        const {openType, accountType, bankname, bankid, bankOutletsName, name, accountnum, areaName, areaId} = this.props.data;
        console.log('==============================================', this.props.data)
        if (!isEmpty(openType)) {
            this.setState({
                openType: openType
            })
        }
        if (!isEmpty(accountType)) {
            this.setState({
                accountType: accountType
            });
            if (accountType == '0') {
                this.state.accountArray = [
                    {text: "个人储蓄户", value: "0"},
                ];
                this.setState({
                    accountValue: '个人储蓄户',
                })
            } else if (accountType == '1') {
                this.state.accountArray = [
                    {text: "基本户", value: "1"},
                    {text: "一般户", value: "2"}
                ];
                this.setState({
                    accountValue: '基本户',
                })
            } else {
                this.state.accountArray = [
                    {text: "基本户", value: "1"},
                    {text: "一般户", value: "2"}
                ];
                this.setState({
                    accountValue: '一般户',
                })
            }
        }
        if (!isEmpty(bankname)) {
            this.setState({
                bankName: bankname
            })
        }
        if (!isEmpty(bankid)) {
            this.setState({
                bankid: bankid
            })
        }
        // if (!isEmpty(areaName)) {
        //     this.setState({
        //         areaName: areaName
        //     })
        // }
        if (!isEmpty(bankOutletsName)) {
            this.setState({
                bankOutletsName: bankOutletsName
            })
        }
        if (!isEmpty(name)) {
            this.setState({
                name: name
            })
        }
        if (!isEmpty(accountnum)) {
            this.setState({
                accountnum: accountnum
            })
        }

        let areaNameAry = [];
        let areaIdAry = [];

        if (!isEmpty(areaName) && !isEmpty(areaId)) {
            areaNameAry = this._subStrNo(areaName, '-');
            areaIdAry = this._subStrNo(areaId, ',');
            this.setState({
                // parentHireCityValue:areaIdAry[1],
                // hireCityValue:areaIdAry[2],
                // areaCityValue:areaIdAry[3],

                // parentHireCityKey:areaNameAry[1],
                // hireCityKey:areaNameAry[2],
                // areaCityKey:areaNameAry[3],

                parentHireCityValue: areaNameAry[1],
                hireCityValue: areaNameAry[2],
                areaCityValue: areaNameAry[3],

            });

        }
    }

    //保存修改过的银行信息
    _saveUpdateBankDetail = () => {
        let url = Config.baseApi + Config.publicApi.updateEnterpriseBank +
            '?enterpriseBank.openType=' + this.state.openType +
            '&enterpriseBank.accountType=' + this.state.accountType +
            '&enterpriseBank.bankid=' + this.state.bankid +
            '&enterpriseBank.areaId=6591,' + this.state.parentHireCityValue + ',' + this.state.hireCityValue + ',' + this.state.areaCityValue +
            '&enterpriseBank.areaName=中国-' + this.state.parentHireCityKey + '-' + this.state.hireCityKey + '-' + this.state.areaCityKey +
            '&enterpriseBank.bankOutletsName=' + this.state.bankOutletsName +
            '&enterpriseBank.openCurrency=' + 0 +
            '&enterpriseBank.name=' + this.state.name +
            '&enterpriseBank.accountnum=' + this.state.accountnum +
            '&enterpriseBank.remarks=' + this.props.data.remarks +
            '&enterpriseBank.enterpriseid=' + this.props.data.enterpriseid +
            '&enterpriseBank.isEnterprise=1' +
            '&enterpriseBank.isInvest=' + 0 +
            '&enterpriseBank.bankName=' + this.state.bankName +
            '&enterpriseBank.id=' + this.props.data.id;

        // enterpriseBank.areaId	6591,6806,6807,6810
        // enterpriseBank.areaName	中国-山西省-太原市-迎泽区

        RTRequest.fetch1(url).then((responseText) => {
            console.log('responseText+++++++++++++++++++++++', responseText)
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message('请检查网络连接');
            }
        })
    };

    //添加新的银行信息
    _addBankDetail = () => {
        //bankOutletsName开户行
        let url = Config.baseApi + '/api/addEnterpriseBank.do' +
            '?enterpriseBank.openType=' + this.state.openType + ""
            + '&enterpriseBank.accountType=' + this.state.accountType + ""
            + '&enterpriseBank.bankid=' + this.state.bankid + ""
            + '&enterpriseBank.areaId=6591,' + this.state.parentHireCityValue + ',' + this.state.hireCityValue + ',' + this.state.areaCityValue
            + '&enterpriseBank.areaName=中国-' + this.state.parentHireCityKey + '-' + this.state.hireCityKey + '-' + this.state.areaCityKey
            + '&enterpriseBank.bankOutletsName=' + this.state.bankOutletsName
            + '&enterpriseBank.openCurrency=0'
            + '&enterpriseBank.iscredit=0&enterpriseBank.name=' + this.state.name
            + '&enterpriseBank.accountnum=' + this.state.accountnum
            + '&enterpriseBank.remarks=' + ''
            + '&enterpriseBank.enterpriseid=' + this.props.allData.id
            + '&enterpriseBank.isEnterprise=1'
            + '&enterpriseBank.bankName=' + this.state.bankName
            + '&enterpriseBank.isInvest=0';
        console.log('<><><><><><><><><><><<><><><><><><><<', url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message('请检查网络连接');
            }
        })
    };

    _SUCCESS() {
        Toast.message('保存成功');
        Actions.pop({refresh: ({isRefresh: true, data1: new Date()})})
    }

    //非空判断
    _determineWhetherIsEmpty = () => {
        const {openValue, accountValue, bankName, areaName, bankOutletsName, name, accountnum, parentHireCityValue, hireCityValue, areaCityValue} = this.state;
        let mobileCodeReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (isEmpty(openValue)) {
            Toast.message('请选择开户类型');
            return;
        }
        if (isEmpty(accountValue)) {
            Toast.message('请选择账户类型');
            return;
        }
        if (isEmpty(bankName)) {
            Toast.message('请选择银行');
            return;
        }
        if (isEmpty(bankOutletsName)) {
            Toast.message('请输入网点名称');
            return;
        }
        if (isEmpty(name)) {
            Toast.message('请输入开户名称');
            return;
        }
        if (isEmpty(parentHireCityValue) && isEmpty(hireCityValue) && isEmpty(areaCityValue)) {
            Toast.message('请选择开户行');
            return;
        }
        if (isEmpty(accountnum)) {
            Toast.message('请输入银行账号');
            return;
        } else {
            this.refs.modalSix.open()
            return;
        }

    };

    _parentHireCity() {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + "6591";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._parsingList(responseText.result, "parentHireCity") : Toast.message(responseText.msg);
            }
        })
    }

    _hireCity2 = (parentId) => {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + parentId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                this.setState({hireCityValue: responseText.result[1].value}),
                    responseText.success ? this._parsingList(responseText.result, "hireCity") : Toast.message(responseText.msg);
            }
        })
    };
    _AreaCity = (parentId) => {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + parentId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                this.setState({areaCityValue: responseText.result[1].value}),
                    responseText.success ? this._parsingList(responseText.result, "areaCity") : Toast.message(responseText.msg);
            }
        })
    };

    render() {
        console.log("thiasdfaf", this.state)
        const {openValue, openArray, areaCity, areaCityValue, hireCity, hireCityValue, parentHireCityValue, parentHireCity, accountValue, accountArray, bankName, bankType, areaName, areaArray, bankOutletsName, name, accountnum} = this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={'银行开户信息'} back/>
                <ScrollView style={styles.container}>
                    <View>
                        <FormInput
                            openValue={openValue}
                            openArray={openArray}
                            onSelectedOpenType={(item, index) => {
                                this.setState({
                                    openValue: item.text,
                                    openType: item.value
                                });
                                if (item.value == '0') {
                                    this.setState({
                                        accountValue: '个人储蓄户',
                                        accountType: '0',
                                        accountArray: [
                                            {text: "个人储蓄户", value: "0"},
                                        ]
                                    })
                                } else if (item.value == '1') {
                                    this.setState({
                                        accountValue: '基本户',
                                        accountType: '1',
                                        accountArray: [
                                            {text: "基本户", value: "1"},
                                            {text: "一般户", value: "2"}
                                        ]
                                    })
                                }
                            }}

                            accountValue={accountValue}
                            accountArray={accountArray}
                            onSelectedAccountType={(item, index) => {
                                this.setState({
                                    accountValue: item.text,
                                    accountType: item.value
                                })
                            }}

                            bankName={bankName}
                            bankType={bankType}
                            onSelectedBankType={(item, index) => {
                                this.setState({
                                    bankName: item.text,
                                    bankid: item.value
                                })
                            }}

                            // areaName={areaName}
                            // onChangeAreaNameText={(text) => {
                            //     this.setState({
                            //         areaName:text
                            //     })
                            // }}

                            // areaArray={areaArray}
                            // onSelectedAreaType={(item, index) => {
                            //     this.setState({
                            //         areaName:item
                            //     })
                            // }}

                            bankOutletsName={bankOutletsName}
                            onChangeBankOutletsNameText={(text) => {
                                this.setState({
                                    bankOutletsName: text
                                })
                            }}

                            name={name}
                            onChangeNameText={(text) => {
                                this.setState({
                                    name: text
                                })
                            }}

                            accountnum={accountnum}
                            onChangeAccountNumText={(text) => {
                                this.setState({
                                    accountnum: text
                                })
                            }}
                            areaCityItems={areaCity}
                            areaCityValue={areaCityValue}
                            onSelecteAreaCity={(item, index) => {
                                this.setState({
                                    areaCityValue: item.value,
                                    areaCityKey: item.text
                                });
                            }}
                            hireCityItems={hireCity}
                            hireCityValue={hireCityValue}
                            onSelecteHireCity={(item, index) => {
                                this._AreaCity(item.value)
                                this.setState({
                                    hireCityValue: item.value,
                                    hireCityKey: item.text
                                });

                            }}
                            parentHireCityItems={parentHireCity}
                            parentHireCityValue={parentHireCityValue}
                            onSelecteParentHireCity={(item, index) => {
                                this._hireCity2(item.value)
                                this.setState({
                                    parentHireCityValue: item.value,
                                    parentHireCityKey: item.text
                                })


                            }}
                        />
                    </View>
                    <SmallButton style={{flex: 1, marginTop: px2dp(50)}} name="保存" height={70} width={240}
                                 onPress={() => this._determineWhetherIsEmpty()}/>
                </ScrollView>
                <Modal style={styles.modal} position={"center"} ref={"modalSix"} swipeArea={20}>
                    <View style={styles.viewBG}>
                        <Text style={styles.textView}>确定保存</Text>
                    </View>
                    <View style={{
                        flex: 1.5,
                        borderBottomRightRadius: px2dp(30),
                        borderBottomLeftRadius: px2dp(30),
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <SmallButton name="确定" style={{flex: 1}} height={70} width={200}
                                     onPress={() => this.state.disabled ? '' : this.setState({disabled: true}, this.props.type1 === "see" ? () => this._saveUpdateBankDetail() : () => this._addBankDetail())}/>
                        <SmallButton name="取消" style={{flex: 1}} height={70} width={200}
                                     onPress={() => this.refs.modalSix.close()}/>
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
    text: {
        color: "black",
        fontSize: px2dp(26)
    },
    viewBG: {
        paddingLeft: px2dp(15),
        paddingTop: px2dp(15),
        borderTopLeftRadius: px2dp(30),
        borderTopRightRadius: px2dp(30),
        // backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textView: {
        fontSize: px2dp(38),
        color: '#3A93F5',
    },
    modal: {
        height: global.SCREEN_HEIGHT * .22,
        width: global.SCREEN_WIDTH * .75,
        backgroundColor: '#ebebeb',
        borderRadius: px2dp(30)
    }
});

