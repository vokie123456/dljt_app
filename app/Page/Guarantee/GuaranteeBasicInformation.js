/**
 * Created by Administrator on 2018\8\6 0006.
 */
/**
 * Created by duansailong on 2018/3/8.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
import DatePicker from 'react-native-datepicker';
//项目基本信息
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(220), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled ? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    marginRight: px2dp(38),
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                editable={props.disabled ? false : inputDisabled ? false : true}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DatePicker1 = (props) => {
    const {datePickerDisabled} =  props.props.data;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(220), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200,}}
                date={props.compensatoryDate}
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
                disabled={datePickerDisabled?true:false}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    const {selectDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(220), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                }}
                disabled={selectDisabled ? true : false}
                size='md'
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
const DefaultSelect1 = (props) => {
    const {selectDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text
                style={{width: px2dp(220), paddingRight: px2dp(25), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    marginRight: px2dp(0),
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.value}
                editable={selectDisabled ? false : true}
                placeholder={props.placeholder}
                onChangeText={props.onSelected}
            />

            <Select
                style={{
                    flex: 3, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                }}
                disabled={selectDisabled ? true : false}
                size='md'
                pickerType='popover'
                value={props.valueOne}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelectedOne ? props.onSelectedOne : () => console.log('没回调')}
            />
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                {props.businessSpecies == 11080 ?
                    <View>
                        <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                            <DefaultInput require placeholder={'请输入'} name={'贷款金额(元)'}
                                          valOne={isEmpty(props.projectMoney) ? props.projectMoney : props.projectMoney + ''}
                                          onChangeText={props.onChangeProjectMoney3} props={props}/>
                            <DefaultSelect require placeholder={'请选择'} name={'币种'}
                                           value={isEmpty(props.currency) ? props.currency : props.currency + ''}
                                           items={props.currencyItems} onSelected={props.onSelectedCurrency}
                                           props={props}/>
                            <DefaultInput require placeholder={'请输入'} name={'保证金比例(%)'}
                                          valOne={isEmpty(props.marginRatio) ? props.marginRatio : props.marginRatio + ''}
                                          onChangeText={props.onChangeMarginRatio} props={props}/>
                        </View>
                        <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                            <DefaultInput placeholder={'请输入'} name={'担保余额(元)'}
                                          valOne={isEmpty(props.balanceMoeny) ? props.balanceMoeny : props.balanceMoeny + ''}
                                          onChangeText={props.onChangeBalanceMoeny} props={props}/>
                            <DatePicker1 props={props} name={"代偿日期"} onChangeDate={props.onChangeCompensatoryDate}
                                         compensatoryDate={props.compensatoryDate}/>
                            <DefaultInput placeholder={'请输入'} name={'代偿金额(元)'}
                                          valOne={isEmpty(props.compensatoryMoney) ? props.compensatoryMoney : props.compensatoryMoney + ''}
                                          onChangeText={props.onChangeCompensatoryMoney} props={props}/>
                            <DefaultInput placeholder={'请输入'} name={'代偿余额(元)'}
                                          valOne={isEmpty(props.compensatoryBalance) ? props.compensatoryBalance : props.compensatoryBalance + ''}
                                          onChangeText={props.onChangeCompensatoryBalance} props={props}/>
                        </View>
                        <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                            <DefaultSelect1 require placeholder={'请输入'} name={'保证金额(元)'}
                                            value={isEmpty(props.earnestmoney) ? props.earnestmoney : props.earnestmoney + ''}
                                            valueOne={props.mineId}
                                            onSelected={props.onChangeearNestMoney}
                                            items={props.ourMainType} onSelectedOne={props.onSelectedMineId}
                                            props={props}/>
                            <DefaultSelect1 require placeholder={'请输入'} name={'担保费(%)'}
                                            value={isEmpty(props.yearAccrualRate) ? props.yearAccrualRate : props.yearAccrualRate + ''}
                                            valueOne={props.managementConsultingMineId}
                                            onSelectedOne={props.onSelectedManagementConsultingMineId}
                                            items={props.ourMainType} onSelected={props.onChangeYearAccrualRate3}
                                            props={props}/>
                            <DefaultSelect1 require placeholder={'请输入'} name={'服务费(%)'}
                                            value={isEmpty(props.yearManagementConsultingOfRate) ? props.yearManagementConsultingOfRate : props.yearManagementConsultingOfRate + ''}
                                            valueOne={props.financeServiceMineId}
                                            onSelectedOne={props.onSelectedFinanceServiceMineId}
                                            items={props.ourMainType}
                                            onSelected={props.onChangeYearManagementConsultingOfRate}
                                            props={props}/>
                            <DefaultSelect1 require border placeholder={'请输入'} name={'手续(%)'}
                                            value={isEmpty(props.yearFinanceServiceOfRate) ? props.yearFinanceServiceOfRate : props.yearFinanceServiceOfRate + ''}
                                            valueOne={props.otherExpensesTypeId}
                                            onSelectedOne={props.onSelectedOtherExpensesTypeId}
                                            items={props.ourMainType}
                                            onSelected={props.onChangeYearFinanceServiceOfRate}
                                            props={props}/>
                        </View>
                    </View> :
                    props.businessVarieties == 11082 ?
                        <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                            <DefaultInput require placeholder={'请输入'} name={'担保金额(元)'}
                                          valOne={isEmpty(props.projectMoney) ? props.projectMoney : props.projectMoney + ''}
                                          onChangeText={props.onChangeProjectMoney} props={props}/>
                            <DefaultInput disabled require placeholder={'请输入'} name={'担保费(元)'}
                                          valOne={isEmpty(props.earnestmoney) ? props.earnestmoney : props.earnestmoney + ''}
                                          onChangeText={props.onChangeearNestMoney} props={props}/>
                            <DefaultSelect1 require placeholder={'请输入'} name={'担保费(%)'}
                                            value={isEmpty(props.yearAccrualRate) ? props.yearAccrualRate : props.yearAccrualRate + ''}
                                            valueOne={props.managementConsultingMineId}
                                            onSelectedOne={props.onSelectedManagementConsultingMineId}
                                            items={props.ourMainType} onSelected={props.onChangeYearAccrualRate}
                                            props={props}/>
                        </View> :
                        <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                            <DefaultInput require placeholder={'请输入'} name={'项目标的(元)'}
                                          valOne={isEmpty(props.projectMoney) ? props.projectMoney : props.projectMoney + ''}
                                          onChangeText={props.onChangeProjectMoney2} props={props}/>
                            <DefaultInput require placeholder={'请输入'} name={'担保额(元)'}
                                          valOne={isEmpty(props.earnestmoney) ? props.earnestmoney : props.earnestmoney + ''}
                                          onChangeText={props.onChangeearNestMoney} props={props}/>
                            <DefaultInput require placeholder={'请输入'} name={'担保费(%)'}
                                          valOne={isEmpty(props.yearAccrualRate) ? props.yearAccrualRate : props.yearAccrualRate + ''}
                                          onChangeText={props.onChangeYearAccrualRate2} props={props}/>
                            <DefaultInput disabled require placeholder={'请输入'} name={'担保费(元)'}
                                          valOne={isEmpty(props.yearAccrualRateMoeny) ? props.yearAccrualRateMoeny : props.yearAccrualRateMoeny + ''}
                                          onChangeText={props.onChangeYearAccrualRateMoeny} props={props}/>
                            <DefaultInput require placeholder={'请输入'} name={'实际项目名称'}
                                          valOne={isEmpty(props.realProjectName) ? props.realProjectName : props.realProjectName + ''}
                                          onChangeText={props.onChangerealProjectName} props={props}/>
                            <DatePicker1 require props={props} name={"完工日期"} onChangeDate={props.onChangeacceptDate}
                                         compensatoryDate={props.acceptDate}/>
                        </View>
                }
            </KeyboardAwareScrollView>
            {props.data.selectDisabled ? <View/> :
                <SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250}
                             onPress={() => props.this1._saveProject()}/>}
        </ScrollView>
    )
}
export default class GuaranteeBasicInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("propsdata", props)
        // 初始状态
        this.state = {
            data: props,
            //借款利息收取单位
            earnestmoneyReceiving: '',
            guaranteeReceiving: '',
            serviceReceiving: '',
            poundageReceiving: '',
            //收款单位
            receivables: [],
            projectMoney: '',//贷款金额
            currency: '',//币种
            marginRatio: '',//保证金比例
            balanceMoeny: '',//担保余额
            compensatoryDate: '',//代偿日期
            compensatoryBalance: '',//代偿余额
            compensatoryMoney: '',//代偿金额
            earnestmoney: '',//保证金额
            yearAccrualRate: '',//担保费
            yearManagementConsultingOfRate: '',//服务费
            yearFinanceServiceOfRate: '',//手续
            businessSpecies: '',//业务种类
            businessVarieties: '',//业务品种
            yearAccrualRateMoeny: '',
            realProjectName: '',//实际项目名
            acceptDate: '',
        };
    }

    currencyType = [{text: '人民币', value: '449'}]

    componentDidMount() {
        this._receivables();//收款单位
        // 初始状态
        const {businessVarieties, realProjectName, acceptDate, yearAccrualRateMoeny, businessSpecies, poundageReceiving, serviceReceiving, guaranteeReceiving, earnestmoneyReceiving, projectMoney, currency, marginRatio, balanceMoeny, compensatoryDate, compensatoryMoney, compensatoryBalance, earnestmoney, yearAccrualRate, yearManagementConsultingOfRate, yearFinanceServiceOfRate} = this.props.data.allData.gLGuaranteeloanProject;
        if (!isEmpty(yearAccrualRateMoeny)) {
            this.setState({yearAccrualRateMoeny})
        }
        if (!isEmpty(acceptDate)) {
            this.setState({acceptDate})
        }
        if (!isEmpty(realProjectName)) {
            this.setState({realProjectName})
        }
        if (!isEmpty(businessVarieties)) {
            this.setState({businessVarieties})
        }
        if (!isEmpty(businessSpecies)) {
            this.setState({businessSpecies})
        }
        if (!isEmpty(poundageReceiving)) {
            this.setState({
                poundageReceiving
            })
        }
        if (!isEmpty(serviceReceiving)) {
            this.setState({
                serviceReceiving
            })
        }
        if (!isEmpty(guaranteeReceiving)) {
            this.setState({
                guaranteeReceiving
            })
        }
        if (!isEmpty(earnestmoneyReceiving)) {
            this.setState({
                earnestmoneyReceiving
            })
        }
        if (!isEmpty(yearFinanceServiceOfRate)) {
            this.setState({
                yearFinanceServiceOfRate
            })
        }
        if (!isEmpty(yearAccrualRate)) {
            this.setState({
                yearAccrualRate
            })
        }
        if (!isEmpty(yearManagementConsultingOfRate)) {
            this.setState({
                yearManagementConsultingOfRate
            })
        }
        if (!isEmpty(earnestmoney)) {
            this.setState({
                earnestmoney
            })
        }
        if (!isEmpty(compensatoryDate)) {
            this.setState({
                compensatoryDate
            })
        }
        if (!isEmpty(compensatoryMoney)) {
            this.setState({
                compensatoryMoney
            })
        }
        if (!isEmpty(compensatoryBalance)) {
            this.setState({
                compensatoryBalance
            })
        }
        if (!isEmpty(projectMoney)) {
            this.setState({
                projectMoney
            })
        }
        if (!isEmpty(currency)) {
            this.setState({
                currency
            })
        }
        if (!isEmpty(marginRatio)) {
            this.setState({
                marginRatio
            })
        }
        if (!isEmpty(balanceMoeny)) {
            this.setState({
                balanceMoeny
            })
        }
    }

    _receivables() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "earnestmoney_Receiving";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('收款单位', responseText);
                responseText.success ? this._key1(responseText.result, "receivables") : Toast.message(responseText.msg);
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if (nextProps.isRefresh) {
            this.setState({
                dialogAppUserKey: nextProps.key1,
                dialogAppUserValue: nextProps.key2,
            });
        }
    }

    //保存项目基本信息
    _saveProject() {
        const {businessSpecies, yearAccrualRateMoeny, acceptDate, realProjectName, businessVarieties, poundageReceiving, serviceReceiving, data, guaranteeReceiving, earnestmoneyReceiving, projectMoney, currency, marginRatio, balanceMoeny, receivables, compensatoryDate, compensatoryMoney, compensatoryBalance, earnestmoney, yearAccrualRate, yearManagementConsultingOfRate, yearFinanceServiceOfRate} = this.state;
        if (businessSpecies == 11080) {
            if (isEmpty(projectMoney)) {
                Toast.message("贷款金额不能为空");
                return;
            }
            if (isEmpty(currency)) {
                Toast.message("币种必选");
                return;
            }
            if (isEmpty(marginRatio)) {
                Toast.message("保证金比例不能为空");
                return;
            }
            if (isEmpty(earnestmoney)) {
                Toast.message("保证金额不能为空");
                return;
            }
            if (isEmpty(earnestmoneyReceiving)) {
                Toast.message("保证金额收款单位必选");
                return;
            }
            if (isEmpty(yearAccrualRate)) {
                Toast.message("担保费不能为空");
                return;
            }
            if (isEmpty(guaranteeReceiving)) {
                Toast.message("担保费收款单位必选");
                return;
            }
            if (isEmpty(yearManagementConsultingOfRate)) {
                Toast.message("服务费不能为空");
                return;
            }
            if (isEmpty(serviceReceiving)) {
                Toast.message("服务费收款单位必选");
                return;
            }
            if (isEmpty(yearFinanceServiceOfRate)) {
                Toast.message("手续费不能为空");
                return;
            }
            if (isEmpty(poundageReceiving)) {
                Toast.message("手续费收款单位必选");
                return;
            }
            let url = Config.baseApi + Config.twoApi.updateGLGuarantee +
                "?gLGuaranteeloanProject.projectId=" + this.props.data.data.vars[0].projectId +
                '&person.id=' + this.props.data.allData.person.id +
                '&enterprise.id=' + this.props.data.allData.enterprise.id +
                "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
                "&gLGuaranteeloanProject.productName=" + this.props.data.allData.gLGuaranteeloanProject.productName +
                '&gLGuaranteeloanProject.businessSpecies=' + businessSpecies +
                "&gLGuaranteeloanProject.businessVarieties=" + businessVarieties +
                '&businessTypeKey=' + this.props.data.allData.businessTypeKey +
                '&task_id' + this.props.data.data.taskId +
                '&projectMoney1=' + projectMoney +
                '&gLGuaranteeloanProject.projectMoney=' + projectMoney +
                '&gLGuaranteeloanProject.currency=' + currency +
                '&gLGuaranteeloanProject.marginRatio=' + marginRatio +
                '&gLGuaranteeloanProject.balanceMoeny=' + balanceMoeny +
                '&gLGuaranteeloanProject.compensatoryDate=' + compensatoryDate +
                '&gLGuaranteeloanProject.compensatoryMoney=' + compensatoryMoney +
                '&gLGuaranteeloanProject.compensatoryBalance=' + compensatoryBalance +
                '&gLGuaranteeloanProject.earnestmoney=' + earnestmoney +
                '&gLGuaranteeloanProject.earnestmoneyReceiving=' + earnestmoneyReceiving +
                '&gLGuaranteeloanProject.yearAccrualRate=' + yearAccrualRate +
                '&gLGuaranteeloanProject.guaranteeReceiving=' + guaranteeReceiving +
                '&gLGuaranteeloanProject.yearManagementConsultingOfRate=' + yearManagementConsultingOfRate +
                '&gLGuaranteeloanProject.serviceReceiving=' + serviceReceiving +
                '&gLGuaranteeloanProject.yearFinanceServiceOfRate=' + yearFinanceServiceOfRate +
                "&gLGuaranteeloanProject.poundageReceiving=" + poundageReceiving;
            this.getUrl(url);
        } else {
            if (businessVarieties == 11082) {
                if (isEmpty(projectMoney)) {
                    Toast.message("贷款金额不能为空");
                    return;
                }
                if (isEmpty(earnestmoney)) {
                    Toast.message("保证金额不能为空");
                    return;
                }
                if (isEmpty(yearAccrualRate)) {
                    Toast.message("担保费不能为空");
                    return;
                }
                if (isEmpty(guaranteeReceiving)) {
                    Toast.message("担保费收款单位必选");
                    return;
                }
                let url = Config.baseApi + Config.twoApi.updateGLGuarantee +
                    "?gLGuaranteeloanProject.projectId=" + this.props.data.data.vars[0].projectId +
                    '&person.id=' + this.props.data.allData.person.id +
                    '&enterprise.id=' + this.props.data.allData.enterprise.id +
                    "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
                    "&gLGuaranteeloanProject.productName=" + this.props.data.allData.gLGuaranteeloanProject.productName +
                    '&gLGuaranteeloanProject.businessSpecies=' + businessSpecies +
                    "&gLGuaranteeloanProject.businessVarieties=" + businessVarieties +
                    '&businessTypeKey=' + this.props.data.allData.businessTypeKey +
                    '&courtInformationSheet.projectId=' + this.props.data.allData.courtInformationSheet.projectId +
                    '&courtInformationSheet.id=' + this.props.data.allData.courtInformationSheet.id +
                    '&task_id' + this.props.data.data.taskId +
                    '&projectMoney1=' + projectMoney +
                    '&gLGuaranteeloanProject.projectMoney=' + projectMoney +
                    '&gLGuaranteeloanProject.earnestmoney=' + earnestmoney +
                    '&gLGuaranteeloanProject.yearAccrualRate=' + yearAccrualRate +
                    '&gLGuaranteeloanProject.guaranteeReceiving=' + guaranteeReceiving;
                this.getUrl(url);
            } else {
                if (isEmpty(projectMoney)) {
                    Toast.message("项目标的不能为空");
                    return;
                }
                if (isEmpty(earnestmoney)) {
                    Toast.message("担保额不能为空");
                    return;
                }
                if (isEmpty(yearAccrualRate)) {
                    Toast.message("担保费不能为空");
                    return;
                }
                if (isEmpty(yearAccrualRateMoeny)) {
                    Toast.message("担保费不能为空");
                    return;
                }
                if (isEmpty(realProjectName)) {
                    Toast.message("实际项目名称不能为空");
                    return;
                }
                if (isEmpty(acceptDate)) {
                    Toast.message("完工日期不能为空");
                    return;
                }
                let url = Config.baseApi + Config.twoApi.updateGLGuarantee +
                    "?gLGuaranteeloanProject.projectId=" + this.props.data.data.vars[0].projectId +
                    '&person.id=' + this.props.data.allData.person.id +
                    "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
                    '&enterprise.id=' + this.props.data.allData.enterprise.id +
                    "&gLGuaranteeloanProject.productName=" + this.props.data.allData.gLGuaranteeloanProject.productName +
                    '&gLGuaranteeloanProject.businessSpecies=' + businessSpecies +
                    "&gLGuaranteeloanProject.businessVarieties=" + businessVarieties +
                    '&businessTypeKey=' + this.props.data.allData.businessTypeKey +
                    '&task_id' + this.props.data.data.taskId +
                    '&projectMoney1=' + projectMoney +
                    '&gLGuaranteeloanProject.projectMoney=' + projectMoney +
                    '&gLGuaranteeloanProject.earnestmoney=' + earnestmoney +
                    '&earnestmoney1=' + earnestmoney +
                    '&gLGuaranteeloanProject.yearAccrualRate=' + yearAccrualRate +
                    '&gLGuaranteeloanProject.yearAccrualRateMoeny=' + yearAccrualRateMoeny +
                    '&gLGuaranteeloanProject.realProjectName=' + realProjectName +
                    '&gLGuaranteeloanProject.acceptDate=' + acceptDate +
                    '&gLGuaranteeloanProject.guaranteeReceiving=' + guaranteeReceiving;
                this.getUrl(url);
            }
        }
    }

    getUrl(url) {
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
                isRefresh: true,
                date1: new Date()
            })
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
    }

    render() {
        const {businessSpecies, realProjectName, acceptDate, yearAccrualRateMoeny, businessVarieties, poundageReceiving, serviceReceiving, data, guaranteeReceiving, earnestmoneyReceiving, projectMoney, currency, marginRatio, balanceMoeny, receivables, compensatoryDate, compensatoryMoney, compensatoryBalance, earnestmoney, yearAccrualRate, yearManagementConsultingOfRate, yearFinanceServiceOfRate} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    //手续
                    businessVarieties={businessVarieties}
                    businessSpecies={businessSpecies}
                    yearFinanceServiceOfRate={yearFinanceServiceOfRate}
                    onChangeYearFinanceServiceOfRate={(text) => {
                        this.setState({
                            yearFinanceServiceOfRate: text
                        })
                    }}
                    //服务费
                    yearManagementConsultingOfRate={yearManagementConsultingOfRate}
                    onChangeYearManagementConsultingOfRate={(text) => {
                        this.setState({
                            yearManagementConsultingOfRate: text
                        })
                    }}
                    //担保费
                    yearAccrualRate={yearAccrualRate}
                    onChangeYearAccrualRate={(text) => {
                        this.setState({
                            yearAccrualRate: text,
                            earnestmoney: projectMoney / text
                        })
                    }}

                    onChangeYearAccrualRate2={(text) => {
                        this.setState({
                            yearAccrualRate: text,
                            yearAccrualRateMoeny: projectMoney * text / 100
                        })
                    }}
                    onChangeYearAccrualRate3={(text) => {
                        this.setState({
                            yearAccrualRate: text,
                        })
                    }}
                    //担保费
                    yearAccrualRateMoeny={yearAccrualRateMoeny}
                    onChangeYearAccrualRateMoeny={(text) => {
                        this.setState({
                            yearAccrualRateMoeny: text,
                        })
                    }}
                    //保证金额
                    earnestmoney={earnestmoney}
                    onChangeearNestMoney={(text) => {
                        this.setState({
                            earnestmoney: text
                        })
                    }}
                    //代偿余额
                    compensatoryBalance={compensatoryBalance}
                    onChangeCompensatoryBalance={(text) => {
                        this.setState({
                            compensatoryBalance: text
                        })
                    }}
                    //代偿金额
                    compensatoryMoney={compensatoryMoney}
                    onChangeCompensatoryMoney={(text) => {
                        this.setState({
                            compensatoryMoney: text
                        })
                    }}
                    //实际项目名
                    realProjectName={realProjectName}
                    onChangerealProjectName={(text) => {
                        this.setState({
                            realProjectName: text
                        })
                    }}
                    //代偿日期
                    compensatoryDate={compensatoryDate}
                    onChangeCompensatoryDate={(text) => {
                        this.setState({
                            compensatoryDate: text
                        })
                    }}
                    acceptDate={acceptDate}
                    onChangeacceptDate={(text) => {
                        this.setState({
                            acceptDate: text
                        })
                    }}
                    //担保余额
                    balanceMoeny={balanceMoeny}
                    onChangeBalanceMoeny={(text) => {
                        this.setState({
                            balanceMoeny: text
                        })
                    }}
                    //贷款金额
                    projectMoney={projectMoney}
                    onChangeProjectMoney={(text) => {
                        this.setState({
                            projectMoney: text,
                            earnestmoney: text / yearAccrualRate
                        })
                    }}
                    onChangeProjectMoney2={(text) => {
                        this.setState({
                            projectMoney: text,
                            yearAccrualRateMoeny: text * yearAccrualRate / 100
                        })
                    }}
                    onChangeProjectMoney3={(text) => {
                        this.setState({
                            projectMoney: text,
                            earnestmoney: text * marginRatio / 100
                        })
                    }}
                    //保证金比例
                    marginRatio={marginRatio}
                    onChangeMarginRatio={(text) => {
                        this.setState({
                            marginRatio: text,
                            earnestmoney: text * projectMoney / 100
                        })
                    }}
                    //币种
                    currencyItems={this.currencyType}
                    currency={currency}
                    onSelectedCurrency={(item, index) => {
                        this.setState({
                            currency: item.value
                        })
                    }}

                    startDate={compensatoryDate}
                    onSelectedDateStatus={(text) => {
                        this.setState({
                            compensatoryDate: text
                        });
                    }}
                    //数据源
                    ourMainType={receivables}
                    mineId={earnestmoneyReceiving}
                    onSelectedMineId={(item, index) => {
                        this.setState({
                            earnestmoneyReceiving: item.value
                        })
                    }}
                    managementConsultingMineId={guaranteeReceiving}
                    onSelectedManagementConsultingMineId={(item, index) => {
                        this.setState({
                            guaranteeReceiving: item.value,
                        })
                    }}
                    financeServiceMineId={serviceReceiving}
                    onSelectedFinanceServiceMineId={(item, index) => {
                        this.setState({
                            serviceReceiving: item.value
                        })
                    }}
                    otherExpensesTypeId={poundageReceiving}
                    onSelectedOtherExpensesTypeId={(item, index) => {
                        this.setState({
                            poundageReceiving: item.value
                        })
                    }}
                    data={data}
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
    }, datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    },

})


