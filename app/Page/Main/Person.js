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
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultChoice name={'客户姓名'} valOne={props.name} action="personCustomers"/>
                    <DefaultSelect require placeholder={'请选择客户性别'} name={'客户性别'} value={props.sexTypeValue}
                                   items={props.sexType} onSelected={props.onSelectedSexType}/>
                    <DefaultSelect require placeholder={'请选择婚姻状况'} name={'婚姻状况'} value={props.marriageTypeValue}
                                   items={props.marriageType} onSelected={props.onSelectedMarriageType}/>
                    <DefaultSelect require placeholder={'请选择证件类型'} name={'证件类型'} value={props.certificateTypeValue}
                                   items={props.certificateType} onSelected={props.onSelectedCertificateType}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber}/>
                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入手机号码'} name={'手机号码'}
                                  valOne={props.cellphone} onChangeText={props.onChangeCellphone}/>
                    <DefaultInput placeholder={'请输入邮政编码'} name={'邮政编码'}
                                  valOne={props.postcode} onChangeText={props.onChangePostcode}/>
                    <DefaultInput placeholder={'请输入电子邮箱'} name={'电子邮箱'}
                                  valOne={props.selfEmail} onChangeText={props.onChangeSelfEmail}/>
                    <DefaultInput border require placeholder={'请输入通讯地址'} name={'通讯地址'}
                                  valOne={props.postAddress} onChangeText={props.onChangePostAddress}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const ModalList = (props) => {
    return (
        <View style={{
            borderBottomWidth: props.border ? 0 : hair,
            paddingTop: px2dp(30),
            marginRight: px2dp(20),
            borderBottomColor: '#ddd'
        }}>
            <View style={{
                flexDirection: 'row', alignItems: 'center', height: px2dp(40), paddingLeft: px2dp(20),
                paddingRight: px2dp(20), justifyContent: 'space-between', paddingBottom: px2dp(20)
            }}>
                <Text
                    style={{fontSize: px2dp(25), color: '#333'}}>{Tool.isBusinessType(props.items.businessType)}</Text>
                <Text style={{
                    fontSize: px2dp(23),
                    color: '#918597'
                }}>{isEmpty(props.items.notMoney)|| props.items.notMoney<0 ? "0" : props.items.notMoney}元</Text>
            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center', height: px2dp(40), paddingLeft: px2dp(20),
                paddingRight: px2dp(20), justifyContent: 'space-between', paddingBottom: px2dp(20)
            }}>
                <Text style={{fontSize: px2dp(23), color: '#333'}}>{props.items.projectNumber}</Text>
                <Text style={{
                    fontSize: px2dp(23),
                    color: 'red'
                }}>{isEmpty(props.items.projectMoney) ? "0" : props.items.projectMoney}元</Text>
            </View>
        </View>
    )
}

export default class Person extends Component {

    static defaultProps = {};

    // 构造
    constructor(props) {
        super(props);
        console.log("上个页面参数", props.data);
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
            //证件类型
            certificateType: [],
            certificateTypeKey: null,
            certificateTypeValue: null,
            userIds: '',
            name: '请选择',//客户姓名
            nameKey: null,//客户id
            cardNumber: null,//证件号码
            cellphone: null,//手机号码
            postcode: null,//邮政编码
            selfEmail: null,//电子邮箱
            postAddress: null,//通讯地址
            renderList: [],
            disabled:false,
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
        const {id, name1, sex, sexValue, marry, cardtype, cardtypevalue, cardNumber, cellphone, selfEmail, postcode, postAddress} = nextProps;
        if (nextProps.isRefresh1) {
            this.setState({
                name: name1,
                nameKey: id,
                sexTypeKey: sex,
                sexTypeValue: sexValue,
                marriageTypeKey: marry,
                marriageTypeValue: (marry == "317" ? "已婚" : (marry == "318" ? "未婚" : (marry == "819" ? "离异" : (marry == "820" ? "丧偶" : "")))),
                certificateTypeKey: cardtype,
                certificateTypeValue: cardtypevalue,
                cardNumber,
                cellphone,
                postAddress,
                postcode,
                selfEmail,
            });
        }
    }

