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
            <Text style={{width: px2dp(270), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
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

const DatePicker2 = (props) => {
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(270), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={props.props.followDateNext}
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
                    <DefaultInput  require  typeEditable placeholder={''} name={'跟进人'} valOne={props.personName}
                                  onChangeText={props.onChangePersonName}/>
                    <DefaultSelect require placeholder={'请选择跟进方式'} name={'跟进方式'} value={props.followTypeValue}
                                   items={props.followType} onSelected={props.onChangeFollowType}/>

                    <DatePicker1 require props={props} name={"跟进时间 : "} onChangeDate={props.onSelectedDateStatus}/>

                    <DefaultSelect placeholder={'请选择'} name={'跟进成功率'} value={props.successRateValue}
                                   items={props.successRate} onSelected={props.onChangeSuccessRate}/>
                    <DefaultSelect placeholder={'请选择'} name={'意向客户分级'} value={props.customerSystematicsValue}
                                   items={props.customerSystematics}
                                   onSelected={props.onChangeCustomerSystematics}/>
                    <DefaultInput placeholder={''} name={'跟进内容'} valOne={props.followInfo}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       onChangeText={props.onChangeFollowInfo}/>

                    <DatePicker2 require props={props} name={"下次跟进时间 : "} onChangeDate={props.onSelectedDateStatusNext}/>

                    <DefaultSelect require placeholder={'请选择跟进方式'} name={'跟进状态'} value={props.followStatusValue}
                                   items={props.followStatus} onSelected={props.onChangefollowStatus}/>

                </View>
            </KeyboardAwareScrollView>
            <SmallButton name="保存" style={{marginTop: px2dp(150)}} height={75} width={250}
                         onPress={() => props.this1._saveMessageFollow()}/>
        </ScrollView>
    )
}
export default class FollowUpClient extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
                               console.log('-----------------', props);
        this.state = {

            date: new Date(),
            data1: props,
            //跟进人
            personName: '',
            followPersonId: '',
            userIds:'',
            // 跟进方式
            followType: [],
            followTypeValue: '',
            // 跟进时间
            followDate: '',
            followDateNext: '',
            //跟进成功率
            successRate: [],
            successRateValue: '',
            //意向客户分级
            customerSystematics: [],
            customerSystematicsValue: '',
            //跟进内容
            followInfo: '',


            followStatus:[],
            followStatusValue:'',


        }

    }


    maritalStatusItems = ['已婚', '未婚'];

    componentDidMount() {
        this.setState({});
        this._followType();
        this._followUpStatus();
        this._successRate();
        this._customerSystematics();

        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("index页登录信息",ret);
            this.setState({
                userIds: ret.tokenStr.userIds,
                personName: ret.tokenStr.fullname,
            })
        }).catch(err => {
            console.warn(err.message);
        })
    }


    render() {
        const {data1,followStatusValue,followStatus,followDateNext,date,followPersonId, personName, followType, followTypeValue, followDate, customerSystematics,successRate,successRateValue, customerSystematicsValue,followInfo} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    date={date}
                    data1={data1}
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
                    //跟进方式
                    followStatusValue={followStatusValue}
                    followStatus={followStatus}
                    onChangefollowStatus={(item, index) => {
                        this.setState({followStatusValue: item.value})
                    }}

                    //跟进时间
                    followDate={followDate}
                    followDateNext={followDateNext}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            followDate: text,
                        })
                    }}
                    onSelectedDateStatusNext={(text) => {
                        this.setState({
                            followDateNext: text
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
    _followUpStatus() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "customer_followUpStatus";

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('跟进状态', responseText);
                responseText.success ? this._key1(responseText.result, "followStatus") : Toast.message(responseText.msg);
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
    //
    //
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

    // bpCustProspectiveFollowup.customerSystematics	936
    // bpCustProspectiveFollowup.followDate	2018-06-05 00:00:00
    // bpCustProspectiveFollowup.followInfo	bvfdcsxs
    // bpCustProspectiveFollowup.followPersonId	1
    // bpCustProspectiveFollowup.followTitle	母女你
    // bpCustProspectiveFollowup.followType	920
    // bpCustProspectiveFollowup.personType	0
    // bpCustProspectiveFollowup.successRate	924
    // bpCustProsperctive.nextFollowDate	2018-06-24 00:00:00
    // bpCustProsperctive.followUpType	934
    // bpCustProsperctive.area
    // bpCustProsperctive.areaId
    // bpCustProsperctive.companyId	1
    // bpCustProsperctive.createdate
    // bpCustProsperctive.createrId
    // bpCustProsperctive.customerChannel	829
    // bpCustProsperctive.customerName	87654
    // bpCustProsperctive.department	浙江电联集团有限公司
    // bpCustProsperctive.departmentId
    // bpCustProsperctive.email	11@163.com
    // bpCustProsperctive.perId	68
    // bpCustProsperctive.personType	0
    // bpCustProsperctive.postaddress	包包
    // bpCustProsperctive.postalcode
    // bpCustProsperctive.ProsperctiveType
    // bpCustProsperctive.sex
    // bpCustProsperctive.telephoneNumber	17600908760
    // followPersonId1	1
    //http://172.16.10.56:8042/erp_zj_dljt/api/saveBpCustProspectiveFollowup.do
    // ?bpCustProspectiveFollowup.customerSystematics=936
    // &bpCustProspectiveFollowup.followDate=2018-06-27
    // &bpCustProspectiveFollowup.followInfo=987654
    // &bpCustProspectiveFollowup.followPersonId=1
    // &bpCustProspectiveFollowup.followType=920
    // &bpCustProspectiveFollowup.personType=0
    // &bpCustProspectiveFollowup.successRate=925
    // &bpCustProsperctive.nextFollowDate=2018-06-30
    // &bpCustProsperctive.followUpType=933
    // &bpCustProsperctive.area=&bpCustProsperctive.areaId=
    // &bpCustProsperctive.companyId=1
    // &bpCustProsperctive.createdate=2018-06-26
    // &bpCustProsperctive.createrId=1
    // &bpCustProsperctive.customerChannel=
    // &bpCustProsperctive.customerName=123
    // &bpCustProsperctive.department=%E6%B5%99%E6%B1%9F%E7%94%B5%E8%81%94%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8
    // &bpCustProsperctive.departmentId=1
    // &bpCustProsperctive.email=&bpCustProsperctive.perId=68
    // &bpCustProsperctive.personType=0
    // &bpCustProsperctive.postaddress=&bpCustProsperctive.postalcode=
    // &bpCustProsperctive.sex=null
    // &bpCustProsperctive.telephoneNumber=1760090860
    // &followPersonId1=1
    _saveMessageFollow() {
        const {userIds,followStatusValue,followDateNext,personName,followPersonId,followTypeValue,followDate,successRateValue,customerSystematicsValue,followInfo} = this.state;
        const {area,areaId,perId,companyId,personType,postaddress,postalcode,createDate,sex,telephoneNumber,email,department,departmentId,creatorId,customerChannel,customerName} = this.state.data1.data.prodData;

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
        if (isEmpty(followDateNext)) {
            Toast.message("请选择下次跟进时间 ");
            return;
        }

        let url = Config.baseApi + Config.publicApi.saveBpCuSt +
            "?bpCustProspectiveFollowup.customerSystematics=" + customerSystematicsValue +
            "&bpCustProspectiveFollowup.followDate=" + followDate +
            '&bpCustProspectiveFollowup.followInfo=' + followInfo+
            '&bpCustProspectiveFollowup.followPersonId=' + userIds+
            "&bpCustProspectiveFollowup.followType=" + followTypeValue+
            "&bpCustProspectiveFollowup.personType=0" +
            "&bpCustProspectiveFollowup.successRate=" + successRateValue +
            "&bpCustProsperctive.nextFollowDate=" + followDateNext +
            "&bpCustProsperctive.followUpType=" + followStatusValue +
            "&bpCustProsperctive.area=" + area +
            "&bpCustProsperctive.areaId=" + areaId +
            "&bpCustProsperctive.companyId=" + companyId +
            "&bpCustProsperctive.createdate=" + createDate +
            "&bpCustProsperctive.createrId=" + creatorId +
            "&bpCustProsperctive.customerChannel=" + customerChannel +
            "&bpCustProsperctive.customerName=" + customerName +
            "&bpCustProsperctive.department=" + department +
            "&bpCustProsperctive.departmentId=" + departmentId +
            "&bpCustProsperctive.email=" + email +
            "&bpCustProsperctive.perId=" + perId +
            "&bpCustProsperctive.personType=" + personType +
            "&bpCustProsperctive.postaddress=" + postaddress +
            "&bpCustProsperctive.postalcode=" + postalcode +
            "&bpCustProsperctive.sex=" + sex +
            "&bpCustProsperctive.telephoneNumber=" + telephoneNumber +
            "&followPersonId1=1";

        console.log("----------", url);
        RTRequest.fetch1(url).then((responseText) => {
                if (responseText) {
                    console.log("----------", responseText);
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


