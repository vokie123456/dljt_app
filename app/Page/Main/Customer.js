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
import SmallButton  from '../../Component/SmallButton';
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
                pickerType='popover'
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
                    <DefaultChoice name={'企业名称'} valOne={props.enterpriseName} action="QueryEnterprise"/>
                    <DefaultSelect require placeholder={'请选择证件类型'} name={'证件类型'} value={props.documentTypeValue}
                                   items={props.documentType} onSelected={props.onSelectedDocumentType}/>
                    <DefaultInput require placeholder={'请输入社会信用代码'} name={'社会信用代码'}
                                  valOne={props.organizeCode} onChangeText={props.onChangeOrganizeCode}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入联系电话'} name={'联系电话'}
                                  valOne={props.telephone} onChangeText={props.onChangeTelephone}/>
                    <DefaultInput require border placeholder={'请输入通讯地址'} name={'通讯地址'}
                                  valOne={props.area} onChangeText={props.onChangeArea}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
const FormInput1 = (props) => {
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultInput require placeholder={'请输入法人姓名'} name={'法定代表人姓名'}
                                  valOne={props.name} onChangeText={props.onChangeName}/>
                    <DefaultSelect require placeholder={'请选择法人性别'} name={'法定代表人性别'} value={props.sexTypeValue}
                                   items={props.sexType} onSelected={props.onSelectedSexType}/>
                    <DefaultSelect require placeholder={'请选择证件类型'} name={'证件类型'} value={props.cardTypeValue}
                                   items={props.cardType} onSelected={props.onSelectedCardType}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber}/>
                    <DefaultInput border keyboardType={"numeric"} placeholder={'请输入手机号码'} name={'手机号码'}
                                  valOne={props.cellPhone} onChangeText={props.onChangeCellPhone}/>
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

