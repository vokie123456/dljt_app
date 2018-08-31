/**
 * Created by duansailong on 2018/3/9.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import Title2 from '../../Component/Title2';
import Icon from "react-native-vector-icons/Ionicons";
import SmallButton from '../../Component/SmallButton';
import {Input, Select, Overlay, Button} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker';
import Loading from '../../Component/Loading'
let {height, width} = Dimensions.get('window');
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data.data1;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled?'#fffdcc':'transparent',
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
                    backgroundColor: selectDisabled?'#fffdcc':(props.disabled?'#fffdcc':'transparent'),
                }}
                size='md'
                pickerType='popover'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                disabled={selectDisabled?true:(props.disabled?true:false)}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DatePicker1 = (props) => {
    const {datePickerDisabled} =  props.props.data.data1;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#ffffff'}}>*<Text
                  style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200,}}
                date={props.props.startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginRight: 50,
                    }
                    // ... You can check the source to find the other keys.
                }}
                disabled={datePickerDisabled}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    const {chooseDisabled} =  props.props.data.data1;
    return (
        <View style={{
            borderBottomWidth: props.border ? 0 : hair,marginRight: px2dp(36),
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={chooseDisabled?"":()=> props.disabled?Toast.message("请先选择所有权人类型"):Actions[props.action].call()}
                  style={{
                    backgroundColor: chooseDisabled? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0,
                    paddingTop: px2dp(8),
                    paddingBottom:px2dp(8),
                }}
            >{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    const that = props.this1;
    const {inputDisabled} = props.data.data1;
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>

                    <DefaultSelect require placeholder={'请选择'} name={'担保类型 : '}  disabled={that.props.type1==='see'?true:false}
                                   value={(isEmpty(props.collateralTypeValue) ? props.collateralTypeValue : props.collateralTypeValue + "")}
                                   items={props.collateralType} onSelected={props.onSelectedCollateralType}
                                   props={props}/>
                    <DefaultSelect require placeholder={'请选择'} name={'抵质押物类型 : '} disabled={that.props.type1==='see'?true:false}
                                   value={(isEmpty(props.collateralValue) ? props.collateralValue : props.collateralValue + "")}
                                   items={props.collateral} onSelected={props.onSelectedCollateral}
                                   props={props}/>

                    <DefaultSelect require placeholder={'请选择'} name={'所有人类型 : '}
                                   value={(isEmpty(props.syrlxValue) ? props.syrlxValue : props.syrlxValue + "")}
                                   items={props.syrlxType} onSelected={props.onSelectedSyrlxType}
                                   props={props}/>
                    <DefaultChoice name={'所有权人'} placeholder={'请选择'} valOne={props.customerEnterpriseName} props={props}
                                   disabled={isEmpty(props.syrlxValue)} action={isEmpty(props.syrlxValue) ? '' : (props.syrlxValue == 602 ? 'QueryEnterprise' : 'personCustomers')}/>
                    <DefaultInput require placeholder={'请输入'} name={'与债务人的关系 : '}
                                  onChangeText={props.onChangeRelation} valOne={props.relation} props={props}/>

                    <DefaultInput require placeholder={'请输入'} name={'评估价值（元） : '}
                                  onChangeText={props.onChangeFinalprice}
                                  valOne={(isEmpty(props.finalprice) ? props.finalprice : props.finalprice + '')}
                                  props={props}/>

                    <DefaultInput require placeholder={'请输入'} name={'公允价值（元） : '}
                                  onChangeText={props.onChangeFinalCertificationPrice}
                                  valOne={isEmpty(props.finalCertificationPrice) ? props.finalCertificationPrice : props.finalCertificationPrice + ''}
                                  props={props}/>


                    <DefaultInput placeholder={'请输入'} name={'市场价值（元）: '}
                                  onChangeText={props.onChangeValuationMechanism} valOne={props.valuationMechanism}
                                  props={props}/>

                    <DatePicker1 props={props} name={"评估时间 : "} onChangeDate={props.onSelectedDateStatus}/>

                    <DefaultInput placeholder={'请输入'} name={'备        注 : '}
                                  onChangeText={props.onSelectedMortgageRemarks} valOne={props.mortgageRemarks}
                                  props={props}/>
                </View>

            </KeyboardAwareScrollView>
            {inputDisabled?<View/>:<View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: px2dp(50),
            }}>
                <SmallButton name="保存" style={{flex: 1}} height={75} width={250}
                             onPress={() => props.this1._savePerson()}/>
            </View>}
        </ScrollView>
    )
}
// <DefaultInput require placeholder={'请输入'} name={'抵质押率（%）: '}
//               onChangeText={props.onChangeAssuremoneye}
              {/*valOne={(isEmpty(props.assuremoney) ? props.assuremoney : props.assuremoney + '')}*/}
              {/*props={props}/>*/}

