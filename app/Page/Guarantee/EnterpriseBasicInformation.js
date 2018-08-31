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
import {Input, Select, Overlay} from 'teaset';
import SmallButton  from '../../Component/SmallButton';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../Component/Loading'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width, height}=Dimensions.get('window');
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1), marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100), marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled ? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.value + ""}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                editable={inputDisabled?false:true}
            />
        </View>
    )
}

const DefaultSelect = (props) => {
    const {selectDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1), marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100), marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1,
                    marginRight: px2dp(36),
                    paddingLeft: 0,
                    borderWidth: 0,
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent'
                }}
                value={props.value}
                items={props.items}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                placeholder={props.placeholder}
                pickerType='popover'
                disabled={selectDisabled}
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}

const DefaultInput1 = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1), marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100), marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <View style={{alignItems: 'flex-end', flex: .9, height: px2dp(46), borderColor: '#a2a2a2', borderWidth: 1}}>
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
                    {/* <Text style={styles.titleStyle}>企业基本信息：</Text>*/}
                    <DefaultInput require placeholder={'请输入企业名称'} props={props} value={props.e_value}
                                  name={'企业名称：'}
                                  onChangeText={props.onChangeEnterpriseNameText}/>
                    <DefaultInput disabled={true} placeholder={'请输入企业简称'} value={props.s_value} props={props}
                                  name={'企业简称：'}
                                  onChangeText={props.onChangeShortNameText}/>
                    <DefaultInput placeholder={'请输入行业类别'} value={props.hangyeName} props={props}
                                  name={'行业类别：'}
                                  onChangeText={props.onChangeHangyeName}/>
                    <DefaultSelect disabled={true} require placeholder={'请选择'} name={'证件类型：'} props={props}
                                   value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    {props.documentType == 1 ?
                        <DefaultInput require placeholder={'请输入社会信用代码'} props={props}
                                      value={props.c_value} name={'社会信用代码：'}
                                      onChangeText={props.onChangeSocialCreditText}/> : null}
                    {props.documentType == 2 ?
                        <DefaultInput require placeholder={'请输入税务登记号码'} props={props}
                                      value={props.t_value} name={'税务登记号码：'}
                                      onChangeText={props.onChangeTaxationRegisterText}/> : null}
                    {props.documentType == 2 ?
                        <DefaultInput require placeholder={'请输入营业执照号码'} props={props}
                                      value={props.cc_value} name={'营业执照号码：'}
                                      onChangeText={props.onChangeBusinessLicenseText}/> : null}
                    {props.documentType == 2 ?
                        <DefaultInput  require placeholder={'请输入组织机构代码'} props={props}
                                      value={props.o_value} name={'组织机构代码：'}
                                      onChangeText={props.onChangeOrganizationText}/> : null}
                    <DefaultInput require placeholder={'请输入联系电话'} props={props} value={props.tele_value}
                                  name={'联系电话：'} onChangeText={props.onChangeConcatPhoneText}/>
                    <DefaultInput  require placeholder={'请输入通讯地址'} props={props} value={props.area_value}
                                  name={'通讯地址：'} onChangeText={props.onChangeCommunicateAreaText}/>
                    <DefaultInput placeholder={'请输入邮政编码'} props={props} value={props.postCode}
                                  name={'邮政编码：'} onChangeText={props.onChangePostCodeText}/>
                </View>
                <View style={{
                    borderBottomRightRadius: px2dp(30),
                    borderBottomLeftRadius: px2dp(30),
                    flexDirection: 'row',
                    marginTop: px2dp(20),
                    justifyContent: 'space-around'
                }}>
                    {props.data.selectDisabled ? <View/> :
                        <SmallButton style={{flex: 1}} name="保存" height={70} width={240}
                                     onPress={() => props.this._saveEnterpriseBasicInfo()}/>}
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class EnterpriseBasicInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        //初始化状态
        this.state = {
            visible: true,
            legalpersonid: "",
            shopId: "",
            shopName: "",
            id: "",
            legalPersonName: "",
            cardNum: "",
            email: "",
            cellPhone: "",
            enterpriseName: "",
            shortName: "",
            creditAccountNum: "",
            taxNum: "",
            cciaa: "",
            organizeCode: "",
            linkMan: "",
            telePhone: "",
            area: "",
            fixedAssetsInvestment: "",
            totalLoan: "",
            data1: props,
            data: props.data,
            hangyeType: null,

            creater: "",
            createrId: "",
            createdate: "",
            companyId: "",
            salesArea: "",
            ownership: "",
            opendate: "",
            employeetotal: "",
            jyplace: "",
            areaMeasure: "",
            belongedId: "",
            productionDate: "",
            amongEquipment: "",
            selfFinancing: "",
            averageAnnualSalesIncome: "",
            salesThisYear: "",
            liquidityBalance: "",
            rent: "",
            managecity: "",
            receiveMail: "",
            postcoding: "",
            postCode: "",
            customerLevel: "",
            capitalkind: "",
            registermoney: "",
            paidInMoeny: "",
            businessScope: "",
            factaddress: "",
            fax: "",
            financialInstitution: "",
            otherFinancing: "",
            personalLoans: "",
            assetLiabilityRatio: "",
            productSalesProfitMargin: "",
            otherEconomicIndicators: "",
            website: "",
            sexItems: [],
            cardTypeItems: [],
            hangyeName: '',
        };
    }

    maritalStatusItems = [{text: '五证合一', value: 1}, {text: '非五证合一', value: 2}];

    componentDidMount() {
        this._getSex();
        this._getIdCard();
        //非空验证
        if (!isEmpty(this.props.data.data.vars[0])) {
            const {businessType, productId, oppositeType, operationType}=this.props.data.data.vars[0];
            this.setState({productId, oppositeType, operationType, businessType});
        }
        //非空验证
        if (!isEmpty(this.props.data.allData)) {
            const {id}=this.props.data.allData.enterprise;
            let url = Config.baseApi + Config.processApi.queryEnterpriseInfoById + id;
            //网络请求--根据ID 查询企业法人信息
            RTRequest.fetch1(url).then(responseText => {
                if (responseText) {
                    console.log(11111111111111, responseText.data);
                    if (!isEmpty(responseText.data)) {
                        const {cellphone, sex, selfemail, name, cardtype, cardnumber}=responseText.data.person;
                        const {shopId, postcoding, shopName, hangyeName, enterprisename, shortname, documentType, taxnum, cciaa, organizecode, linkman, telephone, area, hangyeType, fixedAssetsInvestment, totalLoan}=responseText.data.enterprise;
                        this.setState({
                            hangyeName: hangyeName,
                            visible: false,
                            enterpriseName: enterprisename,
                            shortName: shortname,
                            creditAccountNum: organizecode,
                            documentType: documentType,
                            postCode: postcoding,
                            taxNum: taxnum,
                            cciaa: cciaa,
                            organizeCode: organizecode,
                            linkMan: linkman,
                            telePhone: telephone,
                            area: area,
                            hangyeType: hangyeType,
                            totalLoan: totalLoan,
                            fixedAssetsInvestment: fixedAssetsInvestment,
                            cardTypeValue: cardtype + "",
                            sexValue: sex + "",
                            legalPersonName: name,
                            cardNum: cardnumber,
                            email: selfemail,
                            cellPhone: cellphone,
                            id: responseText.data.enterprise.id,
                            legalpersonid: responseText.data.person.id,
                            shopId: shopId,
                            shopName: shopName,
                        });
                    }
                }
            });


        }
    }

    /**
     * 网络请求--获取性别
     * @private
     */
    _getSex() {

        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "性别";
        RTRequest.fetch1(url).then(responseText => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "sexItems") : Toast.message("请检查网络连接");
            }
        });
    }

    /**
     * 网络请求--获取证件类型
     * @private
     */
    _getIdCard() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then(responseText => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "cardTypeItems") : Toast.message("请检查网络连接");
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
        console.log([parameter] + "---", dataBlob);
    }

    render() {
        const {width}=Dimensions.get("window");
        const {data1, postCode, legalPersonName, hangyeName, cardNum, email, cellPhone, sexValue, cardTypeValue, enterpriseName, shortName, creditAccountNum, documentType, taxNum, cciaa, organizeCode, linkMan, telePhone, area, hangyeType, fixedAssetsInvestment, totalLoan}=this.state;
        console.log('-------------------', data1);
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                <FormInput
                    this={this}
                    data={data1}
                    e_value={enterpriseName}
                    s_value={shortName}
                    c_value={creditAccountNum}
                    t_value={taxNum}
                    cc_value={cciaa}
                    hangyeName={hangyeName}
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
                        if (documentType == 1) {
                            this.setState({organizeCode: creditAccountNum});
                        } else {
                            this.setState({creditAccountNum: organizeCode});
                        }
                    }}
                    onChangeEnterpriseNameText={(enterpriseName) => {
                        this.setState({
                            enterpriseName
                        });
                    }}
                    onChangeShortNameText={shortName => {
                        this.setState({shortName: shortName});
                    }}
                    onChangeSocialCreditText={socialCreditCode => {
                        this.setState({creditAccountNum: socialCreditCode});
                    }}
                    onChangeTaxationRegisterText={taxationRegisterNum => {
                        this.setState({taxNum: taxationRegisterNum});
                    }}
                    onChangeHangyeName={hangyeName => {
                        this.setState({hangyeName});
                    }}
                    onChangeOrganizationText={organization => {
                        this.setState({organizeCode: organization});
                    }}
                    onChangeBusinessLicenseText={(businessLicense) => {
                        this.setState({
                            cciaa: businessLicense
                        })
                    }}
                    onChangeEnterpriseConcatText={linkMan => {
                        this.setState({linkMan: linkMan});
                    }}
                    onChangeConcatPhoneText={phone => {
                        this.setState({telePhone: phone});
                    }}
                    onChangeCommunicateAreaText={area => {
                        this.setState({area: area});
                    }
                    }
                    onChangeFixedAssetsText={assets => {
                        this.setState({fixedAssetsInvestment: assets});
                    }
                    }
                    onChangeTotalLoanText={totalLoan => {
                        this.setState({totalLoan: totalLoan});
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
                    onChangeCardNumText={cardNum => {
                        this.setState({cardNum});
                    }}
                    onChangeCellPhoneText={cellPhone => {
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
                    postCode={postCode}
                    onChangePostCodeText={postCode => {
                        this.setState({postCode});
                    }}

                />
                <Loading visible={this.state.visible}/>
            </View>
        )
    }

    /**
     * 保存--(新增) 企业法人信息
     * @private
     */
    _saveEnterpriseBasicInfo = () => {
        const {
            postCode, businessType, productId, operationType, oppositeType, creater, legalPersonName, sexValue, cardNum, cardTypeValue, email, cellPhone, legalpersonid, shopId, shopName, id, enterpriseName, shortName, creditAccountNum, documentType, taxNum, cciaa, organizeCode, linkMan, telePhone, area, hangyeType, fixedAssetsInvestment, totalLoan, createrId, createdate, companyId, salesArea, ownership, opendate, employeetotal, jyplace, areaMeasure,
            belongedId, productionDate, amongEquipment, selfFinancing, averageAnnualSalesIncome, salesThisYear, liquidityBalance,
            rent, managecity, receiveMail, postcoding, customerLevel, capitalkind, registermoney, paidInMoeny, businessScope, factaddress, fax,
            financialInstitution, otherFinancing, personalLoans, assetLiabilityRatio, productSalesProfitMargin, otherEconomicIndicators,
            website,
        }=this.state;
        /*if(isEmpty(enterpriseName)){
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
         if(!Tool.isMobile(telePhone)){
         Toast.message("联系电话格式不正确");
         return;
         }
         if(!isEmpty(postCode)) {
         if (!Tool.isPostCoding(postCode)) {
         return;
         }
         }*/
        let args;
        if (documentType == 1) {
            args = creditAccountNum;
        } else {
            args = organizeCode;
        }
        let url = Config.baseApi + Config.processApi.saveEnterpriseOrLegalInfo
            + "?enterprise.id=" + id +
            "&enterprise.shortname=" + shortName +
            "&enterprise.enterprisename=" + enterpriseName +
            "&enterprise.documentType=" + documentType +
            "&enterprise.hangyeName=" +
            "&enterprise.taxnum=" + taxNum +
            "&enterprise.cciaa=" + cciaa +
            "&enterprise.linkman=" + linkMan +
            "&enterprise.organizecode=" + args +
            "&enterprise.telephone=" + telePhone +
            "&enterprise.hangyeType=" +
            "&enterprise.rootHangYeType=" +
            "&enterprise.area=" + area +
            "&enterprise.fixedAssetsInvestment=" + fixedAssetsInvestment +
            "&enterprise.totalLoan=" + totalLoan +
            "&enterprise.postcoding=" + postCode +
            "&enterprise.legalpersonid=" + legalpersonid +
            "&person.id=" + legalpersonid +
            "&person.name=" + legalPersonName +
            "&person.sex=" + sexValue +
            "&person.cardtype=" + cardTypeValue +
            "&person.cardnumber=" + cardNum +
            "&person.cellphone=" + cellPhone +
            "&person.selfemail=" + email +
            "&gudongInfo=" +
            "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
            "&oppositeType=" + oppositeType +
            "&businessType=" + businessType +
            "&productId=" + productId +
            "&operationType=" + operationType;
        RTRequest.fetch1(url).then(responseText => {
            if (responseText) {
                responseText.success ? this._success(responseText.data) : Toast.message("请检查网络连接")
            }

        });
    }

    /**
     * 网络请求失败
     * @param msg
     * @private
     */
    _fail(msg) {
        Toast.message(msg);
    }

    /**
     * 网络请求成功
     * @param responseText
     * @private
     */
    _success(msg) {
        Toast.message(msg);
        Actions.pop({refresh: {isRefresh: true, date: new Date()}});
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


/**
 * Created by Administrator on 2018\8\8 0008.
 */