    _sex() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "性别";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('性别', responseText);
                responseText.success ? this._key1(responseText.result, "sexType") : Toast.message(responseText.msg);
            }
        })
    }

    _marriage() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "婚姻状况";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('婚姻状况', responseText);
                responseText.success ? this._key1(responseText.result, "marriageType") : Toast.message(responseText.msg);
            }
        })
    }

    _certificate() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('证件类型', responseText);
                responseText.success ? this._key1(responseText.result, "certificateType") : Toast.message(responseText.msg);
            }
        })
    }

    _key1 = (list, parameter) => {
        console.log(parameter + "list", list);
        let dataBlob = [];
        for (let i = 1; i < list.length; i++) {
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
    _asyncAppStatus = () => {
        // storage.remove({
        //     key: 'isLogin'
        // });
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("index页登录信息", ret);
            this.setState({
                userIds: ret.tokenStr.userIds
            })
        }).catch(err => {
            console.warn(err.message);
        })
    }
    _startProject = () => {
        console.log("this.state", this.state);
        const {nameKey, sexTypeKey, marriageTypeKey, certificateTypeKey, name, cardNumber, cellphone, postcode, selfEmail, postAddress, userIds} = this.state;
        const {businessTypeValue, networkNameKey, networkNameValue, dialogAppUserKey, dialogAppUserValue, processCategoryValue} = this.props.data;
        let url = Config.baseApi + Config.applyApi.saveProcess +
            '?gudongInfo=' +
            '&preHandler=creditProjectService.startCreditFlowProject' +
            '&businessTypeId=1036' +
            '&businessType=1036' +
            '&productId=' + businessTypeValue +//业务种类
            '&userIds=' + userIds +
            '&departMentName=' + networkNameKey +
            '&departId=' + networkNameValue +
            '&flowType=' + processCategoryValue +//流程类别
            '&degreeName=' + dialogAppUserKey +
            '&degree=' + dialogAppUserValue +
            '&operationType=1066' +
            '&definitionType=' +
            '&isSubCompany=false' +
            '&oppositeType=person_customer' +
            '&rg=2' +
            '&person.id=' + nameKey +
            '&person.name=' + name +
            '&person.sex=' + sexTypeKey +
            '&person.marry=' + marriageTypeKey +
            '&person.cardtype=' + certificateTypeKey +
            '&person.cardnumber=' + cardNumber +
            '&person.cellphone=' + cellphone +
            '&person.postcode=' + postcode +
            '&person.selfemail=' + selfEmail +
            '&person.postaddress=' + postAddress;

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }

    _SUCCESS() {
        Toast.message("启动项目成功");
        Actions.Index();
    }

    _renderListPerson() {
        const {nameKey, sexTypeKey, marriageTypeKey, certificateTypeKey, name, cardNumber, cellphone, postcode, selfEmail, postAddress, userIds} = this.state;

        if (isEmpty(name)||name==="请选择") {
            Toast.message("请选择姓名");
            return;
        }
        if (isEmpty(sexTypeKey)) {
            Toast.message("请选择性别");
            return;
        }
        if (isEmpty(marriageTypeKey)) {
            Toast.message("请选择婚姻状况");
            return;
        }
        if (isEmpty(certificateTypeKey)) {
            Toast.message("请选择证件类型");
            return;
        }
        if (isEmpty(cardNumber)) {
            Toast.message("请输入证件号码");
            return;
        }
        if(certificateTypeKey=="309"){
            if (!Tool.isIdCard(cardNumber)) {
                return;
            }
        }
        if (isEmpty(cellphone)) {
            Toast.message("请输入手机号码");
            return;
        }else if (!Tool.isMobile(cellphone)){
            return;
        }
        if (isEmpty(postAddress)) {
            Toast.message("请输入通讯地址");
            return;
        }
        let url = Config.baseApi + Config.processApi.getAllFlowById+nameKey+"&type=person_customer";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询平台申请信息', responseText);
                responseText.success ? this.setState({renderList: responseText.result}) : Toast.message(responseText.msg);
            }
        })
        this.refs.modal7.open();
    }

    render() {
        const {name, postcode, selfEmail, postAddress, cellphone, cardNumber, sexType, sexTypeValue, marriageType, marriageTypeValue, certificateType, certificateTypeValue} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={{borderWidth: hair, borderColor: '#797979', margin: px2dp(15)}}>
                    <Text style={styles.border}>客户基本信息</Text>
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

                    />
                </ScrollView>
                <SmallButton name="启动项目" style={{marginTop: px2dp(40)}} height={75} width={250}
                             onPress={() => this._renderListPerson()}/>
                <Modal style={styles.modal} position={"center"} ref={"modal7"} swipeArea={20}>
                    <View style={styles.modalStyle}>
                        <Text style={{color: '#fff', fontSize: px2dp(38)}}>关联业务预警</Text>
                    </View>
                    <ScrollView style={{}}>
                        <View style={{paddingLeft: 10, paddingTop: 10}}>
                            {
                                this.state.renderList.map((item, i) =>
                                    <ModalList items={item} key={i}/>
                                )
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.modalBottomStyle}>
                        <SmallButton name="确定" style={{flex: 1}} height={70} width={240}
                                     onPress={() => this.state.disabled ? '' : this.setState({disabled: true}, () =>
                                         this._startProject())}/>
                        <SmallButton name="取消" style={{flex: 1}} height={70} width={240}
                                     onPress={() => this.refs.modal7.close()}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    border: {
        color: '#313131',
        fontWeight: '500',
        fontSize: px2dp(31),
        height: px2dp(80),
        borderBottomColor: '#797979',
        borderBottomWidth: px2dp(1),
        paddingLeft: px2dp(25),
        lineHeight: px2dp(60)
    },
    modal: {
        // justifyContent: 'center',
        // alignItems: 'center',
        height: global.SCREEN_HEIGHT * .65,
        width: global.SCREEN_WIDTH * .85,
        borderRadius: px2dp(30)
    },
    modalStyle: {
        height: px2dp(100),
        borderTopRightRadius: px2dp(30),
        borderTopLeftRadius: px2dp(30),
        alignItems: 'center',
        backgroundColor: '#55a1f6',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalBottomStyle: {
        borderBottomRightRadius: px2dp(30),
        borderBottomLeftRadius: px2dp(30),
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

})