export default class DZYMortgageViewDetail2 extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log('sssssssssss', props);
        if (props.type1 === 'see') {
            this.state = {
                visible: true,
                data:props,
                projid: props.data.projid,
                id: props.data.id,
                businessType: props.data.businessType,
                prodData: [],
                collateralType: [],//担保类型assuretypeid
                collateralTypeValue: null,
                collateralTypeKey: null,
                //抵质押物类型
                collateralValue: '',//mortgagenametypeid
                collateralKey: '',
                syrlx: [],
                syrlxValue: null,//所有人类型personType
                syrlxKey: null,
                valuationTime: '',//评估时间
                mortgageRemarks: '',//备注
                finalprice: '',//评估价值
                finalCertificationPrice: null,//公允价值
                assuremoney: '0',//抵质押率
                valuationMechanism: '',//市场价值
                customerEnterpriseName: '请选择',//所有权人
                customerEnterpriseNameid: null,
                relation: '',//与债务人的关系
            };
            this._seeInfo();
        } else if (props.type1 === 'add') {
            this.state = {
                visible: false,
                data:props,
                projid: props.allData.data.vars[0].projectId,
                id: '',
                businessType: props.allData.data.vars[0].businessType,
                prodData: [],
                collateralType: [],//担保类型assuretypeid
                collateralTypeValue: null,
                collateralTypeKey: null,
                //抵质押物类型
                collateralValue: '',//mortgagenametypeid
                collateralKey: '',
                syrlx: [],
                syrlxValue: null,//所有人类型personType
                syrlxKey: null,
                valuationTime: '',//评估时间
                mortgageRemarks: '',//备注
                finalprice: '',//评估价值
                finalCertificationPrice: null,//公允价值
                assuremoney: '0',//抵质押率
                valuationMechanism: '',//市场价值
                customerEnterpriseName: '请选择',//所有权人
                customerEnterpriseNameid: '',
                relation: '',//与债务人的关系
            };
        }
    }

    componentDidMount() {
        this._collateralType();
        this._syrlx();
    }

    //查看信息
    _seeInfo() {
        let url = Config.baseApi + Config.processApi.seeVehicle + this.state.id;//个人客户信息
        RTRequest.fetch1(url).then((responseText) => {
            console.log('获取抵押详情_______________------------------------', url);
            if (responseText) {
                console.log('获取抵押详情', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }

    _render = (list) => {
        const {assuretypeid,assureofname, typeid,mortgagepersontypeforvalue, assureofnameEnterOrPerson, relation, personTypeId, valuationMechanism, valuationTime, assuremoney, mortgageRemarks, finalprice, finalCertificationPrice}=list.vProcreditDictionary;
        this.setState({
            visible: false,
        })
        if (!isEmpty(assureofname)) {
            this.setState({customerEnterpriseNameid: assureofname});
        }
        if (!isEmpty(assuretypeid)) {
            this.setState({collateralTypeValue: assuretypeid});
        }
        if (!isEmpty(mortgagepersontypeforvalue)) {
            this.setState({collateralKey: mortgagepersontypeforvalue});
        }
        if (!isEmpty(typeid)) {
            this.setState({collateralValue: typeid});
        }
        if (!isEmpty(personTypeId)) {
            this.setState({syrlxValue: personTypeId + ''});
        }
        if (!isEmpty(valuationTime)) {
            this.setState({valuationTime})
        }
        if (!isEmpty(mortgageRemarks)) {
            this.setState({
                mortgageRemarks
            })
        }
        if (!isEmpty(finalprice)) {
            this.setState({
                finalprice
            })
        }
        if (!isEmpty(finalCertificationPrice)) {
            this.setState({
                finalCertificationPrice
            })
        }
        if (!isEmpty(assuremoney)) {
            this.setState({
                assuremoney
            })
        }
        if (!isEmpty(valuationMechanism)) {
            this.setState({
                valuationMechanism
            })
        }
        if (!isEmpty(assureofnameEnterOrPerson)) {
            this.setState({
                customerEnterpriseName: assureofnameEnterOrPerson
            })
        }
        if (!isEmpty(relation)) {
            this.setState({
                relation
            })
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.isRefresh || nextProps.isRefresh1){
            const {name1,id} = nextProps;
            if (this.state.syrlxValue == '602') {
                const {enterprisename, id} = nextProps.popData;
                this.setState({
                    customerEnterpriseNameid: id,
                    customerEnterpriseName: enterprisename
                });

            } else if (this.state.syrlxValue == '603') {
                this.setState({
                    customerEnterpriseName: name1,
                    customerEnterpriseNameid: id,
                });
            }
        }
    }

    _collateralType = () => {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "dblx";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('担保类型', responseText);
                responseText.success ? this._key1(responseText.result, "collateralType") : Toast.message(responseText.msg);
            }
        })
    }

    _syrlx() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "syrlx";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('所有人类型', responseText);
                responseText.success ? this._key1(responseText.result, "syrlx") : Toast.message(responseText.msg);
            }
        })
    }

    _key1 = (list, parameter) => {
        let dataBlob = [];
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
    }

    _getByIdPerson = () => {
        let url = Config.baseApi + Config.processApi.getByIdPerson + "?personId=" + this.state.id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._upDataPer(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    _upDataPer(state) {
        console.log('客户基本信息------------------', state);
        const {name, sex, marry, cardtype, cardnumber, cellphone, postaddress, birthday, nationality}=state;
        this.setState({
            visible: false,
            person: state
        })
    }

    _savePerson = () => {
        const {collateralTypeValue, projid, businessType, customerEnterpriseNameid, collateralKey, id, collateralValue, syrlxValue, valuationTime, mortgageRemarks, finalprice, finalCertificationPrice, assuremoney, valuationMechanism, customerEnterpriseName, relation} = this.state;
        if (isEmpty(collateralTypeValue)) {
            Toast.message("请选择担保类型");
            return;
        }
        if (isEmpty(collateralValue)) {
            Toast.message("抵质押物类型不能为空");
            return;
        }
        if (isEmpty(syrlxValue)) {
            Toast.message("所有人类型不能为空");
            return;
        }
        if (customerEnterpriseName === '请选择') {
            Toast.message("所有权人不能为空");
            return;
        }
        if (isEmpty(relation)) {
            Toast.message("与债务人的关系不能为空");
            return;
        }
        if (isEmpty(finalprice)) {
            Toast.message("评估价值不能为空");
            return;
        }
        if (isEmpty(finalCertificationPrice)) {
            Toast.message("公允价值不能为空");
            return;
        }
        if (isEmpty(assuremoney)) {
            Toast.message("抵质押率不能为空");
            return;
        }
        console.log('----------------------', customerEnterpriseNameid+'====='+collateralKey);
        let url = Config.baseApi + Config.processApi.addMortgageDY +
            '?procreditMortgage.projid=' + projid +
            '&procreditMortgage.id=' + id +
            '&procreditMortgage.businessType=' + businessType +
            '&procreditMortgageCar.a=' + '0' +
            '&procreditMortgageStockownership.a='+
            '&procreditMortgageMachineinfo.a='+
            '&procreditMortgageProduct.a='+
            '&procreditMortgageHouse.a='+
            '&procreditMortgageOfficebuilding.a='+
            '&procreditMortgageHouseground.a='+
            '&procreditMortgageBusiness.a='+
            '&procreditMortgageBusinessandlive.a='+
            '&procreditMortgageEducation.a='+
            '&procreditMortgageIndustry.a='+
            '&procreditMortgageDroit.a='+
            '&procreditMortgage.assuretypeid=' + collateralTypeValue +
            '&procreditMortgage.personType=' + syrlxValue +
            '&procreditMortgage.assuremoney=' + assuremoney +
            '&procreditMortgage.valuationTime=' + valuationTime +
            '&procreditMortgage.relation=' + relation +
            '&procreditMortgage.mortgageRemarks=' + mortgageRemarks +
            '&procreditMortgage.finalprice=' + finalprice +
            '&procreditMortgage.finalCertificationPrice=' + finalCertificationPrice +
            '&procreditMortgage.valuationMechanism=' + valuationMechanism +
            '&customerEnterpriseName=' + customerEnterpriseNameid +
            '&procreditMortgage.mortgagenametypeid=' + collateralValue+
            '&procreditMortgage.mortgagepersontypeforvalue=' + collateralKey;
        RTRequest.fetch1(url).then((responseText) => {
            console.log('保存信息', responseText);
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS = () => {
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }
    //{text: '股权', value: '2'},
    collateral = [{text: '车辆', value: '1'},  {text: '机器设备', value: '5'}, {
        text: '存货/商品',
        value: '6'
    }, {text: '无形权利', value: '14'}, {text: '住宅', value: '7'}, {text: '商铺写字楼', value: '8'}, {
        text: '住宅用地',
        value: '9'
    }, {text: '商业用地', value: '10'}, {text: '商住用地', value: '11'}, {text: '工业用地', value: '13'}, {
        text: '公寓',
        value: '15'
    }, {text: '联排别墅', value: '16'}, {text: '独栋别墅', value: '17'}];

    render() {
        const {finalprice,data, relation, collateralType, valuationMechanism, mortgageRemarks, valuationTime, finalCertificationPrice, assuremoney, collateralTypeValue, customerEnterpriseName, collateralTypeKey, collateralValue, collateralKey, syrlx, syrlxValue, syrlxKey} = this.state;
        return (
            <View style={styles.container}>
                <Title2 name={this.props.title} back toPop/>
                <FormInput
                    this1={this}
                    data={data}
                    customerEnterpriseName={customerEnterpriseName}
                    collateralType={collateralType}
                    collateralTypeValue={collateralTypeValue}
                    onSelectedCollateralType={(item, index) => {
                        this.setState({
                            collateralTypeValue: item.value,
                            collateralTypeKey: item.key
                        })
                    }}

                    collateral={this.collateral}
                    collateralValue={collateralValue}
                    onSelectedCollateral={(item, index) => {
                        this.setState({
                            collateralValue: item.value,
                            collateralKey: item.text
                        })
                    }}

                    syrlxType={syrlx}
                    syrlxValue={syrlxValue}
                    onSelectedSyrlxType={(item, index) => {
                        this.setState({
                            syrlxValue: item.value,
                            syrlxKey: item.key,
                            customerEnterpriseName: '请选择'
                        })
                    }}

                    relation={relation}
                    onChangeRelation={(text) => {
                        this.setState({
                            relation: text
                        })
                    }}
                    finalprice={finalprice}
                    onChangeFinalprice={(text) => {
                        this.setState({
                            finalprice: text
                        })
                    }}

                    finalCertificationPrice={finalCertificationPrice}
                    onChangeFinalCertificationPrice={(text) => {
                        this.setState({
                            finalCertificationPrice: text
                        })
                    }}
                    assuremoney={assuremoney}
                    onChangeAssuremoneye={(text) => {
                        this.setState({
                            assuremoney: text
                        })
                    }}
                    valuationMechanism={valuationMechanism}
                    onChangeValuationMechanism={(text) => {
                        this.setState({
                            valuationMechanism: text
                        })
                    }}
                    startDate={valuationTime}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            valuationTime: text
                        });
                    }}

                    mortgageRemarks={mortgageRemarks}
                    onSelectedMortgageRemarks={(text) => {
                        this.setState({
                            mortgageRemarks: text
                        });
                    }}
                />
                <Loading visible={this.state.visible}/>
            </View>

        )
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

    _SUCCESS() {

        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true})});

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "black",
        fontSize: 22
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }

})



