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
                    <DefaultSelect placeholder={'请选择'} name={'保证方式'} value={props.assuremodeid + ""} props={props}
                                   items={props.assuremodeidArray} onSelected={props.onSelectedAssuremodeidArray}/>
                    <DefaultChoice require name={'保证人'} valOne={props.mortgagename} action="personCustomers" props={props}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.relation} name={'与债务人关系'} props={props}
                                  onChangeText={props.onChangeRelation}/>
                    <DefaultInput placeholder={'请输入'} valOne={props.mortgageRemarks} name={'备注'} props={props}
                                  onChangeText={props.onChangeMortgageRemarks}/>
                    <DefaultInput require placeholder={'请输入'} name={'证件号码'} props={props}
                                  valOne={props.cardnumber} onChangeText={props.onChangeCardnumber}/>
                    <DefaultInput placeholder={'请输入'} name={'家庭电话'} props={props}
                                  valOne={props.cellphone} onChangeText={props.onChangeCellphone}/>
                    <DefaultInput placeholder={'请输入'} name={'家庭住址'} props={props}
                                  valOne={props.familyaddress} onChangeText={props.onChangeFamilyaddress}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.business} name={'主营业务或职务'} props={props}
                                  onChangeText={props.onChangeBusiness}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.assets} name={'主要资产'} props={props}
                                  onChangeText={props.onChangeAssets}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.assetvalue + ''} name={'资产价值：万元'} props={props}
                                  onChangeText={props.onChangeAssetvalue}/>
                    <DefaultInput border placeholder={'请输入'} valOne={props.monthlyIncome} name={'月营业额'} props={props}
                                  onChangeText={props.onChangeMonthlyIncome}/>
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
export default class PersonMortgageDetailGuarantee extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:props,
            projid: props.data.data.vars[0].projectId,//项目id
            businessType: props.data.data.vars[0].businessType,//项目id
            mortgagename: '请选择',//保证人个人
            assureofname: '',
            assuremodeidValue: '',//保证方式
            assuremodeid: '',
            assuremodeidArray: [
                {text: "一般责任", value: "607"},
                {text: "连带责任", value: "608"}
            ],
            relation: '',//债务人关系
            mortgageRemarks: '',//备注
            cardnumber: '',//营业执照
            cellphone: '',//法人电话
            familyaddress: '',//家庭地址
            business: '',//主营业务
            assets: '',//主要资产
            assetvalue: '',//资产价值
            monthlyIncome: '',//月营业额
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh1) {
            this.setState({
                assureofname: nextProps.id,
                cellphone: nextProps.cellphone,
                mortgagename: nextProps.name1,
                familyaddress: nextProps.postAddress,
                cardnumber: nextProps.cardNumber,
            });
        }
    }

    componentDidMount() {
        let url = Config.baseApi + Config.twoApi.getMortgageByType + this.props.personstype.id + '&typeid=603';
        console.log('保证担保详情url', url)
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    //查询一条保证担保数据成功后
    _render(data) {
        console.log('------------------保证担保详情：' + data.procreditMortgage.mortgagename);
        let procreditMortgage = isEmpty(data.procreditMortgage) ? '' : data.procreditMortgage;
        let person = isEmpty(data.person) ? '' : data.person;
        let procreditMortgagePerson = isEmpty(data.procreditMortgagePerson) ? '' : data.procreditMortgagePerson;
        this.setState({
            projid: this.props.data.data.vars[0].projectId,//项目id
            businessType: this.props.data.data.vars[0].businessType,//项目id
            procreditMortgageId: procreditMortgage.id,//更新使用
            mortgagename: procreditMortgage.mortgagename,//保证人个人
            assureofname: procreditMortgage.assureofname,
            assuremodeidValue: procreditMortgage.assuremodeidValue,//保证方式
            assuremodeid: procreditMortgage.assuremodeid,
            // // assuremodeidArray: [
            // //     {text: "一般责任", value: "607"},
            // //     {text: "连带责任", value: "608"}
            // // ],
            relation: procreditMortgage.relation,//债务人关系
            mortgageRemarks: procreditMortgage.mortgageRemarks,//备注
            cardnumber: person.cardnumber,//证件号码
            cellphone: person.cellphone,//法人电话
            familyaddress: person.familyaddress,//家庭地址
            business: procreditMortgagePerson.business,//主营业务
            assets: procreditMortgagePerson.assets,//主要资产
            assetvalue: procreditMortgagePerson.assetvalue,//资产价值
            monthlyIncome: procreditMortgagePerson.monthlyIncome,//月营业额
        })
    }

    _addPerson() {
        const {procreditMortgageId, projid, assureofname, businessType, mortgagename, assuremodeid, monthlyIncome, assetvalue, assets, relation, mortgageRemarks, cardnumber, cellphone, familyaddress, business}=this.state
        if (isEmpty(assuremodeid)) {
            Toast.message("请选择保证方式");
            return;
        }
        if (isEmpty(mortgagename)) {
            Toast.message("请选择保证人");
            return;
        }
        let url = Config.baseApi + Config.processApi.addMortgageBZ
            + "?procreditMortgage.projid=" + projid + ""
            + "&procreditMortgage.id=" + procreditMortgageId + ""
            + "&procreditMortgage.businessType=" + businessType
            + "&procreditMortgage.assuretypeid=606"
            + "&procreditMortgage.mortgagename=" + mortgagename
            + "&customerEnterpriseName=" + assureofname
            + "&procreditMortgage.personType=" + 603 + ""
            + "&procreditMortgage.mortgagenametypeid=" + 4 + ""
            + "&procreditMortgage.mortgagepersontypeforvalue=个人"
            + "&procreditMortgage.assuremodeid=" + assuremodeid
            + "&procreditMortgage.relation=" + relation
            + "&procreditMortgage.mortgageRemarks=" + mortgageRemarks
            + "&person.cardnumber=" + cardnumber
            + "&cardtype=310"
            + "&person.cellphone=" + cellphone
            + "&person.familyaddress=" + familyaddress
            + "&procreditMortgagePerson.business=" + business
            + "&procreditMortgagePerson.assets=" + assets
            + "&procreditMortgagePerson.assetvalue=" + assetvalue
            + "&procreditMortgagePerson.monthlyIncome=" + monthlyIncome
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
        const {procreditMortgageId,data, mortgagename, assuremodeid, assuremodeidArray, relation, mortgageRemarks, cardnumber, cellphone, familyaddress, business, assets, assetvalue, monthlyIncome} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <FormInput
                    data={data}
                    that={this}
                    procreditMortgageId={procreditMortgageId}
                    mortgagename={mortgagename}
                    assuremodeidArray={assuremodeidArray}
                    assuremodeid={assuremodeid}
                    onSelectedAssuremodeidArray={(item) => {
                        this.setState({
                            assuremodeidValue: item.text,
                            assuremodeid: item.value,
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})