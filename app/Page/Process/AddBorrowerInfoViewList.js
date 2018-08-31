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
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
//项目基本信息
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data1.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
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
    console.log("DefaultSelect",props.value);
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
const DefaultChoice = (props) => {
    const {chooseDisabled} =  props.props.data1.data1;
    return  (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            {/*<Text onPress={()=>Actions[props.action].call()}*/}
            <Text onPress={
                chooseDisabled?"":()=>Actions[props.action]()
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
                    <DefaultSelect require placeholder={'请选择类型'} name={'类型'} value={(isEmpty(props.customerTypeValue)?null:props.customerTypeValue+"")}
                                   items={props.customerType} onSelected={props.onSelectedCustomerType} props={props}/>
                    <DefaultChoice name={'名称'} valOne={props.name} action="personCustomers" props={props}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNum} onChangeText={props.onChangeCardNum} props={props}/>
                    <DefaultInput require placeholder={'请输入地址'} name={'地址'}
                                  valOne={props.address} onChangeText={props.onChangeAddress} props={props}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入联系电话'} name={'联系电话'}
                                  valOne={props.telPhone} onChangeText={props.onChangeTelPhone} props={props}/>
                    <DefaultInput require placeholder={'请输入客户关系'} name={'与客户关系'}
                                  valOne={props.relation} onChangeText={props.onChangeRelation} props={props}/>
                    <DefaultInput keyboardType={"numeric"} placeholder={'请输入备注'} name={'备注'}
                                  valOne={props.remarks} onChangeText={props.onChangeRemarks} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data1.data1.inputDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._determineWhetherIsEmpty()} />}
        </ScrollView>
    )
}
export default class AddBorrowerInfoViewList extends Component {
    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props1",props)
        // 初始状态
        this.state = {
            data1: props,
            customerTypeValue: null,
            customerType: [
                {text: "个人",value: "1"},
                {text: "企业",value: "0"}
            ],
            name: "请选择",
            nameId: "",
            cardNum: "",//证件号码
            relation: "",//关系
            address: "",//地址
            telPhone: "",//电话
            remarks: "",//备注
            businessType: "SmallLoan",//贷款默认：SmallLoan
            operationType: "SmallLoanBusiness",//贷款默认：SmallLoanBusiness
        }

    }
    componentDidMount() {
        this.setState({})
        if(this.props.type1==="see"){
            this._setState1();
        }

    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps",nextProps)
        const {cardNumber,postAddress,cellphone,name1,id} = nextProps;
        if(nextProps.isRefresh1){
            if(!isEmpty(cardNumber)){
                this.setState({
                    cardNum: cardNumber
                });
            }
            if(!isEmpty(postAddress)){
                this.setState({
                    address: postAddress
                });
            }
            if(!isEmpty(cellphone)){
                this.setState({
                    telPhone: cellphone
                });
            }
            if(!isEmpty(name1)){
                this.setState({
                    name: name1
                });
            }
            if(!isEmpty(id)){
                this.setState({
                    nameId: id
                });
            }

        }
    }

    //非空判断
    _determineWhetherIsEmpty = () => {
        const {customerTypeValue, name, cardNum, relation, address, telPhone, remarks} = this.state;
        let mobileCodeReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (isEmpty(customerTypeValue)) {
            Toast.message('请选择类型');
            return;
        } else if (isEmpty(name)) {
            Toast.message('请选择联系人');
            return;
        } else if (isEmpty(cardNum)) {
            Toast.message('请输入证件号码');
            return;
        } else if (isEmpty(relation)) {
            Toast.message('请输入关系');
            return;
        } else if (isEmpty(address)) {
            Toast.message('请输入地址');
            return;
        } else if (isEmpty(telPhone)) {
            Toast.message('请输入电话号码');
            return;
        } else if (!mobileCodeReg.test(telPhone)) {
            Toast.message('请输入正确的手机号');
            return;
        // } else if (isEmpty(remarks)) {
        //     Toast.message('请输入备注');
        //     return;
        } else {
            // this.refs.modalSix.open()
            this._saveProject()
            return;
        }

    };
    _setState1() {
        const {address,customerId,cardNum,customerName,remarks,telPhone,type,relation,operationType,businessType} = this.props.data;
        if(!isEmpty(address)){
            this.setState({
                address
            });
        }
        if(!isEmpty(customerId)){
            this.setState({
                nameId:customerId
            });
        }
        if(!isEmpty(cardNum)){
            this.setState({
                cardNum
            });
        }
        if(!isEmpty(customerName)){
            this.setState({
                name: customerName
            });
        }
        if(!isEmpty(remarks)){
            this.setState({
                remarks
            });
        }
        if(!isEmpty(telPhone)){
            this.setState({
                telPhone
            });
        }
        if(!isEmpty(type)){
            this.setState({
                customerTypeValue: type
            });
        }
        if(!isEmpty(relation)){
            this.setState({
                relation
            });
        }
        if(!isEmpty(operationType)){
            this.setState({
                operationType
            });
        }
        if(!isEmpty(businessType)){
            this.setState({
                businessType
            });
        }
    }
    //保存共同借款人
    _saveProject (){
        console.log("this.state",this.state);
        console.log("projectId",this.props.allData.data.vars[0].projectId);
        const {nameId,cardNum,customerTypeValue,relation,address,telPhone,remarks,businessType,operationType} = this.state;
        let url = Config.baseApi + Config.processApi.saveBorrowerInfo+
            '?borrowerInfo.borrowerInfoId=' + (this.props.type1==="see"?this.props.data.borrowerInfoId:"") +
            '&borrowerInfo.projectId=' + this.props.allData.data.vars[0].projectId +
            '&borrowerInfo.type=' + customerTypeValue +
            '&borrowerInfo.customerId=' + nameId +
            '&borrowerInfo.cardNum=' + cardNum +
            '&borrowerInfo.relation=' + relation +
            '&borrowerInfo.address=' + address +
            '&borrowerInfo.telPhone=' + telPhone +
            '&borrowerInfo.remarks=' + remarks +
            '&borrowerInfo.businessType='+ businessType +
            '&borrowerInfo.operationType=' + operationType
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存共同借款人', responseText);
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
        const {data1,customerTypeValue,customerType,cardNum,relation,address,telPhone,remarks,businessType,name,operationType} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    this1={this}
                    data1={data1}
                    name={name}
                    cardNum={cardNum}
                    onChangeCardNum={(text) => {
                        this.setState({
                            cardNum: text
                        })
                    }}
                    relation={relation}
                    onChangeRelation={(text) => {
                        this.setState({
                            relation: text
                        })
                    }}
                    address={address}
                    onChangeAddress={(text) => {
                        this.setState({
                            address: text
                        })
                    }}
                    telPhone={telPhone}
                    onChangeTelPhone={(text) => {
                        this.setState({
                            telPhone: text
                        })
                    }}
                    remarks={remarks}
                    onChangeRemarks={(text) => {
                        this.setState({
                            remarks: text
                        })
                    }}
                    customerType={customerType}
                    customerTypeValue={customerTypeValue}
                    onSelectedCustomerType={(item, index) => {
                        this.setState({
                            customerTypeValue: item.value
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


