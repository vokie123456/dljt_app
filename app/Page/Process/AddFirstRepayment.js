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
    const {inputDisabled} =  props.props.data1.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
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
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    console.log("DefaultSelect",props.props.data1.data1);
    const {selectDisabled} =  props.props.data1.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled? '#fffdcc' : 'transparent',}}
                size='md'
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
    const {datePickerDisabled} =  props.props.data1.data1;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={props.props.fundsDate}
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
                    <DefaultSelect require placeholder={'请选择来源类型'} name={'来源类型'} value={isEmpty(props.repaymentSourceValue)?null:props.repaymentSourceValue+""}
                                   items={props.repaymentSource} onSelected={props.onSelectedRepaymentSource} props={props}/>
                    <DefaultInput require name={'资金规模(元)'} placeholder={'请填写资金规模'} valOne={props.funds+""} onChangeText={props.onChangeFunds} props={props} />
                    <DatePicker1 name={"资金到账时间"} onChangeDate={props.onChangeFundsDate} props={props} />
                    <DefaultInput require name={'备注'} placeholder={'请填写备注'} valOne={props.remark} onChangeText={props.onChangeRemark} props={props} />
                </View>
            </KeyboardAwareScrollView>
            {props.data1.data1.inputDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._saveProject()} />}
        </ScrollView>
    )
}
export default class AddFirstRepayment extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props------------",props)
        // 初始状态
        this.state = {
            data1: props,
            repaymentSource: [],//还款来源
            repaymentSourceValue: null,//还款来源
            funds: "",//资金规模
            fundsDate: "",//资金到账时间
            remark: "",//备注

        }

    }

    componentDidMount() {
        this.setState({})
        this._nodeKey();//查询还款来源类型
        if(this.props.type1==="see"){
            this._setState1();
        }

    }
    _setState1() {
        const {money,remarks,repaySourceDate,sourceId,typeName,typeId} = this.props.data;
        if(!isEmpty(money)){
            this.setState({
                funds: money
            })
        }
        if(!isEmpty(typeId)){
            this.setState({
                repaymentSourceValue: typeId
            })
        }
        if(!isEmpty(repaySourceDate)){
            this.setState({
                fundsDate: repaySourceDate
            })
        }
        if(!isEmpty(remarks)){
            this.setState({
                remark: remarks
            })
        }
    }
    _nodeKey() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "repaymentSource"
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('还款来源类型', responseText);
                responseText.success ? this._key1(responseText.result,"repaymentSource") : Toast.message(responseText.msg);
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
        console.log("下拉列表",this.state.repaymentSource)
    }
    //保存项目基本信息
    _saveProject (){
        console.log("this.state",this.state);
        const {repaymentSourceValue,funds,fundsDate,remark} = this.state;
        let url = Config.baseApi + Config.processApi.saveSlRepaymentSource+//保存要传sourceId
            "?slRepaymentSource.projId="+this.props.allData.data.vars[0].projectId+
            "&slRepaymentSource.sourceId="+(this.props.type1==="add"?null:this.props.data.sourceId)+
            "&slRepaymentSource.typeId="+repaymentSourceValue+
            "&slRepaymentSource.money="+funds+
            "&slRepaymentSource.repaySourceDate="+fundsDate+
            "&slRepaymentSource.remarks="+remark;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存项目基本信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message(responseText.msg);
            }
        })
    }
    _SUCCESS (){
        Toast.message("保存成功");
        Actions.pop({refresh:({
            isRefresh:true
        })})
    }
    render() {
        const {repaymentSource,repaymentSourceValue,fundsDate,data1,funds,remark} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    this1={this}
                    data1={data1}
                    funds={funds}
                    onChangeFunds={(text) => {
                        this.setState({
                            funds: text
                        })
                    }}
                    fundsDate={fundsDate}
                    onChangeFundsDate={(text) => {
                        this.setState({
                            fundsDate: text
                        })
                    }}
                    remark={remark}
                    onChangeRemark={(text) => {
                        this.setState({
                            remark: text
                        })
                    }}
                    repaymentSource={repaymentSource}
                    repaymentSourceValue={repaymentSourceValue}
                    onSelectedRepaymentSource={(item, index) => {
                        this.setState({
                            repaymentSourceValue: item.value
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