export default class Customer extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name: '',//法人代表姓名
            sexType: [{text: "男", value: '312'}, {text: "女", value: '313'}],//法人代表性别
            sexTypeValue: null,
            //证件类型
            documentType: [{text: '五证合一', value: 1}, {text: '非五证合一', value: 2}],
            documentTypeValue: null,
            cardType: [],//证件类型
            cardTypeValue: null,//证件类型
            cardNumber: '',//证件号码
            organizeCode: '',//社会信用代码、组织机构代码
            userIds: '',
            enterpriseName: '请选择',//客户姓名
            enterpriseNameKey: '',//客户id
            telephone: '',//企业联系电话
            area: '',//通讯地址
            cellPhone: '',//法人联系电话
            // legalPersonId: '',//此ID查询法人信息
            personId: '',//法人ID
            renderList: [],
            disabled: false,

        };

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if (nextProps.isRefresh) {
            const {enterprisename, id, documentType, telephone, organizecode, area, legalpersonid} = nextProps.popData;
            this.setState({
                enterpriseName: enterprisename,
                enterpriseNameKey: id,
                documentTypeValue: documentType,
                telephone: telephone,
                organizeCode: organizecode,
                area: area,
                // legalPersonId: legalpersonid,
            });
            this._seePersonMessage(legalpersonid);//查询法人信息
            console.log("this,state", this.state);
        }
    }

    componentDidMount() {
        this.setState({})
        this._certificate();//证件类型  参数{证件类型}
        this._asyncAppStatus();
    }

    _seePersonMessage(legalPersonId) {//查询法人信息
        let url = Config.baseApi + Config.applyApi.seePerson + legalPersonId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询法人信息', responseText);
                responseText.success ? this._setPerson(responseText.data) : Toast.message(responseText.msg);
            }
        })
    }

    _setPerson(data) {//设置法人参数
        const {name, sex, cardtype, id, cardnumber, cellphone} = data;
        this.setState({
            name: name,
            sexTypeValue: sex + "",
            cardTypeValue: cardtype + "",
            cardNumber: cardnumber,
            cellPhone: cellphone,
            personId: id,
        })
        console.log("sadfadsfasdfasdf", this.state)
    }

    _certificate() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('证件类型', responseText);
                responseText.success ? this._key1(responseText.result, "cardType") : Toast.message(responseText.msg);
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
        console.log([parameter] + "---", dataBlob);
    }
    _asyncAppStatus = () => {
        // storage.remove({
        //     key: 'isLogin'
        // });
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("index页登录信息", ret);
            console.log("index页登录信息", ret.tokenStr.userIds);
            this.setState({
                userIds: ret.tokenStr.userIds
            })
        }).catch(err => {
            console.warn(err.message);
        })
    }

    _renderList() {
        const {organizeCode, documentTypeValue, telephone, area, enterpriseNameKey, enterpriseName, personId, name, sexTypeValue, cardTypeValue, cardNumber, cellPhone,} = this.state;
        //企业基本信息
        if (isEmpty(enterpriseName)||enterpriseName==="请选择") {
            Toast.message("请选择企业");
            return;
        }
        if (isEmpty(documentTypeValue)) {
            Toast.message("请选择证件类型");
            return;
        }
        if (isEmpty(organizeCode)) {
            Toast.message("请输入社会信用代码");
            return;
        }
        if (!Tool.isMobile(telephone,"请检查联系电话号码")) {
            return;
        }
        if (isEmpty(area)) {
            Toast.message("请输入通讯地址");
            return;
        }
        //法人基本信息
        if (isEmpty(name)) {
            Toast.message("请输入法人姓名");
            return;
        }
        if (isEmpty(sexTypeValue)) {
            Toast.message("请选择法人性别");
            return;
        }
        if (isEmpty(cardTypeValue)) {
            Toast.message("请选择证件类型");
            return;
        }
        if (isEmpty(cardNumber)) {
            Toast.message("请输入证件号码");
            return;
        }
        if(cardTypeValue=="309"){
            if (!Tool.isIdCard(cardNumber)) {
                return;
            }
        }
        let url = Config.baseApi + Config.processApi.getAllFlowById + enterpriseNameKey + "&type=company_customer";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询平台申请信息', responseText);
                responseText.success ? this.setState({renderList: responseText.result}) : Toast.message(responseText.msg);
            }
        })
        this.refs.modal6.open();
    }

    _startProject = () => {
        console.log("this.state", this.state);
        console.log("this.props.data", this.props.data);
        const {userIds,organizeCode, documentTypeValue, telephone, area, enterpriseNameKey, enterpriseName, personId, name, sexTypeValue, cardTypeValue, cardNumber, cellPhone,} = this.state;
        const {businessTypeValue, networkNameKey, networkNameValue, dialogAppUserKey, dialogAppUserValue, processCategoryValue} = this.props.data;
        let url = Config.baseApi + Config.applyApi.saveProcess +
            '?gudongInfo=' +
            '&preHandler=creditProjectService.startCreditFlowProject' +
            '&businessTypeId=1036' +
            '&businessType=1036' +
            '&productId=4' +
            '&departMentName=' + networkNameKey +
            '&departId=' + networkNameValue +
            '&flowType=' + processCategoryValue +//流程类别
            '&degreeName=' + dialogAppUserKey +
            '&degree=' + dialogAppUserValue +
            '&operationType=1066' +
            '&definitionType=' +
            '&isSubCompany=false' +
            '&userIds='+ userIds +
            '&oppositeType=company_customer' +
            '&rg=1' +
            '&enterprise.id=' + enterpriseNameKey +
            '&enterprise.enterprisename=' + enterpriseName +
            // '&enterprise.shortname='+
            // '&enterprise.hangyeName='+
            // '&enterprise.hangyeType='+
            // '&enterprise.rootHangYeType='+
            '&enterprise.documentType=' + documentTypeValue +//证件类型
            '&enterprise.organizecode=' + organizeCode +
            // '&enterprise.cciaa='+
            // '&enterprise.taxnum='+
            '&enterprise.telephone=' + telephone +
            // '&enterprise.postcoding='+
            '&enterprise.area=' + area +
            '&person.id=' + personId +
            '&person.name=' + name +
            '&person.sex=' + sexTypeValue +
            '&person.cardtype=' + cardTypeValue +
            '&person.cardnumber=' + cardNumber +
            // '&person.selfemail='+
            '&person.cellphone=' + cellPhone;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }

    _SUCCESS() {
        this.refs.modal6.close();
        Toast.message("启动项目成功");
        Actions.Index();
    }

    render() {
        const {enterpriseName, documentType, documentTypeValue, organizeCode, telephone, area, name, sexType, sexTypeValue, cardType, cardTypeValue, cardNumber, cellPhone} = this.state;
        console.log("sadfasdfadsfdaf", this.state)
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#797979', margin: px2dp(15)}}>
                        <Text style={styles.border}>企业基本信息</Text>
                        <FormInput
                            enterpriseName={enterpriseName}
                            documentType={documentType}
                            documentTypeValue={documentTypeValue}
                            onSelectedDocumentType={(item, index) => {
                                this.setState({documentTypeValue: item.value = {}})
                            }}
                            organizeCode={organizeCode}
                            onChangeOrganizeCode={(text) => {
                                this.setState({
                                    organizeCode: text
                                })
                            }}
                            telephone={telephone}
                            onChangeTelephone={(text) => {
                                this.setState({
                                    telephone: text
                                })
                            }}
                            area={area}
                            onChangeArea={(text) => {
                                this.setState({
                                    area: text
                                })
                            }}
                        />
                    </View>
                    <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#797979', margin: px2dp(15)}}>
                        <Text style={styles.border}>法人基本信息</Text>
                        <FormInput1
                            name={name}
                            onChangeName={(text) => {
                                this.setState({
                                    name: text
                                })
                            }}
                            sexType={sexType}
                            sexTypeValue={sexTypeValue}
                            onSelectedSexType={(item, index) => {
                                this.setState({sexTypeValue: item.value})
                            }}
                            cardType={cardType}
                            cardTypeValue={cardTypeValue}
                            onSelectedCardType={(item, index) => {
                                this.setState({
                                    cardTypeValue: item.value
                                })
                            }}
                            cardNumber={cardNumber}
                            onChangeCardNumber={(text) => {
                                this.setState({
                                    cardNumber: text
                                })
                            }}
                            cellPhone={cellPhone}
                            onChangeCellPhone={(text) => {
                                this.setState({
                                    cellPhone: text
                                })
                            }}

                        />
                    </View>
                    {/*<SmallButton name="启动项目" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>this._startProject()} />*/}
                    <SmallButton name="启动项目" style={{marginBottom: px2dp(10)}} height={75} width={250}
                                 onPress={() => this._renderList()}/>
                </ScrollView>
                <Modal style={styles.modal} position={"center"} ref={"modal6"} swipeArea={20}>
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
                                     onPress={() => this.refs.modal6.close()}/>
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
    text: {
        color: "black",
        fontSize: px2dp(26)
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


