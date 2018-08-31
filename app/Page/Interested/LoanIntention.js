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
import SmallButton from '../../Component/SmallButton';
//项目基本信息
const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(270), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const DatePicker1 = (props) => {

    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(270), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>

            <DatePicker
                style={{width: 200}}
                date={props.interestTime}
                mode="date"
                // disabled={datePickerDisabled}
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
const DefaultSelect = (props) => {
    console.log("DefaultSelect", props.value);
    // const {selectDisabled} = props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(270), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    // backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                }}
                size='md'
                // disabled={selectDisabled}
                pickerType='popover'
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


const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput keyboardType={"numeric"} placeholder={'请填写意向金额'} name={'意向金额（元）'} valOne={props.interestAmount + ''}
                                  onChangeText={props.onChangeInterestAmount}/>
                    <DatePicker1 props={props} interestTime={props.interestTime} name={"放款日期"}
                                 onChangeDate={props.onSelectedDateStatus}/>

                    <DefaultInput  keyboardType={"numeric"} placeholder={''} name={'拟用款期限（月）'} valOne={props.interestLimit + ''}
                                  onChangeText={props.onChangeInterestLimit}/>
                    <DefaultSelect placeholder={'请选择借款方式'} name={'借款方式'} value={props.loanTypeValue}
                                   items={props.loanType} onSelected={props.onChangeInterestBorrowing}/>
                    <DefaultInput placeholder={''} name={'备注（选填）'} valOne={props.interestRemarks + ''}
                                  onChangeText={props.onChangeInterestRemarks}/>
                </View>
            </KeyboardAwareScrollView>
            <SmallButton name="保存" style={{marginTop: px2dp(150)}} height={75} width={250}
                         onPress={() => props.this1._saveMessagePerson()}/>
        </ScrollView>
    )
};
export default class LoanIntention extends Component {


    // 构造
    constructor(props) {
        super(props);

        console.log("-------1-----1", props);
        // 初始状态
        this.state = {
            data1: props,
            date: new Date(),
            //意向金额
            interestAmount: '',
            perId: '',
            //拟用款时间
            interestTime: '',
            //拟用款期限
            interestLimit: '',
            //备注
            interestRemarks: '',
            //借款方式
            loanType: [],
            loanTypeValue: null,


        }

    }

    componentDidMount() {

        this.setState({});
        //借款方式
        this._loanType();


        if (this.props.type1 === "add") {
            this.addText();
        } else {
            //初始化
            this.editContent();
        }
    }

    addText() {

    }

    editContent() {

        const {loanMoney, loanDate, loanPeriod, remark, loanType} = this.state.data1.data.prodData;

        if (!isEmpty(loanMoney)) {
            this.setState({
                interestAmount: loanMoney
            })
        }
        if (!isEmpty(loanDate)) {
            this.setState({
                interestTime: loanDate
            })
        }
        if (!isEmpty(loanPeriod)) {
            this.setState({
                interestLimit: loanPeriod
            })
        }

        if (!isEmpty(remark)) {
            this.setState({
                interestRemarks: remark
            })
        }
        if (!isEmpty(loanType)) {
            this.setState({//[[954,'按期付息到期还本'],[955,'一次性还本付息'],[956,'等额本金'],[957,'等额本息']]
                loanTypeValue: loanType === 954 ? '按期付息到期还本' : loanType === 955 ? '一次性还本付息' : loanType === 956 ? '等额本金' : '等额本息',
            })
        }
    }

    render() {

        const {interestAmount, interestTime, loanType, interestLimit, loanTypeValue, interestRemarks, data1} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    this1={this}
                    data1={data1}
                    //意向金额
                    interestAmount={interestAmount}
                    onChangeInterestAmount={(text) => {
                        this.setState({
                            interestAmount: text
                        })
                    }}

                    //拟用款时间
                    interestTime={interestTime}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            interestTime: text
                        })
                    }}
                    //拟用款期限
                    interestLimit={interestLimit}
                    onChangeInterestLimit={(text) => {
                        this.setState({
                            interestLimit: text
                        })
                    }}
                    //借款方式
                    loanType={loanType}
                    loanTypeValue={loanTypeValue}
                    onChangeInterestBorrowing={(item, index) => {
                        this.setState({loanTypeValue: item.value})
                    }}
                    //备注
                    interestRemarks={interestRemarks}
                    onChangeInterestRemarks={(text) => {
                        this.setState({
                            interestRemarks: text
                        })
                    }}
                />
            </View>
        );
    }

    _loanType() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "loan_type";

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('借款方式', responseText);
                responseText.success ? this._key1(responseText.result, "loanType") : Toast.message(responseText.msg);
            }
        })

    }

    _key1 = (list, parameter) => {
        console.log(parameter + "list", list);
        let dataBlob = [];
        for (let i = 1; i < list.length; i++) {
            let item = {
                text: list[i].text,
                value: list[i].value,
            }
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
        console.log([parameter] + "---", dataBlob);
    }

    // bpCustProsperctive.perId:
    // bpCustProsperctive.personType:0
    // bpCustProsperctive.customerType:2
    // bpCustProsperctive.customerName:林龙
    // bpCustProsperctive.telephoneNumber:13232232323
    // bpCustProsperctive.customerChannel:829
    // bpCustProsperctive.area:中国_北京市_东城区
    // bpCustProsperctive.loanMoney:3000
    // bpCustProsperctive.loanDate:2018-06-06
    // bpCustProsperctive.loanPeriod:245678
    // bpCustProsperctive.loanType:954
    // bpCustProsperctive.remark:备注说明

    _saveMessagePerson() {
        const {interestAmount, interestTime, interestLimit, loanTypeValue, interestRemarks, perId} = this.state;
        let perIdText = isEmpty(this.props.perId1) ? this.state.data1.data.prodData.perId : this.props.perId1;
        console.log(this.state.data1.data.prodData.perId + "list");
        console.log(this.props.perId + "list1");
        if (isEmpty(interestTime)) {
            Toast.message("请选择放款日期 ");
            return;
        }
        debugger;
        let url = Config.baseApi + Config.publicApi.saveInterestedBuyers +
            "?bpCustProsperctive.perId=" + perIdText +
            "&bpCustProsperctive.personType=0" +
            "&bpCustProsperctive.customerType=" + this.props.personType+
            "&bpCustProsperctive.customerName=" + this.props.customerName +
            "&bpCustProsperctive.telephoneNumber=" + this.props.telephoneNumber +
            "&bpCustProsperctive.customerChannel=" + this.props.customerChannel +

            "&bpCustProsperctive.loanMoney=" + interestAmount +
            '&bpCustProsperctive.loanDate=' + interestTime +
            '&bpCustProsperctive.loanPeriod=' + interestLimit +
            '&bpCustProsperctive.loanType=' + loanTypeValue +
            '&bpCustProsperctive.remark=' + interestRemarks;

        RTRequest.fetch1(url).then((responseText) => {
                if (responseText) {
                    responseText.success ? this._SUCCESS(url) : Toast.message("登录超时，请重新登录!");
                }
            }
        )
    }

    _SUCCESS(url) {
        Toast.message("保存成功");
        console.log("------------list1----"+url);
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }

})


