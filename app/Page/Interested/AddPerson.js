/**
 * Created by duansailong on 2018/3/20.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet, Alert, Dimensions,
} from 'react-native'
import Title from '../../Component/Title';
import SmallButton from '../../Component/SmallButton';
import {Input, Overlay, Select, Button,} from 'teaset';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import LoanStatement from "../Process/LoanStatement";
import LoanIntention from "./LoanIntention";

let {height, width} = Dimensions.get('window');

const DefaultInput = (props) => {
    const {inputDisabled} = props.props.data;
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
                    backgroundColor: props.disabled ? '#fffdcc' : (inputDisabled ? '#fffdcc' : 'transparent'),
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                editable={props.disabled ? false : !inputDisabled}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    console.log("DefaultSelect", props.value);
    const {selectDisabled} = props.props.data;
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
                    backgroundColor: selectDisabled ? '#fffdcc' : 'transparent',
                }}
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

const FormInput = (props) => {
    // const {customerName,telephoneNumber} = props.data.data.prodData;
    return (
        <View>
            <ScrollView>
                <KeyboardAwareScrollView>
                    <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                        <DefaultSelect require placeholder={'请选择'} name={'客户类型'}
                                       value={props.personTypeValue}
                                       items={props.personType}
                                       onSelected={props.onSelectedPersonTypeStatus} props={props}/>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={{flex: 3}}>
                                {/*<DefaultInput require placeholder={'请输入姓名'} name={'客户名称'} valOne={!isEmpty(customerName)?customerName:props.personName}*/}
                                <DefaultInput require placeholder={'请输入姓名'} name={'客户名称'} valOne={props.personName}
                                              onChangeText={props.onChangePersonName} props={props}/>
                                <DefaultInput keyboardType={"numeric"} require placeholder={'请输入联系电话'} name={'联系电话'}
                                    // valOne={!isEmpty(telephoneNumber) ? telephoneNumber : props.personTel}
                                              valOne={props.personTel}
                                              onChangeText={props.onChangePersonTel} props={props}/>
                            </View>

                        </View>
                        <DefaultSelect placeholder={'请选择'} name={'客户来源'}
                                       value={isEmpty(props.personFormValue) ? props.this1.personFormValue : props.personFormValue}
                                       items={props.personForm} onSelected={props.onSelectedPersonForm} props={props}/>
                        <DefaultInput placeholder={'请输入电子邮箱'} name={'电子邮箱'}
                                      valOne={props.emailText}
                                      onChangeText={props.onChangeEmailText} props={props}/>
                        <DefaultInput disabled placeholder={''} name={'所属网点'} props={props}
                                      valOne={props.affiliated_branches}/>
                        <DefaultInput placeholder={'请输入通讯地址'} name={'通讯地址'}
                                      valOne={props.addressText}
                                      onChangeText={props.onChangeAddress} props={props}/>
                    </View>
                </KeyboardAwareScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: px2dp(150),
                    paddingBottom: px2dp(10)
                }}>
                    <SmallButton name="完成录入" style={{flex: 1}} height={75} width={250}
                                 onPress={() => props.this1._message()}/>

                    {/*<SmallButton style={{flex: 1}} name="继续完善" height={75} width={250}*/}
                    {/*onPress={() => props.this1._message('zoomOut', true, '意向信息')}/>*/}
                </View>
            </ScrollView>
        </View>
    )
}
/*<View style={styles.rightStyle}>
    <Image style={{width: px2dp(75), height: px2dp(85),}} source={Images.addUser}
           resizeMode="stretch"/>
    <Text>选择联系人</Text>
</View>*/

export default class AddPerson extends Component {

    // 构造
    constructor(props) {
        super(props);
        console.log("props111111data", props);

        // 初始状态
        this.state = {
            data: props,

            prodData: [],
            //来源
            personForm: [],
            personFormValue: null,
            //客户名称
            personName: '',
            //客户电话
            personTel: '',
            //邮箱
            emailText: '',
            //通讯地址
            addressText: '',
            //所属网点
            affiliated_branches: '',
            personType: [{text: '企业', value: '1'}, {text: '个人', value: '2'}],
            modalVisibility: false,

            newId: '',
            perId: ''
        };


    }

