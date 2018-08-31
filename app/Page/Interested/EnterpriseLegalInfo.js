/**
 * Created by duansailong on 2018/3/9.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Alert,
    Button,
    ScrollView,
    Dimensions,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {Input, Select,Overlay} from 'teaset';
import SmallButton  from '../../Component/SmallButton';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../Component/Loading'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width,height}=Dimensions.get('window');
const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
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
                value={props.value+""}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    return  (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={()=>Actions[props.action].call()} style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textAlign: 'left',
                flex: 1,
                width: px2dp(300),
                paddingLeft: 0
            }}
            >{props.valOne}</Text>
        </View>
    )
}

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                placeholder={props.placeholder}
                pickerType='popover'
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}

const DefaultInput1 = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <View style={{alignItems: 'flex-end',flex: .9,height: px2dp(46),borderColor: '#a2a2a2', borderWidth: 1}}>
                <Icon name='ios-search' style={{marginRight: px2dp(15)}} size={px2dp(40)} color={'#3d4250'}/>
            </View>
        </View>
    )
}

const FormInput = (props) => {
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff',}}>
                    <Text style={styles.titleStyle}>企业基本信息：</Text>
                    <DefaultInput require placeholder={'请输入企业名称'} value={props.e_value} name={'企业名称：'} onChangeText={props.onChangeEnterpriseNameText}/>
                    <DefaultInput placeholder={'请输入企业简称'}  value={props.s_value} name={'企业简称：'} onChangeText={props.onChangeShortNameText}/>
                    <DefaultSelect require placeholder={'请选择'} name={'证件类型：'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    {props.documentType==1?<DefaultInput require placeholder={'请输入社会信用代码'} value={props.c_value} name={'社会信用代码：'} onChangeText={props.onChangeSocialCreditText}/>:<View/>}
                    {props.documentType==2?<DefaultInput require placeholder={'请输入税务登记号码'} value={props.t_value} name={'税务登记号码：'} onChangeText={props.onChangeTaxationRegisterText}/>:<View/>}
                    {props.documentType==2?<DefaultInput require placeholder={'请输入营业执照号码'} value={props.cc_value} name={'营业执照号码：'} onChangeText={props.onChangeBusinessLicenseText}/>:<View/>}
                    {props.documentType==2?<DefaultInput require placeholder={'请输入组织机构代码'} value={props.o_value} name={'组织机构代码：'} onChangeText={props.onChangeOrganizationText}/>:<View/>}
                    <DefaultInput placeholder={'请输入企业联系人'}  value={props.l_value} name={'企业联系人：'} onChangeText={props.onChangeEnterpriseConcatText}/>
                    <DefaultInput require placeholder={'请输入联系电话'} value={props.tele_value} name={'联系电话：'} onChangeText={props.onChangeConcatPhoneText}/>
                    <DefaultInput require placeholder={'请输入通讯地址'} value={props.area_value} name={'通讯地址：'} onChangeText={props.onChangeCommunicateAreaText}/>
                    {/*  <DefaultInput1 require placeholder={'请输入'}   name={'行业类别：'} onChangeText={props.onChangeAddressText}/>*/}
                    <DefaultInput keyboardType='numeric' placeholder={'请输入固定资产投资（万元）'} value={props.fixed_value} name={'固定资产投资（万元）：'} onChangeText={props.onChangeFixedAssetsText}/>
                    <DefaultInput keyboardType='numeric' border placeholder={'请输入借款总额'}  value={props.total_value} name={'借款总额：'} onChangeText={props.onChangeTotalLoanText}/>
                    <View style={{flex: 1, backgroundColor: '#f5f5f5', height: px2dp(20)}}></View>
                    <Text style={styles.titleStyle}>法人代表人信息：</Text>

                    {/*<DefaultInput require placeholder={'请输入法人姓名'} value={props.legalName_value} name={'法人姓名：'} onChangeText={props.onChangeLegalPersonNameText}/>*/}
                    <DefaultChoice name={'法人姓名'} valOne={props.dialogAppUserKey} action="PersonSelectCustomer"/>

                    <DefaultSelect require placeholder={'请选择'} name={'法人性别：'} value={props.sexValue}
                                   items={props.sexItems} onSelected={props.onSelectedSexStatus}/>
                    <DefaultSelect require placeholder={'请选择'} name={'证件类型：'} value={props.cardTypeValue}
                                   items={props.cardTypeItems} onSelected={props.onSelectedCardTypeStatus}/>
                    <DefaultInput require placeholder={'请输入证件号码'} value={props.idCard_value} name={'证件号码：'} onChangeText={props.onChangeCardNumText}/>
                    <DefaultInput require placeholder={'请输入手机号码'} value={props.cellPhone_value} name={'手机号码：'} onChangeText={props.onChangeCellPhoneText}/>
                    <DefaultInput placeholder={'请输入电子邮箱'} value={props.email_value} name={'电子邮箱：'} onChangeText={props.onChangeEmailText}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class EnterpriseLegalInfo extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        //初始化状态
        console.log(11111,props.data);
        this.state = {
            visible:true,
            data:props.data,
            hangyeType:null,
            legalpersonid:"",
            legalPersonName:"",
            shopId:"",
            shopName:"",
            id:"",
            cardNum:"",email:"",
            cellPhone:"",
            enterpriseName:"",
            shortName:"",
            creditAccountNum:"",
            taxNum:"",cciaa:"",
            organizeCode:"",
            linkMan:"",
            telePhone:"",
            area:"",
            fixedAssetsInvestment:"",
            totalLoan:"",
            creater:"",
            createrId:"",
            createdate:"",
            companyId:"",
            salesArea:"",
            ownership:"",
            opendate:"",
            employeetotal:"",
            jyplace:"",
            areaMeasure:"",
            belongedId:"",
            productionDate:"",
            amongEquipment:"",
            selfFinancing:"",
            averageAnnualSalesIncome:"",
            salesThisYear:"",
            liquidityBalance:"",
            rent:"",
            managecity:"",
            receiveMail:"",
            postcoding:"",
            customerLevel:"",
            capitalkind:"",
            registermoney:"",
            paidInMoeny:"",
            businessScope:"",
            factaddress:"",
            fax:"",
            financialInstitution:"",
            otherFinancing:"",
            personalLoans:"",
            assetLiabilityRatio:"",
            productSalesProfitMargin:"",
            otherEconomicIndicators:"",
            website:"",
            sexItems:[],
            cardTypeItems:[],

            dialogAppUserKey: "",//法人姓名
        };
    }

    maritalStatusItems = [{text:'五证合一',value:1},{text:'非五证合一',value:2}];
    componentDidMount() {
       this._getSex();
       this._getIdCard();
        //非空验证
        if(!isEmpty(this.props.data)){
            const{id}=this.props.data;
            let url=Config.baseApi+Config.processApi.queryEnterpriseInfoById+id;
            //网络请求--根据ID 查询企业法人信息
            RTRequest.fetch1(url).then(responseText=>{
                if(responseText) {
                   if(!isEmpty(responseText.data)){
                       const {cellphone,sex,selfemail,name,cardtype,cardnumber}=responseText.data.person;
                       const {shopId,shopName,enterprisename,shortname,documentType,taxnum,cciaa,organizecode,linkman,telephone,area,hangyeType,fixedAssetsInvestment,totalLoan}=responseText.data.enterprise;
                    this.setState({visible:false,enterpriseName:enterprisename,
                           shortName:shortname,creditAccountNum:organizecode,
                           documentType:documentType,taxNum:taxnum,cciaa:cciaa,
                           organizeCode:organizecode,linkMan:linkman,telePhone:telephone,
                           area:area,hangyeType:hangyeType,totalLoan:totalLoan,fixedAssetsInvestment:fixedAssetsInvestment,
                           cardTypeValue:cardtype+"",sexValue:sex+"",dialogAppUserKey:name,
                           cardNum:cardnumber,email:selfemail,cellPhone:cellphone,
                           id:responseText.data.enterprise.id, legalpersonid:responseText.data.person.id,shopId:shopId,shopName:shopName,
                       });
                   }
                }
            });
       }else
        this.setState({visible:false});
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.isRefresh2){
            this.setState({
                dialogAppUserKey: nextProps.key1,

            });
        }

    }
    /**
     * 网络请求--获取性别
     * @private
     */
    _getSex(){
        let url=Config.baseApi+Config.publicApi.dictionaryUrl+"性别";
        RTRequest.fetch1(url).then(responseText=>{
            if(responseText){
                responseText.success?this._key1(responseText.result,"sexItems"):Toast.message("请检查网络连接");
            }
        });
    }

    /**
     * 网络请求--获取证件类型
     * @private
     */
    _getIdCard(){
        let url=Config.baseApi+Config.publicApi.dictionaryUrl+"证件类型";
        RTRequest.fetch1(url).then(responseText=>{
            if(responseText){
                responseText.success?this._key1(responseText.result,"cardTypeItems"):Toast.message("请检查网络连接");
            }
        });
    }

    /**
     * 封装数组
     * @param list
     * @param parameter
     * @private
     */
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
    }

    render() {
        const {width}=Dimensions.get("window");
        const {legalPersonName, cardNum,email,dialogAppUserKey,cellPhone,sexValue,cardTypeValue,enterpriseName,shortName,creditAccountNum,documentType,taxNum,cciaa,organizeCode,linkMan,telePhone,area,hangyeType,fixedAssetsInvestment,totalLoan}=this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                    <ScrollView>
                        <FormInput
                            e_value={enterpriseName}
                            s_value={shortName}
                            c_value={creditAccountNum}
                            t_value={taxNum}
                            cc_value={cciaa}
                            //linkman,telephone,area,hangyeType,fixedAssetsInvestment
                            o_value={organizeCode}
                            l_value={linkMan}
                            tele_value={telePhone}
                            area_value={area}
                            fixed_value={fixedAssetsInvestment}
                            total_value={totalLoan}
                            documentType={documentType}
                            maritalStatusValue={documentType}
                            maritalStatusItems={this.maritalStatusItems}
                            onSelectedmaritalStatus={(item, index) => {
                                this.setState({documentType: item.value})
                                if(item.value==1){
                                    this.setState({organizeCode:creditAccountNum});
                                }else{
                                    this.setState({creditAccountNum:organizeCode});
                                }
                            }}
                            onChangeEnterpriseNameText={(enterpriseName)=>{
                                this.setState({
                                    enterpriseName
                                });
                            }}
                            onChangeShortNameText={shortName=>{
                                this.setState({shortName:shortName});
                            }}
                            onChangeSocialCreditText={socialCreditCode=>{
                             this.setState({creditAccountNum:socialCreditCode});
                            }}
                            onChangeTaxationRegisterText={taxationRegisterNum=>{
                             this.setState({taxNum:taxationRegisterNum});
                            }}
                            onChangeOrganizationText={organization=>{
                             this.setState({ organizeCode:organization});
                            }}
                            onChangeBusinessLicenseText={(businessLicense) => {
                                this.setState({
                                    cciaa:businessLicense
                                })
                            }}
                            onChangeEnterpriseConcatText={linkMan=>{
                                this.setState({linkMan:linkMan});
                            }}
                            onChangeConcatPhoneText={phone=>{
                                this.setState({telePhone:phone});
                            }}
                            onChangeCommunicateAreaText={area=>{
                                this.setState({area:area});
                            }}
                            onChangeFixedAssetsText={assets=>{
                                this.setState({fixedAssetsInvestment:assets});
                            }}
                            onChangeTotalLoanText={totalLoan=>{
                                this.setState({totalLoan:totalLoan});
                            }}
                            sexValue={sexValue}
                            sexItems={this.state.sexItems}
                            onSelectedSexStatus={(item, index) => {
                                this.setState({sexValue: item.value})
                            }}
                            onChangeLegalPersonNameText={(legalPersonName) => {
                                this.setState({
                                    legalPersonName
                                })
                            }}
                            cardTypeValue={cardTypeValue}
                            cardTypeItems={this.state.cardTypeItems}
                            onSelectedCardTypeStatus={(item, index) => {
                                this.setState({cardTypeValue: item.value})
                            }}
                            onChangeCardNumText={cardNum=>{
                                this.setState({cardNum});
                            }}
                            onChangeCellPhoneText={cellPhone=>{
                                this.setState({cellPhone});
                            }}
                            onChangeEmailText={(email) => {
                                this.setState({
                                    email
                                })
                            }}
                            legalName_value={legalPersonName}
                            idCard_value={cardNum}
                            email_value={email}
                            cellPhone_value={cellPhone}

                            dialogAppUserKey={dialogAppUserKey}

                        />
                    </ScrollView>
                <Loading visible={this.state.visible}/>
               <View style={{borderBottomRightRadius: px2dp(30),borderBottomLeftRadius: px2dp(30),flexDirection: 'row',marginTop: px2dp(0),justifyContent: 'space-around'}}>
                    <SmallButton style={{flex: 1}} name="保存" height={70} width={240} onPress={()=>this._saveEnterpriseBasicInfo()}/>
                </View>
            </View>
        )
    }

    /**
     * 保存--(新增) 企业法人信息
     * @private
     */
    _saveEnterpriseBasicInfo=()=> {
        const {creater,dialogAppUserKey,sexValue,cardNum,cardTypeValue,email,cellPhone,legalpersonid,shopId,shopName,id,enterpriseName,shortName,creditAccountNum,documentType,
            taxNum,cciaa,organizeCode,linkMan,telePhone,area,hangyeType,fixedAssetsInvestment,totalLoan,createrId,createdate,companyId,salesArea,ownership,opendate,employeetotal,jyplace,areaMeasure,
            belongedId,productionDate,amongEquipment,selfFinancing,averageAnnualSalesIncome,salesThisYear,liquidityBalance,
            rent,managecity,receiveMail,postcoding,customerLevel,capitalkind,registermoney,paidInMoeny,businessScope,factaddress,fax,
            financialInstitution,otherFinancing,personalLoans,assetLiabilityRatio,productSalesProfitMargin,otherEconomicIndicators,
            website,
            }=this.state;
        if(isEmpty(enterpriseName)){
            Toast.message("请输入企业名称");
            return;
        }
        if(isEmpty(documentType)){
            Toast.message("请选择企业证件类型");
            return;
        }
        if(documentType==1){
            if(isEmpty(creditAccountNum)){
                Toast.message("请输入社会信用代码");
                return;
            }
        }else{
            if(isEmpty(taxNum)){
                Toast.message("请输入税务登记号码");
                return;
            }
            if(isEmpty(cciaa)){
                Toast.message("请输入营业执照号码");
                return;
            }
            if(isEmpty(organizeCode)){
                Toast.message("请输入组织机构代码");
                return;
            }
        }
        if(isEmpty(telePhone)){
            Toast.message("请输入联系电话");
            return;
        }
        if(isEmpty(area)){
            Toast.message("请输入通讯地址");
            return;
        }
        // if(!Tool.isMoney(fixedAssetsInvestment,"请检查固定资产投资")){
        //     return;
        // }
        // if(!Tool.isMoney(totalLoan,"请检查借款总额")){
        //     return;
        // }
        if(isEmpty(dialogAppUserKey)){
            Toast.message("请输入法人姓名");
            return;
        }
        if(isEmpty(sexValue)){
            Toast.message("请选择法人性别");
            return;
        }
        if(isEmpty(cardTypeValue)){
            Toast.message("请选择法人证件类型");
            return;
        }
        if(isEmpty(cardNum)){
            Toast.message("请输入证件号码");
            return;
        }
        if(isEmpty(cellPhone)){
            Toast.message("请输入手机号码");
            return;
        }
        if(!Tool.isMobile(telePhone)){
            return;
        }
        if(!Tool.isMobile(cellPhone)){
            return;
        }
        if(cardTypeValue==="309"){
            if(!Tool.isIdCard(cardNum)){
                return;
            }
        }
        if(!isEmpty(email)){
            if(!Tool.isEmail(email)){
                return;
            }
        }
        let args;
        if(documentType==1){
            args=creditAccountNum;
        }else{
            args=organizeCode;
        }
        let url = Config.baseApi + Config.processApi.insertEnterpriseInfo
            +"?enterprise.id="+id+
            "&enterprise.shortname="+shortName+
            "&enterprise.shopName="+shopName+
            "&enterprise.shopId="+shopId+
            "&enterprise.enterprisename=" + enterpriseName +
            "&enterprise.documentType=" + documentType+
            "&enterprise.isLicense=false"+
            "&enterprise.hangyeName="  +
            "&enterprise.taxnum=" + taxNum +
            "&enterprise.cciaa=" + cciaa +
            "&enterprise.linkman="+linkMan+
            "&enterprise.organizecode="+args+
            "&enterprise.telephone="+telePhone+
            "&enterprise.hangyeType="+
            "&enterprise.rootHangYeType="+
            "&enterprise.area="+area+
            "&enterprise.fixedAssetsInvestment="+fixedAssetsInvestment+
            "&enterprise.totalLoan="+totalLoan+
            "&enterprise.legalpersonid="+legalpersonid+
            "&person.id="+legalpersonid+
            "&person.name="+dialogAppUserKey+
            "&person.sex="+sexValue+
            "&person.cardtype="+cardTypeValue+
            "&person.cardnumber="+cardNum+
            "&person.cellphone="+cellPhone+
            "&person.selfemail="+email+
            "&enterpriseGsdjzId=0"+
            "&enterpriseYyzzId=0"+
            "&enterpriseZzjgId=0"+
            "&enterpriseDsdjId=0"+
            "&enterprise.creater="+creater+
            "&enterprise.createrId="+createrId+
            "&enterprise.createdate="+createdate+
            "&enterprise.companyId="+companyId+
            "&enterprise.salesArea="+salesArea+
            "&enterprise.ownership="+ownership+
            "&enterprise.opendate="+opendate+
            "&enterprise.employeetotal="+employeetotal+
            "&enterprise.jyplace="+jyplace+
            "&enterprise.areaMeasure="+areaMeasure+
            "&enterprise.rent="+rent+
            "&enterprise.managecity="+managecity+
            "&enterprise.receiveMail="+receiveMail+
            "&enterprise.postcoding="+postcoding+
            "&enterprise.customerLevel="+customerLevel+
            "&enterprise.capitalkind="+capitalkind+
            "&enterprise.registermoney="+registermoney+
            "&enterprise.paidInMoeny="+paidInMoeny+
            "&enterprise.factaddress="+factaddress+
            "&enterprise.website="+website+
            "&enterprise.fax="+fax+
            "&enterprise.enterId="+
            "&enterprise.belongedId="+belongedId+
            "&enterprise.businessScope="+businessScope+
            "&enterprise.productionDate="+productionDate+
            "&enterprise.amongEquipment="+amongEquipment+
            "&enterprise.selfFinancing="+selfFinancing+
            "&enterprise.averageAnnualSalesIncome="+averageAnnualSalesIncome+
            "&enterprise.salesThisYear="+salesThisYear+
            "&enterprise.liquidityBalance="+liquidityBalance+
            "&enterprise.financialInstitution="+financialInstitution+
            "&enterprise.otherFinancing="+otherFinancing+
            "&enterprise.personalLoans="+personalLoans+
            "&enterprise.assetLiabilityRatio="+assetLiabilityRatio+
            "&enterprise.productSalesProfitMargin="+productSalesProfitMargin+
            "&enterprise.otherEconomicIndicators="+otherEconomicIndicators+
            "&gudongInfo="+
            "&personSFZZId=0"+
            "&personSFZFId=0";
        RTRequest.fetch1(url).then(responseText=>{
            if(responseText){
                responseText.success?this._success(responseText):this._fail(responseText.msg);
            }

        });
    }
    /**
     * 网络请求失败
     * @param msg
     * @private
     */
    _fail(msg){
        Toast.message(msg);
    }

    /**
     * 网络请求成功
     * @param responseText
     * @private
     */
    _success(responseText){
      if(!isEmpty(this.props.data)){
          Toast.message(responseText.msg);
          //根据key返回到指定页面
          //不能换位置 popTo 和 refresh 方法
          Actions.pop();
          // Actions.pop({refresh:{isRefresh:true,date:new Date()}});
      }else{
         this._showPop("zoomOut",true,"银行开户信息",responseText.newId);
      }
    }

    /**
     * 显示弹框
     * @param type
     * @param modal
     * @param text
     * @param newId
     * @private
     */
    _showPop(type, modal, text,newId) {//modal控制是否点击周围取消弹框
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: width / 5 * 4 - px2dp(50),
                    minHeight: width / 2 * 1 - px2dp(50),
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flexDirection: 'row', position: 'absolute', top: width / 9 * 1}}>
                        <Text style={{fontSize: px2dp(32),}}>前往</Text>
                        <Text style={{fontSize: px2dp(34), color: '#393939'}}>{text}</Text>
                        <Text style={{fontSize: px2dp(32),}}>节点</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: width / 13 * 1}}>
                        <Button style={{width: width / 5 * 1, backgroundColor: '#43a5e7'}} titleStyle={{color: '#fff'}}
                                title=' 返回 ' onPress={()=>this._back()}/>
                        <View style={{width: px2dp(60)}}/>
                        <Button style={{width: width / 5 * 1, backgroundColor: '#43a5e7'}} titleStyle={{color: '#fff'}}
                                title=' 继续 ' onPress={()  => this._nextStep(newId)}
                        />
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    /**
     * 点击弹框返回按钮
     * @private
     */
    _back(){
        this.overlayPopView.close();
        Actions.pop({refresh:{isRefresh:true,date:new Date()}});
    }

    /**
     * 点击弹框继续操作
     * @param newId
     * @private
     */
    _nextStep(newId){
        this.overlayPopView.close();
        Actions.pop({refresh:{isRefresh:true,date:new Date()}});
        Actions.EnterpriseCustomerInfo({newId});
    }
}
//样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    titleStyle: {
        paddingTop: px2dp(20),
        paddingBottom: px2dp(20),
        borderBottomColor: '#ddd',
        borderBottomWidth: px2dp(1),
        color: '#0000ff',
        fontSize: px2dp(32),
        paddingLeft: px2dp(15),
    },
    text: {
        color: "black",
        fontSize: 22
    },
    LinearGradient: {
        shadowOffset: {width: 3, height: 10},
        shadowOpacity: 0.2,
        borderRadius: px2dp(0),
        shadowRadius: 8,
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 5,
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        paddingLeft: px2dp(15),
        height: px2dp(100)
    }

})


