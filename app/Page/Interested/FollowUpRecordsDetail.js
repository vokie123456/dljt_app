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
                    backgroundColor:props.typeEditable? '#fffdcc':'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={props.typeEditable?false:true}
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
                date={props.props.followDate}
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
                    <DefaultInput require  typeEditable placeholder={'超管'} name={'跟进人'} valOne={props.personName}
                                  onChangeText={props.onChangePersonName} />
                    <DefaultSelect require placeholder={'请选择跟进方式'} name={'跟进方式'} value={props.followTypeValue}
                                   items={props.followType} onSelected={props.onChangeFollowType}/>
                    <DatePicker1 require props={props} name={"跟进时间 : "} onChangeDate={props.onSelectedDateStatus}/>
                    <DefaultSelect placeholder={'请选择'} name={'跟进成功率'} value={props.successRateValue}
                                   items={props.successRate} onSelected={props.onChangeSuccessRate}/>
                    <DefaultSelect placeholder={'请选择'} name={'意向客户分级'} value={props.customerSystematicsValue}
                                   items={props.customerSystematics}
                                   onSelected={props.onChangeCustomerSystematics}/>
                    <DefaultInput placeholder={'了解近期借款意向'} name={'跟进内容'} valOne={props.followInfo}
                                  onChangeText={props.onChangeFollowInfo}/>
                </View>
            </KeyboardAwareScrollView>
            <SmallButton name="保存" style={{marginTop: px2dp(150)}} height={75} width={250}
                         onPress={() => props.this1._saveMessageFollow()}/>
        </ScrollView>
    )
}
export default class FollowUpRecordsDetail extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            date: new Date(),
            data1: props.data,
            //跟进人
            personName: '',
            followPersonId: '',
            // 跟进方式
            followType: [],
            followTypeValue: '',
            // 跟进时间
            followDate: '',
            //跟进成功率
            successRate: [],
            successRateValue: '',
            //意向客户分级
            customerSystematics: [],
            customerSystematicsValue: '',
            //跟进内容
            followInfo: '',

        }

    }


    maritalStatusItems = ['已婚', '未婚'];

    componentDidMount() {
        this.setState({});
        this._editContent();
        this._followType();
        this._successRate();
        this._customerSystematics();
    }

    _editContent() {

        const {name, followType, followDate, successRate, followInfo, customerSystematics,followPersonId} = this.state.data1;
        const {createDate} = this.state.data1.bpCustProsperctive;

        if (!isEmpty(name)) {
            this.setState({
                personName: name
            })
        }  if (!isEmpty(followPersonId)) {
            this.setState({
                followPersonId: followPersonId
            })
        }
        //[[919,'电话跟进'],[920,'走访跟进'],[921,'邮件跟进'],[922,'短信跟进']]
        if (!isEmpty(followType)) {
            this.setState({
                followTypeValue: followType+''
            })
        }
        if (!isEmpty(createDate)) {
            this.setState({
                followDate: createDate
            })
        }
        //[[923,'10%'],[924,'20%'],[925,'30%'],[926,'40%'],[927,'50%'],[928,'60%'],[929,'70%'],[930,'80%'],[931,'90%'],[932,'100%']]
        if (!isEmpty(successRate)) {
            this.setState({
                successRateValue: successRate
            })
            //[[935,'优质客户'],[936,'一般客户'],[937,'未达标客户']]
        }
        if (!isEmpty(customerSystematics)) {
            this.setState({
                customerSystematicsValue: customerSystematics
            })
        }
        if (!isEmpty(followInfo)) {
            this.setState({
                followInfo: followInfo
            })
        }

    }

    render() {
        const {date,followPersonId, personName, followType, followTypeValue, followDate, customerSystematics,successRate,successRateValue, customerSystematicsValue,followInfo} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    date={date}
                    this1={this}
                    personName={personName}
                    followPersonId={followPersonId}
                    onChangePersonName={(text) => {
                        this.setState({
                            personName: text,
                        })
                    }}
                    //跟进方式
                    followType={followType}
                    followTypeValue={followTypeValue}
                    onChangeFollowType={(item, index) => {
                        this.setState({followTypeValue: item.value})
                    }}
                    //跟进时间
                    followDate={followDate}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            followDate: text
                        })
                    }}
                    //成功率
                    successRate={successRate}
                    successRateValue={successRateValue}
                    onChangeSuccessRate={(item, index) => {
                        this.setState({successRateValue: item.value})
                    }}
                    //客户分级
                    customerSystematics={customerSystematics}
                    customerSystematicsValue={customerSystematicsValue}
                    onChangeCustomerSystematics={(item, index) => {
                        this.setState({customerSystematicsValue: item.value})
                    }}
                    followInfo={followInfo}
                    onChangeFollowInfo={(text) => {
                        this.setState({
                            followInfo: text
                        })
                    }}

                />
            </View>
        );
    }

    _followType() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "comm_type";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('跟进方式', responseText);
                responseText.success ? this._key1(responseText.result, "followType") : Toast.message(responseText.msg);
            }
        })
    }

    _successRate() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "bpCustProspectiveFollowup_successRate";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('跟进成功率', responseText);
                responseText.success ? this._key1(responseText.result, "successRate") : Toast.message(responseText.msg);
            }
        })

    }
    _customerSystematics() {

        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "bpCustProspectiveFollowup_customerSystematics";

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户分级', responseText);
                responseText.success ? this._key1(responseText.result, "customerSystematics") : Toast.message(responseText.msg);
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
    };
    //    bpCustProspectiveFollowup.followId	    *	跟进id
    //    请求参数	bpCustProspectiveFollowup.personType:0	    *
    //    bpCustProspectiveFollowup.followPersonId:
    //    1	     	跟进人id
    //    bpCustProspectiveFollowup.followType:
    //    919		跟进方式
    //    bpCustProspectiveFollowup.followDate:
    //    2018/6/6 0:00		跟进时间
    //    bpCustProspectiveFollowup.successRate:
    //    924		跟进成功率
    //    bpCustProspectiveFollowup.customerSystematics:
    //    936		意向分级
    //    bpCustProspectiveFollowup.followTitle:
    //    我测试的更新		跟进标题
    //    bpCustProspectiveFollowup.followInfo:
    //    跟进内容		跟进内容
    //    bpCustProsperctive.nextFollowDate:
    //    2018/6/6 0:00		下次跟进时间 （有时分秒）
    // bpCustProsperctive.followUpType:
    //    934	   *	跟进状态
    _saveMessageFollow() {
        const {personName,followPersonId,followTypeValue,followDate,successRateValue,customerSystematicsValue,followInfo} = this.state;
        if (isEmpty(personName)) {
            Toast.message("请输入跟进人 ");
            return;
        }
        if (isEmpty(followTypeValue)) {
            Toast.message("请选择跟进方式 ");
            return;
        }
        if (isEmpty(followDate)) {
            Toast.message("请选择跟进时间 ");
            return;
        }
        let url = Config.baseApi + Config.publicApi.updateBpCuSt +
            "?bpCustProspectiveFollowup.followId=" +  this.state.data1.followId+
            "&bpCustProspectiveFollowup.personType=0" +
            "&bpCustProspectiveFollowup.perId=" +this.state.data1.perId+
            "&bpCustProspectiveFollowup.followPersonId=" + followPersonId +
            "&bpCustProspectiveFollowup.followType=" + followTypeValue+
            "&bpCustProspectiveFollowup.followDate=" + followDate +
            "&bpCustProspectiveFollowup.successRate=" + successRateValue +
            "&bpCustProspectiveFollowup.customerSystematics=" + customerSystematicsValue +
            '&bpCustProspectiveFollowup.followInfo=' + followInfo;
        RTRequest.fetch1(url).then((responseText) => {
                if (responseText) {
                    responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
                }
            }
        )
    }
    _SUCCESS() {
        Toast.message("保存成功");
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


