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
import DatePicker from 'react-native-datepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';

const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: props.disabled?"#fffdcc":(inputDisabled? '#fffdcc' : 'transparent'),
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={!isEmpty(props.disabled)?false:(!inputDisabled)}
                value={props.valOne+''}
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
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: props.disabled?"#fffdcc":(selectDisabled? '#fffdcc' : 'transparent'),}}
                size='md'
                pickerType='popover'
                disabled={!isEmpty(props.disabled)?true:(selectDisabled)}
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
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
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                pickerType='popover'
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    const {chooseDisabled} =  props.props.data;
    return  (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#fff'}}>*<Text
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
const DatePicker1 = (props) => {
    const {datePickerDisabled} =  props.props.data;
    console.log("date++++++",props.props.startDate)
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#fff'}}>*<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={props.props.startDate}
                mode="date"
                disabled={datePickerDisabled}
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                minDate="2018-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    {/*<DefaultInput disabled={true} name={'出款人'} placeholder={'出款人'} valOne={props.data1.slSmallloan.toUsedepartment} props={props}/>*/}
                    <DefaultSelect disabled placeholder={'出款人'} name={'出款人'} value={props.data1.slSmallloan.toUsedepartment}
                                   items={props.payeeType} props={props}/>

                    <DefaultChoice name={'申请人'} valOne={props.appUserName} data={props.this1} action="SelectCustomer" props={props}/>
                    <DefaultSelect1 placeholder={'请选择用款方式'} name={'用款方式'} value={(isEmpty(props.useMoneyTypeKey)?props.useMoneyTypeKey:props.useMoneyTypeKey)}
                                   items={props.useMoneyType} onSelected={props.onSelectedUseMoneyType} props={props}/>
                    <DefaultInput disabled={true} placeholder={'未填写'} name={'金额（大写'} valOne={props.data1.bigMoneyWrite} props={props}/>
                    <DefaultInput disabled={true} placeholder={'未填写'} name={'金额（小写）'} valOne={props.data1.slSmallloan.projectMoney} props={props}/>
                    <DefaultSelect require placeholder={'请选择款项用途'} name={'款项用途'} value={(isEmpty(props.moniesUseValue)?props.moniesUseValue:props.moniesUseValue+"")}
                                   items={props.moniesUse} onSelected={props.onSelectedMoniesUse} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultSelect placeholder={'请选择币种'} name={'币种'} value={(isEmpty(props.currencyValue)?props.currencyValue:props.currencyValue+"")}
                                   items={props.currency} onSelected={props.onSelectedCurrency} props={props}/>
                    <DefaultInput disabled={true} placeholder={'未填写'} name={'收款单位/个人'} valOne={props.data1.acceptPerson.name} props={props}/>
                    <DatePicker1 name={"约定报账日"} onChangeDate={props.onChangeStartDate} props={props} />
                    <DefaultInput disabled={true} placeholder={'未填写'} name={'开户银行'} valOne={props.data1.enterpriseBank.bankOutletsName} props={props}/>
                    <DefaultInput border disabled={true} placeholder={'未填写'} name={'开户账号'} valOne={props.data1.enterpriseBank.accountnum} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.selectDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._savePerson()} />}
        </ScrollView>
    )
}

