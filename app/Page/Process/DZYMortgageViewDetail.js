/**
 * Created by duansailong on 2018/3/19.
 */
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
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {Input, Select, SearchInput, Wheel} from 'teaset';

const SECTIONS = [
    {
        index: 0,
        title: '抵质押物基本信息',
    },
    // {
    //     index: 1,
    //     title: '车辆详细信息',
    // }
];

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),paddingLeft: px2dp(10)
        }}>
            <Text style={{width: px2dp(240), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: "#fffdcc",
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={!isEmpty(props.valOne)?props.valOne+"":'尚未填写'}
                placeholder={props.placeholder}
                editable={false}
                // onChangeText={(text)=>{
                //     props.that.setState({[props.parms]: text});
                // }}
            />
        </View>
    )
}

export default class DZYMortgageViewDetail extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        console.log("props+-+-+-+-+-+-+-+-",props)
        super(props);
        // 初始状态
        this.state = {
            text1: '',
            text2: '',
            prodData: null,
            data: props.data
        };
    }

    componentDidMount() {
        this.setState({})
        this._seeInfo();
    }

    _seeInfo (){
        let url = Config.baseApi + Config.processApi.seeVehicle+this.props.data.id;//个人客户信息
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获取抵押详情', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }
    _render = (list) => {
        // console.log("list",list);
        // let dataBlob = [];
        // let i = 0;
        // list.map(function (item,index) {
        //     dataBlob.push({
        //         key: i,
        //         value: item,
        //     });
        //     i++;
        // });
        this.setState({
            prodData:list,
        });
        console.log("list",this.state.prodData);
    }
    _renderHeader(section, index, isActive, sections) {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{ flex: 1,height: px2dp(70), borderBottomColor: '#ddd', borderBottomWidth: px2dp(1),justifyContent: 'center', backgroundColor: (isActive ? '#f9f9f9' : '#fff') }}>
                <Text style={{color: '#0000ff',paddingLeft: px2dp(20), fontSize: px2dp(26)}}>{section.title}</Text>
            </Animatable.View>
        );
    }
    _renderContent(section, i, isActive, sections,that) {
        console.log("that",this.state)
        const {projnum, projname, enterprisename, assureofnameEnterOrPerson, mortgagepersontypeforvalue, personTypeValue, finalprice, valuationMechanism, assuretypeidValue, assuremoney, finalCertificationPrice, valuationTime, relation,} = this.state.prodData.vProcreditDictionary;
        // const {carManufacturer,carStyle,carNumber,carModel,engineNo,displacementValue,vin,configuration,carprice,seatingValue,haveusedtime,enregisterInfoIdValue,totalkilometres,leavefactorydate,exchangepriceone,exchangepricetow} = this.state.prodData.vProjMortCar;
        if (i === 0) {
            return (
                <Animatable.View
                    duration={300}
                    transition="backgroundColor"
                    style={{backgroundColor: (isActive ? '#fff' : 'rgba(245,252,255,1)')}}>
                    <DefaultInput placeholder={'尚未填写'} name={'项目编号：'} valOne={projnum}/>
                    <DefaultInput placeholder={'尚未填写'} name={'项目名称：'} valOne={projname}/>
                    <DefaultInput placeholder={'尚未填写'} name={'企业名称：'} valOne={enterprisename}/>
                    <DefaultInput placeholder={'尚未填写'} name={'所有权人：'} valOne={assureofnameEnterOrPerson}/>
                    <DefaultInput placeholder={'尚未填写'} name={'抵押物类型：'} valOne={mortgagepersontypeforvalue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'担保类型：'} valOne={assuretypeidValue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'所有人类型：'} valOne={personTypeValue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'抵质押率：'} valOne={assuremoney}/>
                    <DefaultInput placeholder={'尚未填写'} name={'评估价值：'} valOne={finalprice}/>
                    <DefaultInput placeholder={'尚未填写'} name={'公允价值：'} valOne={finalCertificationPrice}/>
                    <DefaultInput placeholder={'尚未填写'} name={'市场价值：'} valOne={valuationMechanism}/>
                    <DefaultInput placeholder={'尚未填写'} name={'获取时间：'} valOne={valuationTime}/>
                    <DefaultInput placeholder={'尚未填写'} name={'与借款人关系：'} valOne={relation}/>
                </Animatable.View>
            );
        } else if (1 === 1) {
            return (
                <Animatable.View
                    duration={300}
                    transition="backgroundColor"
                    style={{backgroundColor: (isActive ? '#fff' : 'rgba(245,252,255,1)')}}>
                    <DefaultInput placeholder={'尚未填写'} name={'制造商：'} valOne={carManufacturer}/>
                    <DefaultInput placeholder={'尚未填写'} name={'车系：'} valOne={carStyle}/>
                    <DefaultInput placeholder={'尚未填写'} name={'车型编号：'} valOne={carNumber}/>
                    <DefaultInput placeholder={'尚未填写'} name={'车型：'} valOne={carModel}/>
                    <DefaultInput placeholder={'尚未填写'} name={'发动机号：'} valOne={engineNo}/>
                    <DefaultInput placeholder={'尚未填写'} name={'排量：'} valOne={displacementValue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'车架号：'} valOne={vin}/>
                    <DefaultInput placeholder={'尚未填写'} name={'配置：'} valOne={configuration}/>
                    <DefaultInput placeholder={'尚未填写'} name={'新车价格：'} valOne={carprice}/>
                    <DefaultInput placeholder={'尚未填写'} name={'座位数：'} valOne={seatingValue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'使用时间：'} valOne={haveusedtime}/>
                    <DefaultInput placeholder={'尚未填写'} name={'登记情况：'} valOne={enregisterInfoIdValue}/>
                    <DefaultInput placeholder={'尚未填写'} name={'里程数：'} valOne={totalkilometres}/>
                    <DefaultInput placeholder={'尚未填写'} name={'出厂日期：'} valOne={leavefactorydate}/>
                    <DefaultInput placeholder={'尚未填写'} name={'市场交易价格1：'} valOne={exchangepriceone}/>
                    <DefaultInput placeholder={'尚未填写'} name={'市场交易价格2：'} valOne={exchangepricetow}/>
                </Animatable.View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <ScrollView>
                    {this.state.prodData&&
                    <Accordion
                        sections={SECTIONS}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent.bind(this)}
                        that={this}
                    />
                 }
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


