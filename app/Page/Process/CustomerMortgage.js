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
import {Input, Select} from 'teaset';
import Modal from 'react-native-modalbox';
import SmallButton  from '../../Component/SmallButton'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80)
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
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                size='md'
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
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={() => Actions[props.action].call()} style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textAlign: 'left',
                flex: 1,
                width: px2dp(300),
                paddingLeft: 0
            }}>{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultSelect  placeholder={'请选择'} name={'保证方式'} value={props.assuremodeid+""}
                                   items={props.assuremodeidArray} onSelected={props.onSelectedAssuremodeidArray}/>
                    <DefaultChoice require name={'保证人'} valOne={props.mortgagename} action="QueryEnterprise"/>
                    <DefaultInput  placeholder={'请输入'} name={'与债务人关系'} onChangeText={props.onChangeRelation}/>
                    <DefaultInput  placeholder={'请输入'} name={'备注'} onChangeText={props.onChangeMortgageRemarks}/>
                    <DefaultInput  placeholder={'请输入'} valOne={props.cciaa} name={'营业执照号码'} onChangeText={props.onChangeCciaa}/>
                    <DefaultInput  placeholder={'请输入'} valOne={props.telephone} name={'联系电话'} onChangeText={props.onChangeTelephone}/>
                    <DefaultChoice  name={'法人代表'} valOne={props.legalperson_en}/>
                    <DefaultInput  placeholder={'请输入'} valOne={props.cellphone} name={'法人代表电话'} onChangeText={props.onChangeCellphone}/>
                    <DefaultInput  placeholder={'请输入'} valOne={props.area} name={'公司地址'} onChangeText={props.onChangeArea}/>
                    <DefaultInput  border placeholder={'请输入'} name={'主营业务'} onChangeText={props.onChangeBusiness}/>
                    <DefaultInput  border placeholder={'请输入'} name={'主要资产'} onChangeText={props.onChangeAssets}/>
                    <DefaultInput  border placeholder={'请输入'} name={'资产价值：万元'} onChangeText={props.onChangeNetassets}/>
                    <DefaultInput  border placeholder={'请输入'} name={'月营业额'} onChangeText={props.onChangeMonthlyIncome}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class CustomerMortgage extends Component {

    // 构造
    constructor(props) {
        super(props);
        console.log("nextProps>",props);
        // 初始状态
        this.state = {
            projid:props.allData.data.vars[0].projectId,//项目id
            businessType:props.allData.data.vars[0].businessType,//项目id
            mortgagename:'请选择',//保证人公司
            id:'',//保证人公司id
            assuremodeidValue: '',//保证方式
            assuremodeid: '',
            assuremodeidArray: [
                {text: "一般责任", value: "607"},
                {text: "连带责任", value: "608"}
            ],
            relation:'',//债务人关系
            mortgageRemarks:'',//备注
            cciaa:'',//营业执照
            legalperson_en:'请选择',//法人代表
            legalpersonid:'',//法人代表
            telephone:'',//联系电话
            cellphone:'',//法人电话
            area:'',//公司地址
            business:'',//主营业务
            assets:'',//主要资产
            netassets:'',//资产价值
            monthlyIncome:'',//月营业额
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps",nextProps);
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
    _addCustomer() {
        const {projid,mortgagename,businessType,assuremodeid,id,monthlyIncome,netassets,legalperson_en,legalpersonid,assets,relation,mortgageRemarks,cciaa,telephone,cellphone,area,business}=this.state
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
            + "?procreditMortgage.projid="+projid+""
            + "&procreditMortgage.businessType="+businessType
            + "&procreditMortgage.assuretypeid=606"
            + "&procreditMortgage.mortgagename=" + mortgagename
            + "&procreditMortgage.personType=" + 602+""
            + "&procreditMortgage.mortgagenametypeid=" + 3+""
            + "&procreditMortgage.mortgagepersontypeforvalue=无限连带责任-公司"
            + "&procreditMortgage.assuremodeid=" + assuremodeid
            + "&customerEnterpriseName=" + id+""
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
        console.log("nextProps",url);
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
        const {mortgagename,legalperson_en,assuremodeid, assuremodeidArray,relation,mortgageRemarks,cciaa,telephone,cellphone,area,business,assets,netassets,monthlyIncome} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{borderWidth: hair, borderColor: '#797979'}}>
                    <FormInput
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
                <SmallButton name="保存" height={75} width={250} onPress={() => this._addCustomer()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


