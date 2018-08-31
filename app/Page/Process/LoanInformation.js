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
import {Input, Select, ListRow, Checkbox} from 'teaset';
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
//项目基本信息
const DefaultInput = (props) => {
    console.log("props.onBlurText-------",props.onBlurText)
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? 'default':'numeric'}
                style={{
                    backgroundColor: props.disabled?"#fffdcc":(inputDisabled? '#fffdcc' : 'transparent'),
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={!isEmpty(props.disabled)?false:(!inputDisabled)}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                onBlur ={isEmpty(props.onBlurText)?()=>{}:props.onBlurText}
            />
        </View>
    )
}
const DatePicker1 = (props) => {
    const {datePickerDisabled} =  props.props.data;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200,
                }}
                date={props.props.startDate}
                mode="date"
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                minDate="2018-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                disabled={datePickerDisabled}
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
const DefaultChecked = (props) => {//
    console.log("onBlurText",props.valOne)
    const {defaultChecked} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row',flex: 1, borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{flex: 1, color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <View style={{flex: 2, flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-between'}}
                  onPress={isEmpty(props.onBlurText)?"":props.onBlurText}>
                {
                    props.items.map((item, index) => {
                        return <Checkbox
                            size='md'
                            key={index}
                            title={item.text}
                            checked={(item.value===props.checkType?true:false)}
                            disabled={defaultChecked?true:(props.valOne==="isStartDatePayValue"?(props.this1.state.payAccrualTypeValue==="monthPay"?false:()=>props.this1._changeIsStartDatePayValue()):false)}
                            // disabled={(props.valOne==="isStartDatePayValue"?(props.this1.state.payAccrualTypeValue==="monthPay"?false:()=>props.this1._changeIsStartDatePayValue()):false)}
                            onChange={(value) => {
                                // props.onChanged(item.value,value);
                                (isEmpty(props.onBlurText)?"":props.onBlurText);
                                (props.valOne==="payAccrualTypeValue"?props.this1._changeIsStartDatePayValue():'');
                                props.this1.setState({
                                    [props.valOne]:item.value,
                                })
                            }}
                        />
                    })
                }
            </View>
        </View>
    )
}
const DefaultSelect1 = (props) => {
    const {selectDisabled,inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row',flex: 1, borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {props.isAll?<Input
                    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                    style={{
                        backgroundColor: inputDisabled? '#fffdcc' : 'transparent',
                        borderColor: 'transparent',
                        marginRight: px2dp(38),
                        textAlign: 'left',
                        flex: 1,
                        paddingLeft: 0
                    }}
                    editable={!inputDisabled}
                    value={props.valOne}
                    placeholder="请输入"
                    onChangeText={props.onChangeText}
                />:<View/>}
                <Select
                    style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                        backgroundColor: selectDisabled?'#fffdcc':(props.isAll?'transparent':(props.this1.state.isStartDatePayValue==="2"?'#fffdcc':'transparent'))
                        // backgroundColor: (props.isAll?'transparent':(props.this1.state.isStartDatePayValue==="2"?'#fffdcc':'transparent'))
                    }}
                    size='md'
                    value={props.value}
                    items={props.items}
                    disabled={selectDisabled?true:(props.isAll?false:(props.this1.state.isStartDatePayValue==="2"?true:false))}
                    // disabled={props.isAll?false:(props.this1.state.isStartDatePayValue==="2"?true:false)}
                    pickerType={props.popover? "popover" : ""}
                    placeholder={props.placeholder}
                    getItemValue={(item, index) => item.value}
                    getItemText={(item, index) => item.text}
                    pickerTitle={`请选择 ${props.name}`}
                    onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
                />
            </View>
        </View>
    )
}

