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
//项目基本信息
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
		<View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
			<Text style={{width: px2dp(180), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
				style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
			<Input
				keyboardType={props.keyboardType ? props.keyboardType : 'default'}
				style={{
                    backgroundColor: inputDisabled? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    marginRight: px2dp(38),
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                editable={inputDisabled?false:true}
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
            <Text style={{width: px2dp(180), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled? '#fffdcc' : 'transparent',
                }}
                disabled={selectDisabled?true:false}
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
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(180),paddingRight: px2dp(25), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled? '#fffdcc' : 'transparent',
                }}
                disabled={selectDisabled?true:false}
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
            <Select
                style={{
                    flex: 3, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled? '#fffdcc' : 'transparent',
                }}
                disabled={selectDisabled?true:false}
                size='md'
                pickerType='popover'
                value={props.valueOne}
                items={props.itemsOne}
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
    const {projectName,appUserName,projectNumber} = props.data.data.allData.slSmallloanProject;
    return (
		<ScrollView style={{marginTop: px2dp(0)}}>
			<KeyboardAwareScrollView>
				<View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
					<DefaultInput placeholder={'只读属性'} name={'项目名称'} valOne={projectName} onChangeText={props.onChangeEmailText} props={props}/>
					<DefaultInput placeholder={'只读属性'} name={'项目编号'} valOne={projectNumber} onChangeText={props.onChangeEmailText} props={props}/>
					<DefaultInput border require placeholder={'请填写客户经理'} valOne={props.dialogAppUserKey} name={'客户经理'} props={props}/>
				</View>
				<View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultSelect1 placeholder={'请选择'} name={'借款利息收取单位'} value={props.mineType} valueOne={props.mineId} onSelectedOne={props.onSelectedMineId}
                                    items={props.ourMainType} onSelected={props.onSelectedMineType} props={props}
                                    itemsOne={(!isEmpty(props.mineType)&&props.mineType=='company_ourmain'?props.listSlCompany:(!isEmpty(props.mineType)&&props.mineType=='person_ourmain'?props.listSlPerson:[]))} />
                    <DefaultSelect1 placeholder={'请选择'} name={'咨询服务费'} value={props.managementConsultingMineType} valueOne={props.managementConsultingMineId} onSelectedOne={props.onSelectedManagementConsultingMineId}
                                    items={props.ourMainType} onSelected={props.onSelectedManagementConsultingMineType} props={props}
                                    itemsOne={(!isEmpty(props.managementConsultingMineType)&&props.managementConsultingMineType=='company_ourmain'?props.listSlCompany:(!isEmpty(props.managementConsultingMineType)&&props.managementConsultingMineType=='person_ourmain'?props.listSlPerson:[]))} />
                    <DefaultSelect1 placeholder={'请选择'} name={'手续费'} value={props.financeServiceMineType} valueOne={props.financeServiceMineId} onSelectedOne={props.onSelectedFinanceServiceMineId}
                                    items={props.ourMainType} onSelected={props.onSelectedFinanceServiceMineType} props={props}
                                    itemsOne={(!isEmpty(props.financeServiceMineType)&&props.financeServiceMineType=='company_ourmain'?props.listSlCompany:(!isEmpty(props.financeServiceMineType)&&props.financeServiceMineType=='person_ourmain'?props.listSlPerson:[]))} />
                    <DefaultSelect1 border placeholder={'请选择'} name={'其他费用'} value={props.otherExpensesType} valueOne={props.otherExpensesTypeId} onSelectedOne={props.onSelectedOtherExpensesTypeId}
                                    items={props.ourMainType} onSelected={props.onSelectedOtherExpensesType} props={props}
                                    itemsOne={(!isEmpty(props.otherExpensesType)&&props.otherExpensesType=='company_ourmain'?props.listSlCompany:(!isEmpty(props.otherExpensesType)&&props.otherExpensesType=='person_ourmain'?props.listSlPerson:[]))} />
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
					<DefaultSelect require placeholder={'请选择'} name={'出款人'} value={props.payeeTypeValue}
								   items={props.payeeType} onSelected={props.onSelectedPayeeType} props={props}/>
					<DefaultSelect require placeholder={'请选择'} name={'业务种类'} value={props.businessTypeValue}
								   items={props.businessType} onSelected={props.onSelectedBusinessType} props={props}/>
					<DefaultSelect require placeholder={'请选择'} name={'业务品种'} value={(isEmpty(props.businessVarietiesValue)?props.businessVarietiesValue:props.businessVarietiesValue+"")}
								   items={props.businessVarieties} onSelected={props.onSelectedBusinessVarieties} props={props}/>
					<DefaultSelect require placeholder={'请选择'} name={'借款用途'} value={(isEmpty(props.purposeTypeValue)?props.purposeTypeValue:props.purposeTypeValue+"")}
								   items={props.purposeType} onSelected={props.onSelectedPurposeType} props={props}/>
                    <DefaultSelect border require placeholder={'请选择'} name={'项目来源'}
                                   value={props.personFormValue} items={props.personForm} onSelected={props.onSelectedPersonForm} props={props}/>

                </View>
			</KeyboardAwareScrollView>
            {props.data.selectDisabled ? <View/> :<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._saveProject()} />}
		</ScrollView>
    )
}
export default class CreditLoanProjectInfoPanel extends Component {