    componentDidMount() {
        this._personForm();
        //意向客户添加，查看
        if (this.props.type1 === "add") {
            // this.addContent();
        } else {
            this.lookAtContent();
        }
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            this.setState({
                affiliated_branches:ret.tokenStr.depName,
            });
            console.log("????????", this.state.dialogAppUserKey+'----'+this.state.dialogAppUserValue);
        }).catch(err => {
            console.warn(err.message);
        })
    }

    _message() {//modal控制是否点击周围取消弹框

        this._saveMessagePerson();
    }

    _bankText() {
        this.overlayPopView && this.overlayPopView.close();
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    _nextText() {
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
        {/*<Menu name={'借款意向信息'} pageName={'LoanIntention'} data={this.state} type={'lookAt'} inputDisabled={false} selectDisabled={false}/>*/
        }
        this.overlayPopView.close();
        Actions.LoanIntention({
            data: this.state,
            type1: "add",
            perId1: this.state.newId,
            pageName: 'LoanIntention',
            inputDisabled: false,
            personType: this.state.personTypeValue,
            customerName: this.state.personName,
            telephoneNumber: this.state.personTel,
            customerChannel: this.state.personFormValue,
            selectDisabled: false
        })
        console.log( "-this.state.newId--------------", this.state.newId);

    }

    _seeInterestedBuyers(perId) {
        let url = Config.baseApi + Config.publicApi.seeInterestedBuyers + perId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户列表', responseText);
                responseText.success ? this._render(responseText.data.bpCustProsperctive) : Toast.message(responseText.msg);
            }
        })
    }

    _render = (list) => {
        const {customerName, telephoneNumber, department, postaddress, email, customerChannel, customerType, perId} = list;
        console.log("list", list);
        if (!isEmpty(customerName)) {
            this.setState({
                personName: customerName
            })
        }
        if (!isEmpty(telephoneNumber)) {
            this.setState({
                personTel: telephoneNumber
            })
        }
        // if (!isEmpty(department)) {
        //     this.setState({
        //         affiliated_branches: department
        //     })
        // }
        if (!isEmpty(postaddress)) {
            this.setState({
                addressText: postaddress
            })
        }
        if (!isEmpty(email)) {
            this.setState({
                emailText: email
            })
        }
        if (!isEmpty(customerChannel)) {
            this.setState({
                personFormValue: customerChannel
            })
        }
        if (!isEmpty(customerType)) {
            this.setState({
                personTypeValue: customerType + ''
            })
        }
        if (!isEmpty(perId)) {
            this.setState({
                perId: perId + ''
            })
        }

    };

    lookAtContent() {
        this._seeInterestedBuyers(this.state.data.data.prodData.perId);
    }

    render() {
        //客户来源、客户名字、客户电话、邮箱、通讯地址
        const {personForm, personFormValue, personName, personTel, emailText, addressText, data, affiliated_branches, personType, personTypeValue} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View>
                    <FormInput
                        this1={this}
                        data={data}
                        affiliated_branches={affiliated_branches}
                        //客户类型
                        personType={personType}
                        personTypeValue={personTypeValue}
                        onSelectedPersonTypeStatus={(item, index) => {
                            this.setState({personTypeValue: item.value})
                        }}
                        //客户来源
                        personForm={personForm}
                        personFormValue={personFormValue}
                        onSelectedPersonForm={(item, index) => {
                            this.setState({personFormValue: item.value})
                        }}
                        // 输入客户名称
                        personName={personName}
                        onChangePersonName={(text) => {
                            this.setState({
                                personName: text
                            })
                        }}
                        // 输入客户电话
                        personTel={personTel}
                        onChangePersonTel={(text) => {
                            this.setState({
                                personTel: text
                            })
                        }}
                        // 输入邮箱
                        emailText={emailText}
                        onChangeEmailText={(text) => {
                            this.setState({
                                emailText: text
                            })
                        }}
                        // 通讯地址
                        addressText={addressText}
                        onChangeAddress={(text) => {
                            this.setState({
                                addressText: text
                            })
                        }}

                    />
                </View>
            </View>
        )
    }

    _personForm() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "customer_channel";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('客户来源', responseText);
                responseText.success ? this._key1(responseText.result, "personForm") : Toast.message(responseText.msg);
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
            }
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
        console.log([parameter] + "---", dataBlob);
    }


    // bpCustProsperctive.perId:
    // bpCustProsperctive.personType:0
    // bpCustProsperctive.customerType:2
    // bpCustProsperctive.customerName:林龙
    // bpCustProsperctive.telephoneNumber:13232232323
    // bpCustProsperctive.customerChannel:829
    // bpCustProsperctive.area:中国_北京市_东城区
    // bpCustProsperctive.areaId:6591,6592,6594
    // bpCustProsperctive.email:3434734@13231.com
    // bpCustProsperctive.department:浙江电联集团有限公司
    // bpCustProsperctive.departmentId:1
    // bpCustProsperctive.postaddress:哇哇通讯地址
    // bpCustProsperctive.loanMoney:3000
    // bpCustProsperctive.loanDate:2018-06-06
    // bpCustProsperctive.loanPeriod:245678
    // bpCustProsperctive.loanType:954
    // bpCustProsperctive.remark:备注说明
    _saveMessagePerson() {
        const {personTypeValue, personFormValue, personName, personTel, emailText, addressText} = this.state;

        if (isEmpty(personTypeValue)) {
            Toast.message("请选择客户类型");
            return;
        }
        if (isEmpty(personName)) {
            Toast.message("请输入姓名");
            return;
        }

        if (!Tool.isMobile(personTel)) {
            return;
        }
        if (!isEmpty(emailText)) {
            if (!Tool.isEmail(emailText)) {
                return;
            }
        }
        let perId = (this.props.type1 === "add" ? '' : '&bpCustProsperctive.perId=' + this.state.data.data.prodData.perId);
        let url = Config.baseApi + Config.publicApi.saveInterestedBuyers +
            "?bpCustProsperctive.customerType=" + personTypeValue + perId +
            '&bpCustProsperctive.personType=' + '0' +
            '&bpCustProsperctive.customerName=' + personName +
            '&bpCustProsperctive.telephoneNumber=' + personTel +
            '&bpCustProsperctive.email=' + emailText +
            '&bpCustProsperctive.customerChannel=' + personFormValue +
            '&bpCustProsperctive.department=浙江电联集团有限公司' +
            '&bpCustProsperctive.postaddress=' + addressText;

        RTRequest.fetch1(url).then((responseText) => {
                if (responseText) {
                    responseText.success ? this._SUCCESS(responseText) : Toast.message("登录超时，请重新登录!");
                }
            }
        )
    }

    _SUCCESS(content) {
        this.setState({
            newId: content.newId,
        });
        if (isEmpty(this.props.type1)) {
            Toast.message("保存成功");
        }
        if (this.props.type1 === "add") {
            let overlayView = (
                <Overlay.PopView
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    type={'zoomOut'}
                    modal={true}
                    ref={v => this.overlayPopView = v}
                >
                    <View style={{
                        backgroundColor: Theme.defaultColor,
                        minWidth: width / 5 * 4 - px2dp(50),
                        minHeight: width / 2 * 1 - px2dp(50),
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{flexDirection: 'row', position: 'absolute', top: width / 9 * 1}}>
                            <Text style={{fontSize: px2dp(34), color: '#393939'}}>{'是否继续完善'}</Text>
                        </View>
                        <View style={{flexDirection: 'row', position: 'absolute', bottom: width / 13 * 1}}>
                            <Button style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                    titleStyle={{color: '#fff'}} title='完成录入' onPress={() => this._bankText()}/>
                            <View style={{width: px2dp(60)}}/>
                            <Button style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                    titleStyle={{color: '#fff'}} title='继续完善' onPress={() => this._nextText()}/>

                        </View>
                    </View>
                </Overlay.PopView>
            );
            Overlay.show(overlayView);
        } else {
            Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightStyle: {
        flex: 1,
        borderLeftWidth: px2dp(1),
        borderLeftColor: '#ddd',
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: global.hair,
        width: px2dp(150),
        height: px2dp(200)
    },

})


