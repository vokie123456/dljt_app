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
import {Input, Select} from 'teaset';
import Modal from 'react-native-modalbox';
import SmallButton  from '../../Component/SmallButton'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data.props;
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
                    backgroundColor: !inputDisabled ? props.disabled ? '#fffdcc' : 'transparent' : '#fffdcc',
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={!inputDisabled ? props.disabled ? false : true : false}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    const {selectDisabled} =   props.props.data.props;
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
                    backgroundColor: !selectDisabled ? props.disable ? 'transparent' : '#fffdcc' : '#fffdcc',
                }}
                size='md'
                pickerType='popover'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                disabled={!selectDisabled ? props.disable ? false : true : true}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    const {defaultChecked} =    props.props.data.props;
    return  (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text
                disabled={defaultChecked?true:false}
                onPress={()=>Actions[props.action].call()} style={{
                backgroundColor: defaultChecked?'#fffdcc':'transparent',
                borderColor: 'transparent',
                textAlign: 'left',
                flex: 1,
                paddingLeft: 0,
                marginRight: px2dp(36),
                color:'#333'
            }}
            >{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    const {selectDisabled} = props.data.props;
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultSelect placeholder={'请选择'} name={'保证方式'} value={props.assuremodeid+""} props={props}
                                   items={props.assuremodeidArray} onSelected={props.onSelectedAssuremodeidArray}/>
                    <DefaultChoice require name={'保证人'} valOne={props.mortgagename} action="QueryEnterprise" props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.relation} name={'与债务人关系'}
                                  onChangeText={props.onChangeRelation} props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.mortgageRemarks} name={'备注'}
                                  onChangeText={props.onChangeMortgageRemarks} props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.cciaa} name={'营业执照号码'}
                                  onChangeText={props.onChangeCciaa} props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.telephone} name={'联系电话'}
                                  onChangeText={props.onChangeTelephone} props={props}/>
                    <DefaultChoice name={'法人代表'} valOne={props.legalperson_en} action="PersonSelectCustomer" props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.cellphone} name={'法人代表电话'}
                                  onChangeText={props.onChangeCellphone} props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.area} name={'公司地址'}
                                  onChangeText={props.onChangeArea} props={props}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.business} name={'主营业务'}
                                  onChangeText={props.onChangeBusiness} props={props}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.assets} name={'主要资产'}
                                  onChangeText={props.onChangeAssets} props={props}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.netassets+""} name={'资产价值：万元'}
                                  onChangeText={props.onChangeNetassets} props={props}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.monthlyIncome} name={'月营业额'}
                                  onChangeText={props.onChangeMonthlyIncome} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {selectDisabled?<View/>:<View style={{
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
export default class CustomerMortgageDetailGuarantee extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:props,
            id: props.personstype.id,
            projid: props.personstype.projid,//项目id
            assureofname: '',//项目id
            businessType: '',//项目id
            mortgagename: '',//保证人公司
            assuremodeidValue: '',//保证方式
            assuremodeid: '',
            assuremodeidArray: [
                {text: "一般责任", value: "607"},
                {text: "连带责任", value: "608"}
            ],
            relation: '',//债务人关系
            mortgageRemarks: '',//备注
            cciaa: '',//营业执照
            legalperson_en: '',//法人代表
            // legalpersonid: props.data.allData.acceptEnterprise.legalpersonid,//法人代表
            // telephone: props.data.allData.acceptPerson.telephone,//联系电话
            // cellphone: props.data.allData.acceptPerson.cellphone,//法人电话
            area: '',//公司地址
            business: '',//主营业务
            assets: '',//主要资产
            netassets: '',//资产价值
            monthlyIncome: '',//月营业额
        };
    }

    componentDidMount(){
        let url = Config.baseApi + Config.twoApi.getMortgageByType  + this.props.personstype.id+'&typeid=602';
        console.log('保证担保详情url',url)
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if (nextProps.isRefresh) {
            this.setState({
                id: nextProps.popData.id,
                area: nextProps.popData.area,
                mortgagename: nextProps.popData.enterprisename,
                legalperson_en: nextProps.popData.legalpersonName,
                legalpersonid: nextProps.popData.legalpersonid,
                cciaa: nextProps.popData.cciaa,
                cellphone: nextProps.popData.cellphone,
                telephone: nextProps.popData.telephone,
            });
        }
    }

    //查询一条保证担保数据成功后
    _render(data){
        let procreditMortgage=isEmpty(data.procreditMortgage)?'':data.procreditMortgage;
        let enterpriseView=isEmpty(data.enterpriseView)?'':data.enterpriseView;
        let procreditMortgageEnterprise=isEmpty(data.procreditMortgageEnterprise)?'':data.procreditMortgageEnterprise;
        this.setState({
            procreditMortgageId: procreditMortgage.id,//修改编辑用
            relation: procreditMortgage.relation,//债务人关系
            mortgageRemarks: procreditMortgage.mortgageRemarks,//备注
            cciaa: enterpriseView.cciaa,//营业执照
            legalperson_en: enterpriseView.legalperson,//法人代表
            legalpersonid: enterpriseView.legalpersonid,//法人代表
            telephone: enterpriseView.telephone,//联系电话
            cellphone: data.tel,//法人电话
            area:enterpriseView.area,//公司地址
            business: procreditMortgageEnterprise.business,//主营业务
            assets: procreditMortgageEnterprise.assets,//主要资产
            netassets: procreditMortgageEnterprise.netassets,//资产价值
            monthlyIncome:procreditMortgageEnterprise.monthlyIncome,//月营业额
            id: procreditMortgage.id,
            projid: procreditMortgage.projid,//项目id
            assureofname: procreditMortgage.assureofname,//项目id
            businessType: procreditMortgage.businessType,//项目id
            mortgagename: procreditMortgage.mortgagename,//保证人公司
            assuremodeidValue: procreditMortgage.assuremodeidValue,//保证方式
            assuremodeid: procreditMortgage.assuremodeid,
            // assuremodeidArray: [
            //     {text: "一般责任", value: "607"},
            //     {text: "连带责任", value: "608"}
            // ],
        })
    }

    _addCustomer() {
        const {procreditMortgageId,assureofname,projid,mortgagename,businessType,assuremodeid,id,monthlyIncome,netassets,legalperson_en,legalpersonid,assets,relation,mortgageRemarks,cciaa,telephone,cellphone,area,business}=this.state
        if (isEmpty(assuremodeid)) {
            Toast.message("请选择保证方式");
            return;
        }
        if (isEmpty(mortgagename)) {
            Toast.message("请选择保证人");
            return;
        }
        //
        let url = Config.baseApi + Config.processApi.addMortgageBZ
            + "?procreditMortgage.projid=" + projid + ""
            + "&procreditMortgage.id=" + procreditMortgageId + ""
            + "&procreditMortgage.businessType=" + businessType
            + "&procreditMortgage.assuretypeid=606"
            + "&procreditMortgage.mortgagename=" + mortgagename
            + "&procreditMortgage.personType=" + 602 + ""
            + "&procreditMortgage.mortgagenametypeid=" + 3 + ""
            + "&procreditMortgage.mortgagepersontypeforvalue=无限连带责任-公司"
            + "&procreditMortgage.assuremodeid=" + assuremodeid
            + "&customerEnterpriseName=" + assureofname + ""
            + "&procreditMortgage.relation=" + relation
            + "&procreditMortgage.mortgageRemarks=" + mortgageRemarks
            + "&enterprise.cciaa=" + cciaa
            + "&legalperson_en=" + legalperson_en
            + "&legalpersonid=" + legalpersonid
            + "&enterprise.telephone=" + telephone
            + "&person.cellphone=" + cellphone
            + "&enterprise.area=" + area
            + "&procreditMortgageEnterprise.business=" + business
            + "&procreditMortgageEnterprise.assets=" + assets
            + "&procreditMortgageEnterprise.netassets=" + netassets
            + "&procreditMortgageEnterprise.monthlyIncome=" + monthlyIncome
            + "&procreditMortgagePerson.a=防止报空";
        console.log("nextProps", url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络");
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {mortgagename,legalperson_en,data,assuremodeid, assuremodeidArray,relation,mortgageRemarks,cciaa,telephone,cellphone,area,business,assets,netassets,monthlyIncome} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <ScrollView style={{borderWidth: hair, borderColor: '#797979'}}>
                    <FormInput
                        data={data}
                        mortgagename={mortgagename}
                        legalperson_en={legalperson_en}
                        assuremodeidArray={assuremodeidArray}
                        assuremodeid={assuremodeid}
                        onSelectedAssuremodeidArray={(item) => {
                                this.setState({
                                    assuremodeidValue: item.text,
                                    assuremodeid:item.value,
                                })
                           }}
                        relation={relation}
                        onChangeRelation={(relation) => {
                            this.setState({
                                relation
                            })
                        }}
                        mortgageRemarks={mortgageRemarks}
                        onChangeMortgageRemarks={(mortgageRemarks) => {
                            this.setState({
                                mortgageRemarks
                            })
                        }}
                        cciaa={cciaa}
                        onChangeCciaa={(cciaa) => {
                            this.setState({
                                cciaa
                            })
                        }}
                        telephone={telephone}
                        onChangeTelephone={(telephone) => {
                            this.setState({
                                telephone
                            })
                        }}
                        cellphone={cellphone}
                        onChangeCellphone={(cellphone) => {
                            this.setState({
                                cellphone
                            })
                        }}
                        area={area}
                        onChangeArea={(area) => {
                            this.setState({
                                area
                            })
                        }}
                        business={business}
                        onChangeBusiness={(business) => {
                            this.setState({
                                business
                            })
                        }}
                        assets={assets}
                        onChangeAssets={(assets) => {
                            this.setState({
                                assets
                            })
                        }}
                        netassets={netassets}
                        onChangeNetassets={(netassets) => {
                            this.setState({
                                netassets
                            })
                        }}
                        monthlyIncome={monthlyIncome}
                        onChangeMonthlyIncome={(monthlyIncome) => {
                            this.setState({
                                monthlyIncome
                            })
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})