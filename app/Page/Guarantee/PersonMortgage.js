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
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
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
    console.log("DefaultSelect", props.value);
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80),
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
            borderBottomWidth: props.border ? 0 : hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={() => Actions[props.action].call()} style={{
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
const FormInput = (props) => {
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultSelect  placeholder={'请选择'} name={'保证方式'} value={props.assuremodeid+""}
                                    items={props.assuremodeidArray} onSelected={props.onSelectedAssuremodeidArray}/>
                    <DefaultChoice require name={'保证人'} valOne={props.mortgagename} action="PersonSelectCustomer"/>
                    <DefaultInput  placeholder={'请输入'} name={'与债务人关系'} onChangeText={props.onChangeRelation}/>
                    <DefaultInput  placeholder={'请输入'} name={'备注'} onChangeText={props.onChangeMortgageRemarks}/>
                    <DefaultInput require placeholder={'请输入'} name={'证件号码'}
                                  valOne={props.cardnumber} onChangeText={props.onChangeCardnumber}/>
                    <DefaultInput placeholder={'请输入'} name={'家庭电话'}
                                  valOne={props.cellphone} onChangeText={props.onChangeCellphone}/>
                    <DefaultInput placeholder={'请输入'} name={'家庭住址'}
                                  valOne={props.familyaddress} onChangeText={props.onChangeFamilyaddress}/>
                    <DefaultInput  border placeholder={'请输入'} name={'主营业务或职务'} onChangeText={props.onChangeBusiness}/>
                    <DefaultInput  border placeholder={'请输入'} name={'主要资产'} onChangeText={props.onChangeAssets}/>
                    <DefaultInput border placeholder={'请输入'} name={'资产价值：万元'} onChangeText={props.onChangeAssetvalue}/>
                    <DefaultInput  border placeholder={'请输入'} name={'月营业额'} onChangeText={props.onChangeMonthlyIncome}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

export default class PersonMortgageGuarantee extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            projid:props.allData.data.vars[0].projectId,//项目id
            businessType:props.allData.data.vars[0].businessType,//项目id
            mortgagename:'请选择',//保证人个人
            assureofname:'',
            assuremodeidValue: '',//保证方式
            assuremodeid: '',
            assuremodeidArray: [
                {text: "一般责任", value: "607"},
                {text: "连带责任", value: "608"}
            ],
            relation:'',//债务人关系
            mortgageRemarks:'',//备注
            cardnumber:'',//营业执照
            cellphone:'',//法人电话
            familyaddress:'',//家庭地址
            business:'',//主营业务
            assets:'',//主要资产
            assetvalue:'',//资产价值
            monthlyIncome:'',//月营业额
        };

    }

    componentWillReceiveProps(nextProps) {
        console.log("next",nextProps);
        if (nextProps.isRefresh2) {
            this.setState({
                assureofname: nextProps.id,
                cellphone: nextProps.cellphone,
                mortgagename: nextProps.key1,
                familyaddress: nextProps.postaddress,
                cardnumber: nextProps.cardnumber,
            });
        }
    }

    _addPerson() {
        const {projid,assureofname,businessType,mortgagename,assuremodeid,monthlyIncome,assetvalue,assets,relation,mortgageRemarks,cardnumber,cellphone,familyaddress,business}=this.state
        if (isEmpty(assuremodeid)) {
            Toast.message("请选择保证方式");
            return;
        }
        if (isEmpty(mortgagename)) {
            Toast.message("请选择保证人");
            return;
        }
        let url = Config.baseApi + Config.processApi.addMortgageBZ
            + "?procreditMortgage.projid="+projid+""
            + "&procreditMortgage.businessType="+businessType
            + "&procreditMortgage.assuretypeid=606"
            + "&procreditMortgage.mortgagename=" + mortgagename
            + "&customerEnterpriseName=" + assureofname
            + "&procreditMortgage.personType=" + 603 +""
            + "&procreditMortgage.mortgagenametypeid=" + 4 +""
            + "&procreditMortgage.mortgagepersontypeforvalue=个人"
            + "&procreditMortgage.assuremodeid=" + assuremodeid
            + "&procreditMortgage.relation=" + relation
            + "&procreditMortgage.mortgageRemarks=" + mortgageRemarks
            + "&enterprise.cardnumber=" + cardnumber
            + "&cardtype=302"
            + "&person.cellphone=" + cellphone
            + "&enterprise.familyaddress=" + familyaddress
            + "&procreditMortgageEnterprise.business=" + business
            + "&procreditMortgageEnterprise.assets=" + assets
            + "&procreditMortgageEnterprise.assetvalue=" + assetvalue
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
        const {mortgagename,assuremodeid, assuremodeidArray,relation,mortgageRemarks,cardnumber,cellphone,familyaddress,business,assets,assetvalue,monthlyIncome} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{borderWidth: hair, borderColor: '#797979'}}>
                    <FormInput
                        that={this}
                        mortgagename={mortgagename}
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
                        cardnumber={cardnumber}
                        onChangeCardnumber={(cardnumber) => {
                            this.setState({
                                cardnumber
                            })
                        }}
                        cellphone={cellphone}
                        onChangeCellphone={(cellphone) => {
                            this.setState({
                                cellphone
                            })
                        }}
                        familyaddress={familyaddress}
                        onChangeFamilyaddress={(familyaddress) => {
                            this.setState({
                                familyaddress
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
                        assetvalue={assetvalue}
                        onChangeAssetvalue={(assetvalue) => {
                            this.setState({
                                assetvalue
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
                <SmallButton name="保存" height={75} width={250} onPress={() => this._addPerson()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