	static defaultProps = {}

	// 构造
	constructor(props) {
		super(props);
        console.log("propsdata",props)
		// 初始状态
		this.state = {
		    data: props,
            //借款利息收取单位
            mineType: '',
            mineId: '',
            //咨询服务费
            managementConsultingMineType: '',
            managementConsultingMineId: '',
            //手续费
            financeServiceMineType: '',
            financeServiceMineId: '',
            //其他费用
            otherExpensesType: '',
            otherExpensesTypeId: '',
            listSlPerson: [],//个人
            listSlCompany: [],//企业
            //出款人
            payeeType: [],
            payeeTypeValue: '',
            //借款用途
            purposeType: [],
            purposeTypeValue: '',
            //业务种类
            businessType: [],
            businessTypeValue: '',
            //业务品种
            businessVarieties: [],
            businessVarietiesValue: '',//num
            dialogAppUserKey: '',//客户经理
            dialogAppUserValue: '',//客户经理id
            //来源
            personForm: [],
            personFormValue: '',
        };
	}
    ourMainType = [{text:'企业', value: 'company_ourmain'},{text:'个人', value: 'person_ourmain'}];
    componentWillMount() {
    }
	componentDidMount() {
        this._payee();//出款人查询
        this._personForm();//项目来源
        this._purposeType();//借款用途查询
        this._listByParentId();//业务种类
        this._listSlPerson();//个人
        this._listSlCompany();//企业
        console.log("propsdat1a1",this.props.data.allData.slSmallloanProject)
        // 初始状态
        const {mineType,mineId,managementConsultingMineType,managementConsultingMineId,financeServiceMineType,financeServiceMineId,otherExpensesType,
            otherExpensesTypeId,customerChannel,businessSpecies,businessVarieties,appUserName,appUserId,purposeType,toUsedepartment} = this.props.data.allData.slSmallloanProject;
        if(!isEmpty(mineType)){
            this.setState({
                mineType
            })
        }
        if(!isEmpty(mineId)){
            this.setState({
                mineId
            })
        }
        if(!isEmpty(managementConsultingMineType)){
            this.setState({
                managementConsultingMineType
            })
        }
        if(!isEmpty(managementConsultingMineId)){
            this.setState({
                managementConsultingMineId
            })
        }
        if(!isEmpty(financeServiceMineType)){
            this.setState({
                financeServiceMineType
            })
        }
        if(!isEmpty(financeServiceMineId)){
            this.setState({
                financeServiceMineId
            })
        }
        if(!isEmpty(otherExpensesType)){
            this.setState({
                otherExpensesType
            })
        }
        if(!isEmpty(otherExpensesTypeId)){
            this.setState({
                otherExpensesTypeId
            })
        }
        if(!isEmpty(businessSpecies)){
            this._listByParentId1 (businessSpecies)
            this.setState({
                businessTypeValue:businessSpecies,
            })
        }
        if(!isEmpty(businessVarieties)){
            this.setState({
                businessVarietiesValue:businessVarieties,
            })
        }
        if(!isEmpty(toUsedepartment)){
            this.setState({
                payeeTypeValue:toUsedepartment,
            })
        }
        if(!isEmpty(purposeType)){
            this.setState({
                purposeTypeValue:purposeType,
            })
        }
        if(!isEmpty(appUserName)){
            this.setState({
                dialogAppUserKey:appUserName,
            })
        }
        if(!isEmpty(appUserId)){
            this.setState({
                dialogAppUserValue:appUserId,
            })
        }
        if (!isEmpty(customerChannel)) {
            this.setState({
                personFormValue: customerChannel
            })
        }

	}
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.isRefresh){
            this.setState({
                dialogAppUserKey: nextProps.key1,
                dialogAppUserValue: nextProps.key2,
            });
        }
    }
    //保存项目基本信息
    _saveProject (){
	    console.log("this.state",this.state);
	    console.log("projectId",this.props.data.data.vars[0].projectId);
	    const {mineType,mineId,managementConsultingMineType,managementConsultingMineId,financeServiceMineType,financeServiceMineId,otherExpensesType,otherExpensesTypeId,personFormValue,businessTypeValue,businessVarietiesValue,payeeTypeValue,purposeTypeValue} = this.state;
	    if(isEmpty(payeeTypeValue)){
	        Toast.message("出款人不能为空");
	        return;
        }
        if(isEmpty(businessTypeValue)){
            Toast.message("业务种类必选");
            return;
        }
        if(isEmpty(businessVarietiesValue)){
            Toast.message("业务品种必选");
            return;
        }
        if(isEmpty(purposeTypeValue)){
            Toast.message("借款用途必选");
            return;
        }
        if(isEmpty(personFormValue)){
            Toast.message("来源不能为空");
            return;
        }
        // slSmallloanProject.mineType: company_ourmain //借款利息收取单位
        // slSmallloanProject.mineId: 2
        // slSmallloanProject.managementConsultingMineType: person_ourmain //咨询服务费
        // slSmallloanProject.managementConsultingMineId: 10
        // slSmallloanProject.financeServiceMineType: person_ourmain  //咨询服务费
        // slSmallloanProject.financeServiceMineId: 9
        // slSmallloanProject.otherExpensesType: person_ourmain  //其他费用
        // slSmallloanProject.otherExpensesTypeId: 8
        let url = Config.baseApi + Config.processApi.saveProjectInfo+
            "?slSmallloanProject.projectId="+this.props.data.data.vars[0].projectId+
            '&slSmallloanProject.mineType='+ mineType + //借款利息收取单位
            '&slSmallloanProject.mineId='+ mineId +
            '&slSmallloanProject.managementConsultingMineType='+ managementConsultingMineType + //咨询服务费
            '&slSmallloanProject.managementConsultingMineId='+ managementConsultingMineId +
            '&slSmallloanProject.financeServiceMineType='+ financeServiceMineType +  //咨询服务费
            '&slSmallloanProject.financeServiceMineId='+ financeServiceMineId +
            '&slSmallloanProject.otherExpensesType='+ otherExpensesType  + //其他费用
            '&slSmallloanProject.otherExpensesTypeId='+ otherExpensesTypeId +
            "&slSmallloanProject.toUsedepartment="+ payeeTypeValue +
            "&slSmallloanProject.purposeType="+ purposeTypeValue +
            "&slSmallloanProject.customerChannel="+ personFormValue +
            "&slSmallloanProject.businessSpecies="+ businessTypeValue +
            "&slSmallloanProject.businessVarieties="+ businessVarietiesValue;
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
            isRefresh:true,
            date1:new Date()
        })})
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
    _purposeType (){
        let url = Config.baseApi + Config.publicApi.dictionaryKeyUrl+"smallloan_purposeType";//借款用途key
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('借款用途', responseText);
                responseText.success ? this._key1(responseText.result, "purposeType") : Toast.message(responseText.msg);
            }
        })
    }
    _personForm() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "customer_channel";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('项目来源', responseText);
                responseText.success ? this._key1(responseText.result, "personForm") : Toast.message(responseText.msg);
            }
        })
    }
    _listSlPerson() {
        let url = Config.baseApi + Config.applyApi.listSlPerson;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('个人', responseText);
                responseText.success ? this._key2(responseText.result, "listSlPerson") : Toast.message(responseText.msg);
            }
        })
    }
    _listSlCompany() {
        let url = Config.baseApi + Config.applyApi.listSlCompany;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('企业', responseText);
                responseText.success ? this._key2(responseText.result, "listSlCompany") : Toast.message(responseText.msg);
            }
        })
    }
    _listByParentId (){
        let url = Config.baseApi + Config.applyApi.listByParentId+"?parentId=10093&businessTypes=1";//业务种类
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('业务种类', responseText);
                responseText.success ? this._key1(responseText.result, "businessType") : Toast.message(responseText.msg);
            }
        })
    }
    _listByParentId1 (state){
        let url = Config.baseApi + Config.applyApi.listByParentId+"?parentId=" + state;//业务品种
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('业务品种', responseText);
                responseText.success ? this._key1(responseText.result, "businessVarieties") : Toast.message(responseText.msg);
            }
        })
    }
    _listByParentId2 (state){
        let url = Config.baseApi + Config.applyApi.listByParentId+"?parentId=" + state;//业务品种
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('业务品种', responseText);
                this.setState({
                    businessVarietiesValue:responseText.result[1].value,
                })
                responseText.success ? this._key1(responseText.result, "businessVarieties") : Toast.message(responseText.msg);
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
    _key2 = (list,parameter) => {
        let dataBlob = [];
        if(parameter==="listSlCompany"){
            for(let i=1;i<list.length;i++){
                let item = {
                    text: list[i].corName,
                    value: list[i].companyMainId,
                };
                dataBlob.push(item);
            }
        }else{
            for(let i=1;i<list.length;i++){
                let item = {
                    text: list[i].name,
                    value: list[i].personMainId,
                };
                dataBlob.push(item);
            }
        }
        this.setState({
            [parameter]: dataBlob,
        });
    }

	render() {
        const {listSlPerson,listSlCompany,mineType,mineId,managementConsultingMineType,managementConsultingMineId,
            financeServiceMineType,financeServiceMineId,otherExpensesType,otherExpensesTypeId,personForm,personFormValue,data,payeeType,
            payeeTypeValue,purposeType,purposeTypeValue,businessType,businessTypeValue,businessVarieties,businessVarietiesValue,dialogAppUserKey} = this.state;
        return (
			<View style={styles.defaultView}>
                <Title name={this.props.title} back/>
				<FormInput
                    //数据源
                    ourMainType={this.ourMainType}
                    listSlPerson={listSlPerson}
                    listSlCompany={listSlCompany}

                    mineType={mineType}
                    onSelectedMineType={(item, index) => {
                        this.setState({
                            mineType: item.value
                        })
                    }}
                    mineId={mineId}
                    onSelectedMineId={(item, index) => {
                        this.setState({
                            mineId: item.value
                        })
                    }}
                    managementConsultingMineType={managementConsultingMineType}
                    onSelectedManagementConsultingMineType={(item, index) => {
                        this.setState({
                            managementConsultingMineType: item.value
                        })
                    }}
                    managementConsultingMineId={managementConsultingMineId}
                    onSelectedManagementConsultingMineId={(item, index) => {
                        this.setState({
                            managementConsultingMineId: item.value
                        })
                    }}
                    financeServiceMineType={financeServiceMineType}
                    onSelectedFinanceServiceMineType={(item, index) => {
                        this.setState({
                            financeServiceMineType: item.value
                        })
                    }}
                    financeServiceMineId={financeServiceMineId}
                    onSelectedFinanceServiceMineId={(item, index) => {
                        this.setState({
                            financeServiceMineId: item.value
                        })
                    }}
                    otherExpensesType={otherExpensesType}
                    onSelectedOtherExpensesType={(item, index) => {
                        this.setState({
                            otherExpensesType: item.value
                        })
                    }}
                    otherExpensesTypeId={otherExpensesTypeId}
                    onSelectedOtherExpensesTypeId={(item, index) => {
                        this.setState({
                            otherExpensesTypeId: item.value
                        })
                    }}
                    payeeType={payeeType}
                    payeeTypeValue={payeeTypeValue}
                    onSelectedPayeeType={(item, index) => {
                        this.setState({
                            payeeTypeValue: item.value
                        })
                    }}
                    purposeType={purposeType}
                    purposeTypeValue={purposeTypeValue}
                    onSelectedPurposeType={(item, index) => {
                        this.setState({
                            purposeTypeValue: item.value
                        })
                    }}
                    businessType={businessType}
                    businessTypeValue={businessTypeValue}
                    onSelectedBusinessType={(item, index) => {
                        this.setState({
                            businessTypeValue: item.value
                        })
                        this._listByParentId2(item.value);
                    }}
                    businessVarieties={businessVarieties}
                    businessVarietiesValue={businessVarietiesValue}
                    onSelectedBusinessVarieties={(item, index) => {
                        this.setState({
                            businessVarietiesValue: item.value,
                        })
                    }}
                    //客户来源
                    personForm={personForm}
                    personFormValue={personFormValue}
                    onSelectedPersonForm={(item, index) => {
                        this.setState({personFormValue: item.value})
                    }}
                    // //客户经理
                    dialogAppUserKey={dialogAppUserKey}
                    this1={this}
                    data={data}
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
    }

})


