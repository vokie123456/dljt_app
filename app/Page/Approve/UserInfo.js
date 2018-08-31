/**
 * Created by duansailong on 2018/3/9.
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
import {Input, Select} from 'teaset';
import SmallButton  from '../../Component/SmallButton';
import DatePicker from 'react-native-datepicker';
import Title from '../../Component/Title';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(90)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
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
    console.log("DefaultSelect",props.value);
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(90),
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
    return  (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(90),
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
const DatePicker1 = (props) => {
    // const {datePickerDisabled} =  props.props.data;
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200,
                }}
                date={props.props.birthday}
                mode="date"
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                minDate="1918-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                disabled={false}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    {/*<DefaultChoice name={'客户姓名'} valOne={props.name} action="personCustomers"/>*/}
                    <DefaultInput require placeholder={'请输入证件号码'} name={'客户姓名'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber}/>
                    <DefaultSelect require placeholder={'请选择证件类型'} name={'证件类型'} value={props.certificateTypeValue}
                                   items={props.certificateType} onSelected={props.onSelectedCertificateType}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber}/>
                    <DefaultSelect placeholder={'请选择性别'} name={'性别'} value={props.sexTypeValue}
                                   items={props.sexType} onSelected={props.onSelectedSexType}/>
                    <DatePicker1 props={props} name={"出生日期"} onChangeDate={props.onSelectedDateStatus}/>
                    <DefaultSelect placeholder={'请选择婚姻状况'} name={'民族'} value={props.marriageTypeValue}
                                   items={props.marriageType} onSelected={props.onSelectedMarriageType}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入手机号码'} name={'手机号码'}
                                  valOne={props.cellphone} onChangeText={props.onChangeCellphone}/>
                    <DefaultSelect require placeholder={'请选择性别'} name={'婚姻状况'} value={props.sexTypeValue}
                                   items={props.sexType} onSelected={props.onSelectedSexType}/>
                    <DefaultInput border placeholder={'请输入通讯地址'} name={'通讯地址'}
                                  valOne={props.postAddress} onChangeText={props.onChangePostAddress}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class UserInfo extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("上个页面参数",props.data);
        // 初始状态
        this.state = {
            //性别
            sexType: [],
            sexTypeKey: null,
            sexTypeValue: null,
            //婚姻状况
            marriageType: [],
            marriageTypeKey: null,
            marriageTypeValue: null,
            //民族
            national: [],
            nationalKey: null,
            nationalValue: null,
            //证件类型
            certificateType: [],
            certificateTypeKey: null,
            certificateTypeValue: null,
            userIds: '',
            name: '',//客户姓名
            nameKey: null,//客户id
            cardNumber: null,//证件号码
            cellphone: null,//手机号码
            birthday: '',//出生日期
            postAddress: null,//通讯地址

        };

    }

    componentWillMount() {
    }
    componentDidMount() {
        this._sex();//性别  参数{性别}
        this._marriage();//婚姻状况  参数{婚姻状况}
        this._certificate();//证件类型  参数{证件类型}
        this._asyncAppStatus();
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        const {id,name1,sex,sexValue,marry,cardtype,cardtypevalue,cardNumber,cellphone,postAddress} = nextProps;
        if(nextProps.isRefresh){
            this.setState({
                name:name1,
                nameKey: id,
                sexTypeKey: sex,
                sexTypeValue: sexValue,
                marriageTypeKey: marry,
                marriageTypeValue: (marry=="317"?"已婚":(marry=="318"?"未婚":(marry=="819"?"离异":(marry=="820"?"丧偶":"")))),
                certificateTypeKey: cardtype,
                certificateTypeValue: cardtypevalue,
                cardNumber,
                cellphone,
                postAddress,
            });
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
    _asyncAppStatus = () => {
        // storage.remove({
        //     key: 'isLogin'
        // });
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("index页登录信息",ret);
            console.log("index页登录信息",ret.tokenStr.userIds);
            this.setState({
                userIds: ret.tokenStr.userIds
            })
        }).catch(err => {
            console.warn(err.message);
        })
    }
    _startProject=()=>{
        console.log("this.state",this.state);
        console.log("this.props",this.props.data);
        const {nameKey,sexTypeKey,marriageTypeKey,certificateTypeKey,name,cardNumber,cellphone,postAddress,userIds} = this.state;
        const {businessTypeValue,networkNameKey,networkNameValue,dialogAppUserKey,dialogAppUserValue,processCategoryValue} = this.props.data;
        let url = Config.baseApi + Config.applyApi.saveProcess
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }

    _SUCCESS(){
        Toast.message("启动项目成功");
        Actions.Index();
    }
    render() {
        const {name,postAddress,cellphone,cardNumber,sexType,sexTypeValue,marriageType,marriageTypeValue,certificateType,certificateTypeValue} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back />
                <View style={{margin: px2dp(15)}}>
                    <FormInput
                        name={name}
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
                                SexTypeValue: item.value
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
                        postAddress={postAddress}
                        onChangePostAddress={(text) => {
                            this.setState({
                                postAddress: text
                            })
                        }}

                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', position: 'absolute',bottom: 0,justifyContent: 'space-around', paddingBottom: px2dp(90)}}>
                    <SmallButton style={{flex: 1}} name="完成录入" height={75} width={250} onPress={() => this._startProject()} />
                    <SmallButton style={{flex: 1}} name="继续完善" height={75} width={250} onPress={() => this._startProject()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }

})