export default class PaymentRequest extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props+++",props)
        // 初始状态
        this.state = {
            data: props,
            //性别
            appUserId: '1',//申请人Id
            appUserName: '超级管理员',//申请人姓名
            startDate: '',//约定交货期或报账期
            //款项用途
            moniesUse: [],
            moniesUseValue: '',
            //币种
            currency: [],
            currencyValue: '449',
            //用款方式
            useMoneyTypeKey: '',
            //出款人
            payeeType: [],
        };
    }
    useMoneyType= ['现金','转账'];
    componentDidMount() {
        this._payee();//出款人查询
        this._moniesUse();//款项用途
        this._currency();//币种
        this._changeState();//修改状态
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.isRefresh){
            this.setState({
                appUserName: nextProps.key1,
                appUserId: nextProps.key2,
            });
        }
    }
    _payee (){
        let url = Config.baseApi + Config.publicApi.dictionaryKeyUrl+"toUsedepartment_smallloan";//出款人key
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('出款人', responseText);
                responseText.success ? this._key1(responseText.result, "payeeType") : Toast.message(responseText.msg);
            }
        })
    }
    _key1 = (list,parameter) => {
        let dataBlob = [];
        for(let i=1;i<list.length;i++){
            let item = {
                text: list[i].text,
                value: list[i].value,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
    }
    _changeState() {
        console.log('this.state.data.data.allData',this.state.data.data.allData)
        const {slSmallloan,slSmallloanProject} = this.state.data.data.allData;
        //约定报账日
        if(!isEmpty(slSmallloan.startDate)){
            this.setState ({
                startDate: slSmallloan.startDate
            })
        }
        if(!isEmpty(slSmallloan.appUserName)){
            this.setState ({
                appUserId: slSmallloan.appUserId,
                appUserName: slSmallloan.appUserName,
            })
        }
        //用款方式
        if(!isEmpty(slSmallloanProject.useMoneyType)){
            this.setState ({
                useMoneyTypeKey: slSmallloanProject.useMoneyType
            })
        }
        //款项用途
        if(!isEmpty(slSmallloanProject.moniesUse)){
            this.setState ({
                moniesUseValue: slSmallloanProject.moniesUse
            })
        }
    }
    _moniesUse (){
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "moniesUse";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('款项用途', responseText);
                responseText.success ? this._key1(responseText.result, "moniesUse") : Toast.message(responseText.msg);
            }
        })
    }
    _currency (){
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "capitalkind";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('币种', responseText);
                responseText.success ? this._key1(responseText.result, "currency") : Toast.message(responseText.msg);
            }
        })
    }
    _key1 = (list,parameter) => {
        console.log(parameter+"list",list);
        let dataBlob = [];
        for(let i=1;i<list.length;i++){
            let item = {
                text: list[i].text,
                value: list[i].value,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
        console.log([parameter]+"---",dataBlob);
    }
    _savePerson=()=>{
        // slSmallloanProject.toUsedepartment	*	出款人  （可不传）
        // slSmallloanProject.appUserName		申请人
        // slSmallloanProject.appUserId		申请人id
        // slSmallloanProject.useMoneyType		用款方式     注 值为（现金，转账） 只有这两种类型
        // slSmallloanProject.projectMoney		金额小写   （可不传）
        // slSmallloanProject.moniesUse		款项用途    key值 : 'moniesUse'
        // slSmallloanProject.currency		币种        key值：capitalkind
        // slSmallloanProject.startDate		约定交货期或报账期
        // slSmallloanProject.projectId		项目id
        console.log("this.state",this.state);
        const {appUserId,appUserName,currencyValue,moniesUseValue,startDate,useMoneyTypeKey,} = this.state;
        let url = Config.baseApi + Config.processApi.saveProjectInfo +
            '?slSmallloanProject.appUserName='+appUserName+
            '&slSmallloanProject.appUserId='+appUserId+
            '&slSmallloanProject.useMoneyType='+useMoneyTypeKey+
            '&slSmallloanProject.moniesUse='+moniesUseValue+
            '&slSmallloanProject.currency='+currencyValue+
            '&slSmallloanProject.startDate='+startDate+
            '&slSmallloanProject.projectId='+this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS(){
        Toast.message("保存成功");
        Actions.pop({refresh:({isRefresh:true,date1: new Date()})});
    }
    render() {
        console.log("this.state",this.state);
        const {data,startDate,moniesUse,moniesUseValue,currency,currencyValue,useMoneyTypeKey,appUserName,payeeType} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    data={data}
                    data1={data.data.allData}
                    this1={this}
                    payeeType={payeeType}
                    startDate={startDate}
                    onChangeStartDate={(text) => {
                        this.setState({
                            startDate: text
                        })
                    }}
                    appUserName={appUserName}
                    onChangeAppUserName={(text) => {
                        this.setState({
                            appUserName: text
                        })
                    }}
                    moniesUse={moniesUse}
                    moniesUseValue={moniesUseValue}
                    onSelectedMoniesUse={(item, index) => {
                        this.setState({
                            moniesUseValue: item.value
                        })
                    }}
                    currency={currency}
                    currencyValue={currencyValue}
                    onSelectedCurrency={(item, index) => {
                        this.setState({
                            currencyValue: item.value
                        })
                    }}
                    useMoneyType={this.useMoneyType}
                    useMoneyTypeKey={useMoneyTypeKey}
                    onSelectedUseMoneyType={(item, index) => {
                        this.setState({
                            useMoneyTypeKey: item
                        })
                    }}
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
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }
})


