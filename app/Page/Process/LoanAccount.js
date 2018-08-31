/**
 * Created by duansailong on 2018/3/8.
 */
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
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
import Icon from 'react-native-vector-icons/Ionicons';
/*收款账户信息*/
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled?'#fffdcc':'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    marginRight: px2dp(34),
                    paddingLeft: 0
                }}
                editable={!inputDisabled}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    const {selectDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,backgroundColor: props.disabled? 'transparent':'#fffdcc',}}
                size='md'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                disabled={selectDisabled}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    const {chooseDisabled} =  props.props.data;
    return (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={
                chooseDisabled?"":()=>Actions[props.action]({data:props.data.props.data})
                }
                  style={{
                        backgroundColor: chooseDisabled? '#fffdcc' : 'transparent',
                        borderColor: 'transparent',
                        textAlign: 'left',
                        flex: 1,
                        paddingTop: px2dp(12),
                        marginRight: px2dp(38),
                        paddingBottom: px2dp(12),
                        width: px2dp(300),
                        paddingLeft: 0
                  }}
            >{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultChoice disabled name={'开户名称'} valOne={props.name} data={props.this1}
                                   action="PaymentAccount" props={props}/>
                    <DefaultSelect require placeholder={'请选择账户类型'} name={'账户类型'}
                                   value={props.accountType===0?"个人储蓄户":(props.accountType===1?"基本户":(props.accountType===2?"一般户":null))}
                                   items={props.sexType} props={props}/>
                    <DefaultSelect require placeholder={'请选择银行名称'} name={'银行名称'} value={props.bankName}
                                   items={props.marriageType} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput require placeholder={'请选择网点名称'} name={'网点名称'}
                                  valOne={props.bankOutletsName} props={props}/>
                    <DefaultInput require placeholder={'请输入开户类型'} name={'开户类型'}
                                  valOne={props.openType===0?"个人":(props.openType===1?"公司":"")}
                                  props={props}/>
                    <DefaultInput keyboardType={"numeric"} border require placeholder={'请输入开户账号'} name={'开户账号'}
                                  valOne={props.accountNum} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.chooseDisabled ? <View/> :
                <SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250}
                             onPress={()=>props.this1._savePerson()}/>}
        </ScrollView>
        /*<DefaultSelect border require placeholder={'请选择开户地区'} name={'开户地区'} value={props.areaName}
         items={props.certificateType} onSelected={props.onSelectedCertificateType}
         props={props}/>*/
    )
}

export default class LoanAccount extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            personId: props.data.personId,
            data: props
        };
    }

    componentDidMount() {
        //性别
        this.setState({
            id: '',
            accountNum: null,//开户账号
            accountType: null,//账户类型 ["个人储蓄户", "0"],["基本户", "1"],["一般户", "2"]
            name: null,//开户名称
            openType: null,//开户类型 ["个人", "0"],["公司", "1"]
            bankName: null,//银行名称
            bankOutletsName: null,//网点名称
            areaName: null,//开户地区
        })
        this._upDataState();
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        const {accountNum,accountType,NAME,openType,bankName,bankOutletsName,areaName,id} = nextProps;
        if (nextProps.isRefresh) {
            this.setState({
                accountNum,
                accountType,
                name: NAME,
                openType,
                bankName,
                bankOutletsName,
                areaName,
                id,
            });
        }
    }

    _upDataState() {
        if (isEmpty(this.state.data.data.allData.enterpriseBank)) {
            return;
        }
        const {accountnum,accountType,name,openType,bankname,bankOutletsName,areaName,id} = this.state.data.data.allData.enterpriseBank;
        if (!isEmpty(accountnum)) {
            this.setState({accountNum: accountnum});
        }
        if (!isEmpty(bankname)) {
            this.setState({bankName: bankname});
        }
        if (!isEmpty(accountType)) {
            this.setState({accountType});
        }
        if (!isEmpty(name)) {
            this.setState({name});
        }
        if (!isEmpty(openType)) {
            this.setState({openType})
        }
        if (!isEmpty(bankOutletsName)) {
            this.setState({bankOutletsName})
        }
        if (!isEmpty(areaName)) {
            this.setState({areaName})
        }
        if (!isEmpty(id)) {
            this.setState({id})
        }

    }

    _savePerson = ()=> {
        const {id} = this.state;
        let url = Config.baseApi + Config.processApi.saveProjectInfo +
            '?slSmallloanProject.projectId=' + this.props.data.data.vars[0].projectId +
            '&slSmallloanProject.enterpriseBankId=' + id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {name,data,accountNum,accountType,openType,bankName,bankOutletsName} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    name={name}
                    data={data}
                    accountNum={accountNum}
                    accountType={accountType}
                    openType={openType}
                    bankName={bankName}
                    bankOutletsName={bankOutletsName}
                    this1={this}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultView: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    }
})