const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(30),paddingRight: px2dp(30), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput require placeholder={'请填写本金总额'} name={'本金总额（元）'} valOne={props.projectMoney} onChangeText={props.onChangeProjectMoney} props={props}/>
                    <DefaultInput require placeholder={'请填写借款期数'} name={'借款期数（期）'} valOne={props.payIntentPeriod} onBlurText={props.onBlurText} onChangeText={props.onChangePayIntentPeriod} props={props}/>
                    <DatePicker1 props={props} name={"放款日期"} onChangeDate={props.onSelectedDateStatus}/>
                    <DefaultInput border require disabled placeholder={'自动计算'} name={'到期时间'} valOne={props.intentDate} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(30),paddingRight: px2dp(30), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultChecked name={'还款方式'} items={props.accrualType} this1={props.this1} checkType={props.accrualTypeValue} valOne={"accrualTypeValue"} checked={props.accrualTypeChecked} props={props}/>
                    <DefaultChecked name={'还款周期'} items={props.payAccrualType} onBlurText={props.onBlurText} this1={props.this1} checkType={props.payAccrualTypeValue} valOne={"payAccrualTypeValue"} checked={props.payAccrualTypeChecked} props={props}/>
                    <DefaultSelect1 require isAll popover placeholder={'请选择'} name={'借款利率（%）'} value={props.rateUnitValue} valOne={props.rateUnitValue1}
                                    items={props.rateUnit} onChangeText={props.onSelectedRateUnitValue1} onSelected={props.onSelectedRateUnitValue} props={props}/>
                    <DefaultSelect1 isAll popover placeholder={'请选择'} name={'服务费费用（%）'} value={props.rateUnitValue0} valOne={props.rateUnitValue00}
                                    items={props.rateUnit} onChangeText={props.onSelectedRateUnitValue00} onSelected={props.onSelectedRateUnitValue0} props={props}/>
                    <DefaultSelect1 isAll popover placeholder={'请选择'} name={'其他费用（%）'} value={props.rateUnitValue2} valOne={props.rateUnitValue22}
                                    items={props.rateUnit} onChangeText={props.onSelectedRateUnitValue22} onSelected={props.onSelectedRateUnitValue2} props={props}/>
                    <DefaultChecked border name={'还款选项'} items={props.isPrePosePayAccrualCheck} this1={props.this1} checkType={props.isPrePosePayAccrualCheckValue} valOne={"isPrePosePayAccrualCheckValue"} checked={props.isPrePosePayAccrualCheckChecked} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(30),paddingRight: px2dp(30), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultChecked name={'还款日设定'} items={props.isStartDatePay} this1={props.this1} checkType={props.isStartDatePayValue} valOne={"isStartDatePayValue"} checked={props.onSelectedIsStartDatePay} props={props} />
                    <DefaultSelect1 popover  this1={props.this1} placeholder={'请选择'} name={'固定日'} value={props.payIntentPerIoDateValue}
                                    items={props.payIntentPerIoDate} onSelected={props.onSelectedPayIntentPerIoDate} props={props}/>
                    <DefaultInput border require placeholder={'请填写违约金率'} name={'违约金利率（‱/）'} valOne={props.overdueRateLoan} onChangeText={props.onChangeOverdueRateLoan} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.inputDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._saveMessage()} />}
        </ScrollView>
    )
}
export default class LoanInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("slSmallloanProject",props.data.allData.slSmallloanProject)
        // 初始状态
        this.state = {
            data: props,
            startDate: "",//放款日期
            intentDate: "",//到期时间
            projectMoney: "",//本金
            payIntentPeriod: "",//借款期数
            overdueRateLoan: "",//违约金利率
            yearFinanceServiceOfRate: "",//其他费用（年）
            yearManagementConsultingOfRate: "",//服务费费用（年）
            //还款方式
            accrualTypeValue: "singleInterest",
            accrualTypeChecked: false,
            accrualType: [
                {text: "等额本金",value: "sameprincipal"},
                {text: "等额本息",value: "sameprincipalandInterest"},
                {text: "等本等息",value: "sameprincipalsameInterest"},
                {text: "按期收息,期末收本",value: "singleInterest"}
            ],
            //还款周期
            payAccrualTypeValue: "monthPay",
            payAccrualTypeChecked: false,
            payAccrualType: [
                {text: "日",value: "dayPay"},
                {text: "月",value: "monthPay"},
                {text: "季",value: "seasonPay"},
                {text: "半年",value: "halfYearPay"},
                {text: "年",value: "yearPay"}
            ],
            //还款选项
            isPrePosePayAccrualCheckValue: null,
            isPrePosePayAccrualCheckChecked: false,
            isPrePosePayAccrualCheck: [
                {text: "前置付息",value: "isPreposePayAccrual"},
                {text: "一次性付息",value: "isInterestByOneTime"},
                {text: "一次性付本",value: "isPrincipalByOneTime"},
            ],
            //借款利率
            rateUnitValue: null,
            rateUnitValue1: "",
            rateUnitValue0: null,
            rateUnitValue00: "",
            rateUnitValue2: null,
            rateUnitValue22: "",
            rateUnit: [
                {text:"日",value:"day"},
                {text:"月",value:"month"},
                {text:"年",value:"year"},
            ],
            //还款日设定
            isStartDatePayValue: "2",
            isStartDatePay: [
                {text:"对日还款",value:"2"},
                {text:"固定日",value:"1"},
            ],
            //还款固定日
            payIntentPerIoDate: [],
            payIntentPerIoDateValue: null,
        }

    }
    componentDidMount() {
        this._key1(31,"payIntentPerIoDate");//获得还款固定日
        this._seeInfo1();//借款基本信息
    }
    _seeInfo1() {
        // slSmallloanProject.projectId	 *	项目Id
        // slSmallloanProject.projectMoney	 *	本金总额
        // slSmallloanProject.payintentPeriod	 *	借款期数
        // slSmallloanProject.startDate	 *	放款日期
        // slSmallloanProject.intentDate	 *	到期时间
        // slSmallloanProject.accrualtype	 *	还款方式
        // slSmallloanProject.payaccrualType	 *	还款周期  dayPay:日monthPay:月seasonPay:季halfYearPay:半年yearPay:年
        // slSmallloanProject.rate	 *	贷款利率
        // slSmallloanProject.rateUnit	 *	贷款利率单位  day:日，month:月,year:年
        // slSmallloanProject.isPreposePayAccrualCheck	 *	还款选项       isPreposePayAccrual:前置付息 isInterestByOneTime:一次性付息 isPrincipalByOneTime:一次性付本
        // slSmallloanProject.isStartDatePay	 *	还款日设定  1 还款固定日2 按实际放款日对日还款
        // slSmallloanProject.payintentPerioDate		每期还款日固定在(isStartDatePay 当为1的时候 这个必填)
        // slSmallloanProject.overdueRateLoan	 *	违约金利率
        const {yearManagementConsultingOfRate,yearFinanceServiceOfRate,projectMoney,payintentPeriod,startDate,payintentPerioDate,overdueRateLoan,isStartDatePay,accrualtype,isPreposePayAccrual,isInterestByOneTime,isPrincipalByOneTime,yearAccrualRate,payaccrualType,intentDate} = this.props.data.allData.slSmallloanProject;
        if(!isEmpty(projectMoney)){
            this.setState({
                projectMoney:projectMoney+"",
            })
        }
        if(!isEmpty(payintentPeriod)){
            this.setState({
                payIntentPeriod:payintentPeriod+"",
            })
        }
        if(!isEmpty(startDate)){
            this.setState({
                startDate:startDate,
            })
        }
        if(!isEmpty(intentDate)){
            this.setState({
                intentDate:intentDate,
            })
        }
        if(!isEmpty(payintentPerioDate)){
            this.setState({
                payIntentPerIoDateValue:payintentPerioDate,
            })
        }
        if(!isEmpty(overdueRateLoan)){
            this.setState({
                overdueRateLoan:overdueRateLoan+"",
            })
        }
        if(!isEmpty(isStartDatePay)){
            this.setState({
                isStartDatePayValue:isStartDatePay+"",
            })
        }
        if(isPreposePayAccrual===1){//前置付息
            this.setState({
                isPrePosePayAccrualCheckValue:"isPreposePayAccrual",
            })
        }
        if(isPrincipalByOneTime===1){//一次性付息
            this.setState({
                isPrePosePayAccrualCheckValue:"isInterestByOneTime",
            })
        }
        if(isInterestByOneTime===1){//一次性付本
            this.setState({
                isPrePosePayAccrualCheckValue:"isPrincipalByOneTime",
            })
        }
        if(!isEmpty(yearAccrualRate)){
            this.setState({
                rateUnitValue:"year",
                rateUnitValue1:yearAccrualRate+"",
            })
        }
        if(!isEmpty(yearManagementConsultingOfRate)){
            this.setState({
                rateUnitValue0:"year",
                rateUnitValue00:yearManagementConsultingOfRate+"",
            })
        }
        if(!isEmpty(yearFinanceServiceOfRate)){
            this.setState({
                rateUnitValue2:"year",
                rateUnitValue22:yearFinanceServiceOfRate+"",
            })
        }
        if(!isEmpty(accrualtype)){
            this.setState({
                accrualTypeValue:accrualtype,
            })
        }
        if(!isEmpty(payaccrualType)){
            this.setState({
                payAccrualTypeValue:payaccrualType,
            })
        }
        console.log("thisstate",this.state)
    }
    _key1 = (list,parameter) => {
        console.log(parameter+"list",list);
        let dataBlob = [];
        for(let i=1;i<list;i++){
            let item = {
                text: "每月"+i+"日还款",
                value: i,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
        console.log([parameter]+"---",dataBlob);
    }
    _changeIsStartDatePayValue() {
        this.setState({
            isStartDatePayValue: "2",
            payIntentPerIoDateValue: null
        })
        return true;
    }
    _getIntentDate() {//获得到期日期
        // payaccrualType: dayPay ;dayOfEveryPeriod: ;payintentPeriod: 10 ;startDate: 2018-05-11T00:00:00;
        const {payAccrualTypeValue,payIntentPeriod,startDate} = this.state;
        if(isEmpty(payIntentPeriod)){
            return;
        }
        if(isEmpty(startDate)){
            return;
        }
        if(isEmpty(payAccrualTypeValue)){
            return;
        }
        let url = Config.baseApi + Config.publicApi.getIntentDate + "?payaccrualType="+payAccrualTypeValue+"&payintentPeriod="+payIntentPeriod+"&startDate="+startDate+"";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获得到期日期', responseText);
                responseText.success ? this._upDataDate(responseText.intentDate,responseText.allDays) : Toast.message(responseText.msg);
            }
        })
    }
    _upDataDate(intentDate, allDays) {
        console.log('到期日', intentDate+"--"+allDays);
        this.setState({
            intentDate: intentDate
        })
    }
    _saveMessage() {
        console.log("基本信息保存参数",this.state)
        const {rateUnitValue1,rateUnitValue,rateUnitValue0,rateUnitValue00,rateUnitValue2,rateUnitValue22,overdueRateLoan,payIntentPeriod,projectMoney,accrualTypeValue,startDate,intentDate,
            payAccrualTypeValue,isPrePosePayAccrualCheckValue,isStartDatePayValue,payIntentPerIoDateValue} = this.state;
        if(!Tool.isMoney(projectMoney)){
            this.setState({
                projectMoney: ""
            })
            return;
        }
        if(!Tool.isMoney(payIntentPeriod,"请重新输入借款期数")){
            this.setState({
                payIntentPeriod: ""
            })
            return;
        }
        if(isEmpty(startDate)){
            Toast.message("请选择放款日期!");
            return;
        }
        if(!Tool.isMoney(overdueRateLoan,"请重新输入违约金利率")){
            this.setState({
                overdueRateLoan: ""
            })
            return;
        }
        let url = Config.baseApi + Config.processApi.saveBaseMsg +
            '?slSmallloanProject.projectId='	+this.props.data.data.vars[0].projectId+ //	项目Id
            '&slSmallloanProject.projectMoney=' +projectMoney+	 //	本金总额
            '&slSmallloanProject.payintentPeriod=' +payIntentPeriod+	 //	借款期数
            '&slSmallloanProject.startDate='	+startDate+ //	放款日期
            '&slSmallloanProject.intentDate=' +intentDate+	 //	到期时间
            '&slSmallloanProject.accrualtype=' +accrualTypeValue+	 //	还款方式
            '&slSmallloanProject.payaccrualType=' +payAccrualTypeValue+	 //	还款周期  dayPay:日monthPay:月seasonPay:季halfYearPay:半年yearPay:年
            '&slSmallloanProject.rate=' +rateUnitValue1+	 //	贷款利率
            '&slSmallloanProject.rateUnit=' +rateUnitValue+	 //	贷款利率单位  day:日，month:月,year:年
            '&slSmallloanProject.rate1=' +rateUnitValue00+	 //	服务费费用
            '&slSmallloanProject.rateUnit1=' +rateUnitValue0+	 //	服务费费用利率单位  day:日，month:月,year:年
            '&slSmallloanProject.rate2=' +rateUnitValue22+	 //	其他费用
            '&slSmallloanProject.rateUnit2=' +rateUnitValue2+	 //	其他费用利率单位  day:日，month:月,year:年
            // '&slSmallloanProject.isPreposePayAccrualCheck=' +isPrePosePayAccrualCheckValue+	 //	还款选项       isPreposePayAccrual:前置付息 isInterestByOneTime:一次性付息 isPrincipalByOneTime:一次性付本
            '&slSmallloanProject.isPreposePayAccrual=' +(isPrePosePayAccrualCheckValue==="isPreposePayAccrual"?1:0)+	 //	还款选项       isPreposePayAccrual:前置付息 isInterestByOneTime:一次性付息 isPrincipalByOneTime:一次性付本
            '&slSmallloanProject.isInterestByOneTime=' +(isPrePosePayAccrualCheckValue==="isInterestByOneTime"?1:0)+	 //	还款选项       isPreposePayAccrual:前置付息 isInterestByOneTime:一次性付息 isPrincipalByOneTime:一次性付本
            '&slSmallloanProject.isPrincipalByOneTime=' +(isPrePosePayAccrualCheckValue==="isPrincipalByOneTime"?1:0)+	 //	还款选项       isPreposePayAccrual:前置付息 isInterestByOneTime:一次性付息 isPrincipalByOneTime:一次性付本
            '&slSmallloanProject.isStartDatePay=' +isStartDatePayValue+	 //	还款日设定  1 还款固定日2 按实际放款日对日还款
            '&slSmallloanProject.payintentPerioDate=' +payIntentPerIoDateValue+		//每期还款日固定在(isStartDatePay 当为1的时候 这个必填)
            '&slSmallloanProject.overdueRateLoan=' +overdueRateLoan;	 //	违约金利率
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }
    _SUCCESS(){
        Toast.message("保存成功");
        Actions.pop({refresh:({isRefresh:true,date1: new Date()})});
    }
    render() {
        const {data,rateUnitValue1,rateUnitValue,rateUnitValue0,rateUnitValue00,rateUnitValue2,rateUnitValue22,rateUnit,overdueRateLoan,payIntentPeriod,projectMoney,accrualTypeValue,startDate,intentDate,
            accrualType,accrualTypeChecked,payAccrualTypeValue,payAccrualType,payAccrualTypeChecked,isPrePosePayAccrualCheckValue,
            isPrePosePayAccrualCheck,yearFinanceServiceOfRate,yearManagementConsultingOfRate,isPrePosePayAccrualCheckChecked,isStartDatePay,isStartDatePayValue,payIntentPerIoDate,payIntentPerIoDateValue} = this.state;
        console.log("this.state",this.state)
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    onBlurText={()=>{
                        this._getIntentDate()
                    }}
                    data={data}
                    startDate={startDate}
                    intentDate={intentDate}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            startDate: text
                        });
                        this._getIntentDate();
                    }}
                    //本金总额
                    projectMoney={projectMoney}
                    onChangeProjectMoney={(text) => {
                        this.setState({
                            projectMoney: text
                        })
                    }}
                    //借款周期
                    payIntentPeriod={payIntentPeriod}
                    onChangePayIntentPeriod={(text) => {
                        this.setState({
                            payIntentPeriod: text
                        })
                    }}
                    //违约金利率
                    overdueRateLoan={overdueRateLoan}
                    onChangeOverdueRateLoan={(text) => {
                        this.setState({
                            overdueRateLoan: text
                        })
                    }}
                    rateUnit={rateUnit}//借款利率数组
                    rateUnitValue={rateUnitValue}//借款利率值
                    onSelectedRateUnitValue={(item, index) => {
                        this.setState({
                            rateUnitValue: item.value
                        })
                    }}
                    rateUnitValue1={rateUnitValue1}//借款利率值
                    onSelectedRateUnitValue1={(text) => {
                        this.setState({
                            rateUnitValue1: text
                        })
                    }}
                    rateUnitValue0={rateUnitValue0}//借款利率值
                    onSelectedRateUnitValue0={(item, index) => {
                        this.setState({
                            rateUnitValue0: item.value
                        })
                    }}
                    rateUnitValue00={rateUnitValue00}//借款利率值
                    onSelectedRateUnitValue00={(text) => {
                        this.setState({
                            rateUnitValue00: text
                        })
                    }}
                    rateUnitValue2={rateUnitValue2}//借款利率值
                    onSelectedRateUnitValue2={(item, index) => {
                        this.setState({
                            rateUnitValue2: item.value
                        })
                    }}
                    rateUnitValue22={rateUnitValue22}//借款利率值
                    onSelectedRateUnitValue22={(text) => {
                        this.setState({
                            rateUnitValue22: text
                        })
                    }}
                    isStartDatePay={isStartDatePay}//还款日设定
                    isStartDatePayValue={isStartDatePayValue}//还款日设定
                    onSelectedIsStartDatePay={(text) => {
                        this.setState({
                            isStartDatePayValue: text
                        })
                    }}
                    payIntentPerIoDate={payIntentPerIoDate}//固定日
                    payIntentPerIoDateValue={payIntentPerIoDateValue}//固定日
                    onSelectedPayIntentPerIoDate={(item, index) => {
                        this.setState({
                            payIntentPerIoDateValue: item.value
                        })
                    }}
                    this1={this}
                    //还款方式
                    accrualType={accrualType}//数组
                    accrualTypeValue={accrualTypeValue}//参数值
                    accrualTypeChecked={accrualTypeChecked}//是否选中
                    //还款周期
                    payAccrualType={payAccrualType}//数组
                    payAccrualTypeValue={payAccrualTypeValue}//参数值
                    payAccrualTypeChecked={payAccrualTypeChecked}//是否选中
                    //还款选项
                    isPrePosePayAccrualCheck={isPrePosePayAccrualCheck}//数组
                    isPrePosePayAccrualCheckValue={isPrePosePayAccrualCheckValue}//参数值
                    isPrePosePayAccrualCheckChecked={isPrePosePayAccrualCheckChecked}//是否选中
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


