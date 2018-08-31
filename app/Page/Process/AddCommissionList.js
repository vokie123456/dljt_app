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
import Title1 from '../../Component/Title1';
import Title from '../../Component/Title';
import {Input, Select, SearchInput, Wheel} from 'teaset';
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
//项目基本信息
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled ? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
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
    console.log("DefaultSelect", props.value);
    const {selectDisabled} =  props.props.data.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                }}
                size='md'
                pickerType='popover'
                disabled={selectDisabled}
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
const DatePicker1 = (props) => {
    const {datePickerDisabled} =  props.props.data.data1;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={props.props.intentDate}
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
                    <DefaultSelect require placeholder={'请选择费用类型'} name={'费用类型'} value={(isEmpty(props.geTallValue)?null:props.geTallValue+"")}
                     items={props.geTall} onSelected={props.onSelectedGeTall} props={props}/>
                    <DefaultInput name={'费用标准'} placeholder={'请填写费用标准'} valOne={props.chargeStandard}
                                  onChangeText={props.onChangeChargeStandard} props={props}/>
                    <DatePicker1 name={"计划到账日"} onChangeDate={props.onChangeIntentDate} props={props}/>
                    <DefaultInput keyboardType={"numeric"} name={'计划收入金额'} placeholder={'单位（元）'}
                                  valOne={(isEmpty(props.incomeMoney) ? null : props.incomeMoney + "")}
                                  onChangeText={props.onChangeIncomeMoney} props={props}/>
                    <DefaultInput name={'备注'} placeholder={'请填写备注'} valOne={props.remark}
                                  onChangeText={props.onChangeRemark} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.data1.inputDisabled ? <View/> :
                <SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250}
                             onPress={() => props.this1._saveProject()}/>}
        </ScrollView>
    )
}
export default class AddCommissionList extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            businessType: "SmallLoan",
            intentDate: "",//计划到账日
            geTall: [],//费用类型
            geTallValue: null,//费用类型
            chargeStandard: "",//费用标准
            incomeMoney: '',//计划收入金额
            remark: '',//备注
            data: props,

            // expensesType: [{text: '手续费', value: '1'}, {text: '保证金', value: '2'}],

        }

    }

    componentDidMount() {
        this.setState({})
        this._geTall();//费用类型
        if (this.props.type1 === "see") {
            this._setState1();
        }
    }

    _setState1() {
        const {businessType, chargeStandard, incomeMoney, planChargeId, intentDate, remark} = this.props.data;
        if (!isEmpty(businessType)) {
            this.setState({
                businessType
            })
        }
        if (!isEmpty(chargeStandard)) {
            this.setState({
                chargeStandard
            })
        }
        if (!isEmpty(intentDate)) {
            this.setState({
                intentDate
            })
        }
        if (!isEmpty(incomeMoney)) {
            this.setState({
                incomeMoney
            })
        }
        if (!isEmpty(planChargeId)) {
            this.setState({
                geTallValue: planChargeId
            })
        }
        if (!isEmpty(remark)) {
            this.setState({
                remark
            })
        }
    }

    _geTall() {

        let url = Config.baseApi + Config.processApi.geTall + this.props.allData.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('费用类型', responseText);
                responseText.success ? this._key1(responseText.result) : Toast.message(responseText.msg);
            }
        })
    }

    _key1 = (list) => {
        let dataBlob = [];
        for (let i = 0; i < list.length; i++) {
            let item = {
                text: list[i].name,
                value: list[i].plansTochargeId + "",
            };
            dataBlob.push(item);
        }
        this.setState({
            geTall: dataBlob,
        });
        console.log("list", this.state.geTall)
    }
    // slActualToCharge.projectId	 *	项目Id
    // slActualToCharge.planChargeId	 *	费用类型Id (调用费用类型查询方法或得)
    // slActualToCharge.chargeStandard	 *	费用标准
    // slActualToCharge.intentDate	 *	计划到账日
    // slActualToCharge.incomeMoney	 *	计划收入金额
    // slActualToCharge.remark	 *	备注
    // slActualToCharge.businessType	 *	小贷默认 SmallLoan
    //保存项目基本信息

    _saveProject() {
        console.log("this.state", this.state);
        const {remark, incomeMoney, chargeStandard, intentDate, geTallValue, businessType} = this.state;

        if (isEmpty(geTallValue)) {
            Toast.message("请选择费用类型");
            return;
        }if (isEmpty(intentDate)) {
            Toast.message("请选择日期");
            return;
        }

        let url = Config.baseApi + Config.processApi.saveSlActualToCharge +//保存要传sourceId
            '?slActualToCharge.projectId=' + this.props.allData.data.vars[0].projectId +
            '&slActualToCharge.planChargeId=' + geTallValue +
            // '&slActualToCharge.actualChargeId='+(this.props.type1==="add"?null:this.props.data.actualChargeId)+
            '&slActualToCharge.chargeStandard=' + chargeStandard +
            '&slActualToCharge.intentDate=' + intentDate +
            '&slActualToCharge.incomeMoney=' + incomeMoney +
            '&slActualToCharge.remark=' + remark +
            '&slActualToCharge.businessType=' + businessType;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存项目基本信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message(responseText.msg);
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({
            refresh: ({
                isRefresh: true
            })
        })
    }

    render() {
        const {data, geTall, geTallValue, chargeStandard, intentDate, incomeMoney, remark, expensesType} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    this1={this}
                    data={data}
                    geTall={geTall}
                    geTallValue={geTallValue}

                    onSelectedGeTall={(item, index) => {
                        this.setState({
                            geTallValue: item.value
                        })
                    }}
                    intentDate={intentDate}
                    onChangeIntentDate={(text) => {
                        this.setState({
                            intentDate: text
                        })
                    }}
                    chargeStandard={chargeStandard}
                    onChangeChargeStandard={(text) => {
                        this.setState({
                            chargeStandard: text
                        })
                    }}
                    incomeMoney={incomeMoney}
                    onChangeIncomeMoney={(text) => {
                        this.setState({
                            incomeMoney: text
                        })
                    }}
                    remark={remark}
                    onChangeRemark={(text) => {
                        this.setState({
                            remark: text
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


