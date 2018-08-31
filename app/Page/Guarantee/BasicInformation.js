/**
 * Created by Administrator on 2018\8\2 0002.
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
import Loading from '../../Component/Loading'
//项目基本信息
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(190), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: !inputDisabled? props.disabled?'transparent':'#fffdcc' : '#fffdcc',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    marginRight: px2dp(20),
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                editable={!inputDisabled?props.disabled?true:false:false}
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
            <Text style={{width: px2dp(190), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1, marginRight: px2dp(20), paddingLeft: 0, borderWidth: 0,
                    backgroundColor:!selectDisabled? props.disabled?'transparent':'#fffdcc' : '#fffdcc',
                }}
                disabled={!selectDisabled?props.disabled?false:true:true}
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
const DefaultChoice = (props) => {
    const {defaultChecked} =  props.props.data;
    return  (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(190), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text
                disabled={defaultChecked?true:false}
                onPress={()=>Actions[props.action].call()} style={{
                backgroundColor: defaultChecked?'#fffdcc':'transparent',
                borderColor: 'transparent',
                textAlign: 'left',
                flex: 1,
                paddingLeft: 0,
                marginRight: px2dp(20),
                color:'#333'
            }}
            >{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    const {projectName,appUserName,projectNumber,businessVarieties} = props.data.data.allData.gLGuaranteeloanProject;
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput require placeholder={'只读属性'} name={'项目名称'} valOne={projectName} onChangeText={props.onChangeEmailText} props={props}/>
                    <DefaultInput require placeholder={'只读属性'} name={'项目编号'} valOne={projectNumber} onChangeText={props.onChangeEmailText} props={props}/>
                    <DefaultChoice name={'客户经理'} valOne={props.dialogAppUserKey} action="SelectCustomer" props={props}/>
                    <DefaultSelect require placeholder={'请选择'} name={'业务种类'} value={props.businessTypeValue}
                                   items={props.businessType} onSelected={props.onSelectedBusinessType} props={props}/>
                    <DefaultSelect require placeholder={'请选择'} name={'业务品种'} value={(isEmpty(props.businessVarietiesValue)?props.businessVarietiesValue:props.businessVarietiesValue+"")}
                                   items={props.businessVarieties} onSelected={props.onSelectedBusinessVarieties} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    {businessVarieties==11082?<DefaultInput disabled require placeholder={'请输入'} name={'法院'} valOne={props.court} onChangeText={props.onChangeCourt} props={props}/>:<DefaultSelect require disabled  placeholder={'请选择'} name={'项目来源'} value={(isEmpty(props.projectSourceValue)?props.projectSourceValue:props.projectSourceValue+"")}
                                                                                                                                                                                                     items={props.projectSource} onSelected={props.onSelectedProjectSource} props={props}/>}
                    {businessVarieties==11083?<View/>:businessVarieties==11082?<DefaultInput disabled require placeholder={'请输入'} name={'法院名称'} valOne={props.bankUse} onChangeText={props.onChangeBankUse} props={props}/>:<DefaultInput disabled require placeholder={'请输入'} name={'银行贷款用途'} valOne={props.bankUse} onChangeText={props.onChangeBankUse} props={props}/>}
                    <DefaultInput placeholder={'只读属性'} name={'流程类别'} valOne={props.flowTypeKey} onChangeText={props.onChangeEmailText} props={props}/>
                    <DefaultSelect placeholder={'请选择'} name={'我方主体类型'} value={(isEmpty(props.mineType)?props.mineType:props.mineType+"")}
                                   items={props.ourMainType} onSelected={props.onChangeMineType} props={props}/>
                    <DefaultInput placeholder={'只读属性'} name={'我方主体'} valOne={props.mineName} onChangeText={props.onChangeEmailText} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.defaultChecked ? <View/> :<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={300} onPress={()=>props.this1._saveProject()} />}
        </ScrollView>
    )
}
export default class BasicInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log("-------------",props);
        this.state = {
            data: props,
            //业务种类
            businessType: [],
            businessTypeValue: '',
            //业务品种
            businessVarieties: [],
            businessVarietiesValue: '',//num
            dialogAppUserKey: '',//客户经理
            dialogAppUserValue: '',//客户经理id
            court:'',//法院
            bankUse:'',//法院名称
            flowTypeKey: 'generalLoanFlow',//流程类别
            mineName:'',
            ourMainType : [{text:'企业', value: 'company_ourmain'},{text:'个人', value: 'person_ourmain'}],
            mineType:'',
            projectSource:[],//项目来源
            projectSourceValue:'',
            projectSourceKey:'',
            visible: false
        };
    }
    _listSlCompany() {
        let url = Config.baseApi + Config.applyApi.listSlCompany;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key2(responseText.result, "listSlCompany") : Toast.message(responseText.msg);
            }
        })
    }
    getXiangMu(){
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl+'gLGuaranteeloan_projectSource';
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log("项目来源------",responseText);
                responseText.success ? this._key1(responseText.result, "projectSource") : Toast.message(responseText.msg);
            }
        })
    }
    componentDidMount() {
        this._listByParentId();//业务种类
        this.getXiangMu();
        // 初始状态
        const {court,bankUse,projectSource,productName,mineName,appUserName,appUserIdOfA,businessSpecies,businessVarieties,mineType} = this.props.data.allData.gLGuaranteeloanProject;
        if(!isEmpty(bankUse)){
            this.setState({
                bankUse
            })
        }
        if(!isEmpty(court)){
            this.setState({
                court
            })
        }
        if(!isEmpty(projectSource)){
            this.setState({
                projectSourceValue:projectSource
            })
        }
        if(!isEmpty(this.props.data.allData.flowTypeKey)){
            this.setState({
                flowTypeKey:this.props.data.allData.flowTypeKey
            })
        }
        if(!isEmpty(mineName)){
            this.setState({
                mineName
            })
        }
        //业务种类
        if(!isEmpty(businessSpecies)){
            this._listByParentId1 (businessSpecies)
            this.setState({
                businessTypeValue:businessSpecies,
            })
        }
        //业务品种
        if(!isEmpty(businessVarieties)){
            this.setState({
                businessVarietiesValue:businessVarieties,
            })
        }
        //客户经理
        if(!isEmpty(appUserName)){
            this.setState({
                dialogAppUserKey:appUserName,
            })
        }
        if(!isEmpty(appUserIdOfA)){
            this.setState({
                dialogAppUserValue:appUserIdOfA,
            })
        }
        if(!isEmpty(mineType)){
            this.setState({
                mineType:mineType,
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh2){
            this.setState({
                dialogAppUserKey: nextProps.key1,
                dialogAppUserValue: nextProps.key2,
            });
        }
        if(nextProps.isRefresh1){
            this.setState({
                networkNameKey: nextProps.key1,
                networkNameValue: nextProps.key2,
            });
        }
    }
    //保存项目基本信息
    _saveProject (){
        const {projectName,appUserName,projectNumber} = this.props.data.allData.gLGuaranteeloanProject;
        const {projectSourceValue,businessVarietiesValue,mineType,dialogAppUserValue,data,mineName,flowTypeKey,court,bankUse,businessType,businessTypeValue,businessVarieties,dialogAppUserKey} = this.state;
        if(businessVarietiesValue==11082){
            if(isEmpty(court)){
                Toast.message("法院不能为空");
                return;
            }
        }else{
            if(isEmpty(projectSourceValue)){
                Toast.message("项目来源不能为空");
                return;
            }
        }

        if(businessVarietiesValue!=11083){
            if(isEmpty(bankUse)){
                Toast.message("数据不能为空");
                return;
            }
        }
        if(isEmpty(dialogAppUserValue)){
            Toast.message("客户经理不能为空");
            return;
        }
        let url = Config.baseApi + Config.twoApi.updateGLGuarantee+
            "?gLGuaranteeloanProject.projectId="+this.props.data.data.vars[0].projectId+
            '&person.id='+ this.props.data.allData.person.id +
            '&businessType='+this.props.data.allData.gLGuaranteeloanProject.businessType +
            '&task_id'+  this.props.data.data.taskId +
            "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
            '&gLGuaranteeloanProject.projectName='+ projectName +
            '&gLGuaranteeloanProject.projectNumber='+ projectNumber +
            '&businessTypeKey='+  this.props.data.allData.businessTypeKey +
            '&gLGuaranteeloanProject.businessSpecies='+ businessTypeValue +
            '&flowTypeKey='+ flowTypeKey +
            '&mineTypeKey='+ mineType +
            "&slSmallloanProject.businessVarieties="+ businessVarietiesValue+
            "&gLGuaranteeloanProject.mineName="+ mineName +
            "&gLGuaranteeloanProject.mineId="+ this.props.data.allData.gLGuaranteeloanProject.mineId +
            "&gLGuaranteeloanProject.appUserIdOfA="+ dialogAppUserValue +
            "&appUserIdOfA="+ dialogAppUserKey +
            "&gLGuaranteeloanProject.court="+ court +
            "&gLGuaranteeloanProject.bankUse="+ bankUse +
            "&gLGuaranteeloanProject.projectSource="+ projectSourceValue +
            "&gLGuaranteeloanProject.productName="+ this.props.data.allData.gLGuaranteeloanProject.productName;
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
    _listByParentId (){
        let url = Config.baseApi + Config.applyApi.listByParentId+"?parentId=10093&businessTypes=2";//业务种类
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "businessType") : Toast.message(responseText.msg);
            }
        })
    }
    _listByParentId1 (state){
        let url = Config.baseApi + Config.applyApi.listByParentId+"?parentId=" + state;//业务品种
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
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
    render() {
        const {projectSource,projectSourceValue,projectSourceKey,ourMainType,mineType,data,mineName,flowTypeKey,court,bankUse,businessType,businessTypeValue,businessVarieties,businessVarietiesValue,dialogAppUserKey} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    //客户经理
                    dialogAppUserKey={dialogAppUserKey}
                    flowTypeKey={flowTypeKey}
                    this1={this}
                    data={data}
                    //我方主体
                    mineName={mineName}
                    //主体
                    ourMainType={ourMainType}
                    mineType={mineType}
                    onChangeMineType={(text) => {
                        this.setState({
                            mineType: text
                        })
                    }}
                    //法院
                    court={court}
                    onChangeCourt={(text) => {
                        this.setState({
                            court: text
                        })
                    }}
                    //法院名称
                    bankUse={bankUse}
                    onChangeBankUse={(text) => {
                        this.setState({
                            bankUse: text
                        })
                    }}
                    //业务种类
                    businessType={businessType}
                    businessTypeValue={businessTypeValue}
                    onSelectedBusinessType={(item, index) => {
                        this.setState({
                            businessTypeValue: item.value
                        })
                        this._listByParentId2(item.value);
                    }}
                    //业务品种
                    businessVarieties={businessVarieties}
                    businessVarietiesValue={businessVarietiesValue}
                    onSelectedBusinessVarieties={(item, index) => {
                        this.setState({
                            businessVarietiesValue: item.value,
                        })
                    }}
                    //项目来源
                    projectSource={projectSource}
                    projectSourceValue={projectSourceValue}
                    onSelectedProjectSource={(item, index) => {
                        this.setState({
                            projectSourceValue: item.value,
                            projectSourceKey:index.text,
                        })
                    }}
                />
                <Loading visible={this.state.visible}/>
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



