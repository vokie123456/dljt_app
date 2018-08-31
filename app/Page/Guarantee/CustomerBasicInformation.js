/**
 * Created by Administrator on 2018\8\3 0003.
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
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
import Loading from '../../Component/Loading'
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: props.disabled?"#fffdcc":(inputDisabled? '#fffdcc' : 'transparent'),
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={inputDisabled?false:true}
                value={props.valOne}
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
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0,
                    backgroundColor: selectDisabled? '#fffdcc' : 'transparent',}}
                size='md'
                pickerType='popover'
                disabled={selectDisabled}
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
    return  (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
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

const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput disabled={true} require name={'客户姓名'} placeholder={'客户姓名'} valOne={props.name} props={props}/>
                    <DefaultSelect require placeholder={'请选择客户性别'} name={'客户性别'} value={(isEmpty(props.sexTypeValue)?props.sexTypeValue:props.sexTypeValue+"")}
                                   items={props.sexType} onSelected={props.onSelectedSexType} props={props}/>
                    <DefaultSelect require placeholder={'请选择婚姻状况'} name={'婚姻状况'} value={(isEmpty(props.marriageTypeValue)?props.marriageTypeValue:props.marriageTypeValue+"")}
                                   items={props.marriageType} onSelected={props.onSelectedMarriageType} props={props}/>
                    <DefaultSelect require placeholder={'请选择证件类型'} name={'证件类型'} value={(isEmpty(props.certificateTypeValue)?props.certificateTypeValue:props.certificateTypeValue+"")}
                                   items={props.certificateType} onSelected={props.onSelectedCertificateType} props={props}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber} props={props}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入手机号码'} name={'手机号码'}
                                  valOne={props.cellphone} onChangeText={props.onChangeCellphone} props={props}/>
                    <DefaultInput border require placeholder={'请输入通讯地址'} name={'通讯地址'}
                                  valOne={props.postAddress} onChangeText={props.onChangePostAddress} props={props}/>
                    <DefaultInput placeholder={'请输入邮政编码'} name={'邮政编码'}
                                  valOne={props.postcode} onChangeText={props.onChangePostcode} props={props}/>
                    <DefaultInput placeholder={'请输入电子邮箱'} name={'电子邮箱'}
                                  valOne={props.selfEmail} onChangeText={props.onChangeSelfEmail} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {props.data.selectDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._savePerson()} />}
        </ScrollView>
    )
}

export default class CustomerBasicInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
            personId:props.data.allData.person.id,
            data: props,
            //性别
            id: '',
            name: null,
            nameId: '',
            sexType: [],
            sexTypeKey: null,
            sexTypeValue: null,
            //婚姻状况
            marriageType: [],
            marriageTypeKey: null,
            marriageTypeValue: null,
            //证件类型
            certificateType: [],
            certificateTypeKey: null,
            certificateTypeValue: null,
            cardNumber: "",
            cellphone: "",
            postAddress: "",
            postcode: "",
            selfEmail: "",
        };
    }
    componentDidMount() {
        this._seeInfo();//个人客户信息
        this._sex();//性别  参数{性别}
        this._marriage();//婚姻状况  参数{婚姻状况}
        this._certificate();//证件类型  参数{证件类型}
    }
    _seeInfo (){
        const {personId} = this.state;
        let url = Config.baseApi + Config.processApi.getByIdPerson+"?personId="+personId;//个人客户信息
        this.setState({
            visible: true
        })
        RTRequest.fetch1(url).then((responseText) => {
            this.setState({
                visible: false
            })
            if (responseText) {
                console.log('个人客户信息', responseText);
                responseText.success ? this._upDataPer(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }
    _upDataPer(state) {
        console.log("state",state)
        const {sex,cardtype,marry,cellphone,postaddress,postcode,selfemail,cardnumber,name,id} = state;
        this.setState({name});
        this.setState({id});
        if(!isEmpty(sex)) {
            this.setState({sexTypeValue:sex});
        }
        if(!isEmpty(marry)) {
            this.setState({marriageTypeValue:marry});
        }
        if(!isEmpty(cardtype)) {
            this.setState({certificateTypeValue:cardtype+""});
        }
        if(!isEmpty(cellphone)) {
            this.setState({cellphone})
        }
        if(!isEmpty(postaddress)) {
            this.setState({
                postAddress:postaddress
            })
        }
        if(!isEmpty(postcode)) {
            this.setState({postcode})
        }
        if(!isEmpty(selfemail)) {
            this.setState({
                selfEmail:selfemail
            })
        }
        if(!isEmpty(cardnumber)) {
            this.setState({
                cardNumber:cardnumber
            })
        }

    }
    _sex (){
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "性别";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('性别', responseText);
                responseText.success ? this._key1(responseText.result, "sexType") : Toast.message(responseText.msg);
            }
        })
    }
    _marriage (){
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "婚姻状况";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('婚姻状况', responseText);
                responseText.success ? this._key1(responseText.result, "marriageType") : Toast.message(responseText.msg);
            }
        })
    }
    _certificate (){
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('证件类型', responseText);
                responseText.success ? this._key1(responseText.result, "certificateType") : Toast.message(responseText.msg);
            }
        })
    }
    _key1 = (list,parameter) => {
        console.log(parameter+"list",list);
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
        console.log([parameter]+"---",dataBlob);
    }
    _savePerson=()=>{
        console.log("this.state",this.state);
        const {id,sexTypeValue,marriageTypeValue,certificateTypeValue,name,cardNumber,cellphone,postcode,selfEmail,postAddress} = this.state;

        if(isEmpty(name)){
            Toast.message('客户姓名不能为空');
            return;
        }

        if(isEmpty(sexTypeValue)){
            Toast.message('客户性别必填');
            return;
        }

        if(isEmpty(marriageTypeValue)){
            Toast.message('婚姻状况必填');
            return;
        }

        if(isEmpty(certificateTypeValue)){
            Toast.message('证件类型必填');
            return;
        }

        if(isEmpty(cardNumber)){
            Toast.message("证件号码不能为空");
            return;
        }
        if(certificateTypeValue==='309'){
            if(!Tool.isIdCard(cardNumber)){
                return;
            }
        }
        if(!Tool.isMobile(cellphone)){
            return;
        }
        if(isEmpty(postAddress)){
            Toast.message("通讯地址不能为空");
            return;
        }
        let url = Config.baseApi + Config.processApi.updateInfo +
            '?person.id='+ id +
            '&person.name='+ name +
            '&person.sex='+ sexTypeValue +
            '&person.marry='+ marriageTypeValue +
            '&person.cardtype='+ certificateTypeValue +
            '&person.cardnumber='+ cardNumber +
            '&person.cellphone='+ cellphone +
            '&person.postcode='+ postcode +
            '&person.selfemail='+ selfEmail +
            '&person.postaddress='+ postAddress

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }
    _SUCCESS(){
        Toast.message("保存成功");
        Actions.pop({refresh:({isRefresh:true,date1: new Date()})});
    }
    render() {
        console.log("this.state",this.state);
        const {name,data,postcode,selfEmail,postAddress,cellphone,cardNumber,sexType,sexTypeValue,marriageType,marriageTypeValue,certificateType,certificateTypeValue} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    name={name}
                    data={data}
                    sexType={sexType}
                    sexTypeValue={sexTypeValue}
                    onSelectedSexType={(item, index) => {
                        this.setState({
                            sexTypeValue: item.value
                        })
                    }}
                    marriageType={marriageType}
                    marriageTypeValue={marriageTypeValue}
                    onSelectedMarriageType={(item, index) => {
                        this.setState({
                            marriageTypeValue: item.value
                        })
                    }}
                    certificateType={certificateType}
                    certificateTypeValue={certificateTypeValue}
                    onSelectedCertificateType={(item, index) => {
                        this.setState({
                            certificateTypeValue: item.value
                        })
                    }}
                    cardNumber={cardNumber}
                    onChangeCardNumber={(text) => {
                        this.setState({
                            cardNumber: text
                        })
                    }}
                    cellphone={cellphone}
                    onChangeCellphone={(text) => {
                        this.setState({
                            cellphone: text
                        })
                    }}
                    postcode={postcode}
                    onChangePostcode={(text) => {
                        this.setState({
                            postcode: text
                        })
                    }}
                    selfEmail={selfEmail}
                    onChangeSelfEmail={(text) => {
                        this.setState({
                            selfEmail: text
                        })
                    }}
                    postAddress={postAddress}
                    onChangePostAddress={(text) => {
                        this.setState({
                            postAddress: text
                        })
                    }}
                    this1={this}
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


