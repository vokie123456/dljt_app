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
    Dimensions,
} from 'react-native'
import Title2 from '../../Component/Title2';
import Icon from "react-native-vector-icons/Ionicons";
import SmallButton from '../../Component/SmallButton';
import {Input, Select, Overlay, Button} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker';
import Loading from '../../Component/Loading'
let {height, width} = Dimensions.get('window');

let userBir='';
const DatePicker1 = (props) => {
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={!isEmpty(props.props.startDate)?props.props.startDate:userBir}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1918-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginRight: 50,
                    }
                }}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
};

const DefaultInput = (props) => {
    if (!isEmpty(props.cardN) && props.cardN.length == 18) {
        if (!isEmpty(props.props.certificateTypeValue) && props.props.certificateTypeValue == '309') {
            let bir = (props.cardN).substr(6,8);
            let year = bir.substr(0,4);
            let month = bir.substr(4,4);
            let day = bir.substr(6,8);
            userBir=year+'-'+month+'-'+day;
        }
    }
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
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                certificateTypeValue={props.certificateTypeValue}
                cardNumber={props.cardN}
            />
        </View>
    )
}

const DefaultSelect = (props) => {
    ///const {selectDisabled} =  props.props.data;
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
                }}
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

const FormInput = (props) => {
    const that = props.this1;
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput require placeholder={'请输入姓名'} name={'客户姓名 : '}
                                  onChangeText={props.onChangemateName} valOne={props.mateName} props={props}/>
                    <DefaultSelect require placeholder={'请选择'} name={'证件类型 : '}
                                   value={(isEmpty(props.certificateTypeValue) ? props.certificateTypeValue : props.certificateTypeValue + "")}
                                   items={props.certificateType} onSelected={props.onSelectedcertificateType}
                                   props={props}/>

                    <DefaultInput require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber} props={props} cardN={props.cardNumber}/>
                    <DefaultSelect require placeholder={'请选择'} name={'性别 : '}
                                   value={isEmpty(props.sexValue) ? props.this1.sexValue : props.sexValue + ""}
                                   items={props.sexType} onSelected={props.onSelectedsex} props={props}/>

                    <DatePicker1 require props={props} name={"出生日期 : "} onChangeDate={props.onSelectedDateStatus}/>

                    <DefaultSelect placeholder={'民族'} name={'民族 : '}
                                   value={isEmpty(props.nationalityValue) ? props.this1.nationalityValue : props.nationalityValue + ""}
                                   items={props.nationalityType} onSelected={props.onSelectednationalityType}
                                   props={props}/>
                    <DefaultInput require placeholder={'请输入手机号码'} name={'手机号码 : '} onChangeText={props.onChangemateTel}
                                  valOne={props.mateTel} props={props}/>
                    <DefaultSelect require placeholder={'请选择'} name={'婚姻状况 : '}
                                   value={isEmpty(props.marryValue) ? props.marryValue : props.marryValue + ""}
                                   items={props.marryType} onSelected={props.onSelectedmarry} props={props}/>

                    <DefaultInput placeholder={'请输入'} name={'通讯地址'}
                                  valOne={isEmpty(props.unitaddress) ? props.this1.unitaddress : props.unitaddress + ""}
                                  onChangeText={props.onChangeunitaddress}/>
                </View>
            </KeyboardAwareScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: px2dp(150),
                paddingBottom: px2dp(10)
            }}>
                <SmallButton name="保存" style={{flex: 1}} height={75} width={250} onPress={() => (that.state.flag ? props.this1._savePerson():props.this1._savePerson2())}/>
            </View>
        </ScrollView>
    )
}
export default class ConvertOfficialAccountP extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id: '',
            visible: false,
            person: null,
            name: '',//姓名
            sex: [],//性别
            sexValue: '',
            sexKey: '',
            marry: [],//婚姻
            marryValue: '',
            marryKey: '',
            cardtype: [],//证件类型
            cardtypeValue: '',
            cardtypeKey: '',
            cardnumber: '',//证件号码
            cellphone: '',//手机号码
            postaddress: '',//通讯地址
            chusheng: '',//出生日期
            nationality: [],//民族
            nationalityValue: '',
            nationalityKey: '',
        };

        if (props.flag) {
            this.state = {
                id: props.id,
                flag: true,
                visible: true,
            }
            this._getByIdPerson();
        } else {
            this.state = {
                id: "",
                flag: false,
            }
        }
    }

    componentDidMount() {
        this._certificate();
        this._marry();
        this._nationality();
        this._sex();
    }

    _showPop(type, modal, text, uid) {
        this.setState({
            id: uid
        })
        //modal控制是否点击周围取消弹框
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
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
                        <Text style={{fontSize: px2dp(34), color: '#393939'}}>{text}</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: width / 13 * 1}}>
                        <Button disabled={this.state.waiting} style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                titleStyle={{color: '#fff'}} title='完成录入' onPress={() => this._SUCCESS3()}/>
                        <View style={{width: px2dp(60)}}/>
                        <Button disabled={this.state.waiting} style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                titleStyle={{color: '#fff'}} title='继续完善' onPress={() => this._SUCCESS2(uid)}/>
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    _marry = () => {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "8";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('婚姻', responseText);
                responseText.success ? this._key1(responseText.result, "marry") : Toast.message(responseText.msg);
            }
        })
    }

    _sex() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "sex_key";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('性别', responseText);
                responseText.success ? this._key1(responseText.result, "sex") : Toast.message(responseText.msg);
            }
        })
    }

    _nationality() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "nationality";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('民族', responseText);
                responseText.success ? this._key1(responseText.result, "nationality") : Toast.message(responseText.msg);
            }
        })
    }

    _certificate() {
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('证件类型', responseText);
                responseText.success ? this._key1(responseText.result, "cardtype") : Toast.message(responseText.msg);
            }
        })
    }

    _key1 = (list, parameter) => {
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

    _getByIdPerson = () => {
        let url = Config.baseApi + Config.processApi.getByIdPerson + "?personId=" + this.state.id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._upDataPer(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    _upDataPer(state) {
        console.log('客户基本信息------------------', state);
        const {name, sex, marry, cardtype, cardnumber, cellphone, postaddress, birthday, nationality}=state;
        this.setState({
            visible: false,
            person: state
        })
        if (!isEmpty(name)) {
            this.setState({name});
        }
        if (!isEmpty(sex)) {
            this.setState({sexValue: sex});
        }
        if (!isEmpty(marry)) {
            this.setState({marryValue: marry});
        }
        if (!isEmpty(cardtype)) {
            this.setState({cardtypeValue: cardtype+""})
        }
        if (!isEmpty(cardnumber)) {
            this.setState({
                cardnumber: cardnumber
            })
        }
        if (!isEmpty(cellphone)) {
            this.setState({
                cellphone
            })
        }
        if (!isEmpty(postaddress)) {
            if (postaddress !=='undefined') {
             this.setState({
                postaddress
            })
          }
        }
        if (!isEmpty(birthday)) {
            this.setState({
                chusheng: birthday
            })
        }
        if (!isEmpty(nationality)) {
            this.setState({
                nationalityValue: nationality
            })
        }
    }

    _savePerson = () => {
        /*person.name: 张老五 person.cardtype:309  person.sex:312  person.cellphone:18293894839  person.cardnumber:5.33022E+17
         person.birthday:28272  person.marry: 317   person.validity: 43258   person.age:41   person.postaddress:通讯地址是啊嗷嗷嗷
         person.shopName: 龙票集团  person.shopId: 37  id:952  person.id:952   person.currentcompany:工作单位
         person.companyFax:  person.unitproperties: 496
         person.unitaddress: 公司地址  person.unitphone: 1054321   person.unitpostcode:
         person.hangyeName: 国际组织和机构的活动   person.hangyeType: 11018
         person.companyScale:    person.job: 579
         person.jobstarttime:2018/6/7  person.department:所属部门   person.jobincome: 2300
         person.payDate: 15   person.wagebank:  打卡  person.parentHireCity: 10089
         person.hireCity: 10184
         */
        /*name: '',//姓名
         sex: [],//性别
         sexValue: '',
         sexKey: '',
         marry: [],//婚姻
         marryValue: '',
         marryKey: '',
         cardtype: [],//证件类型
         cardtypeValue: '',
         cardtypeKey: '',
         cardnumber: '',//证件号码
         cellphone: '',//手机号码
         postaddress: '',//通讯地址
         chusheng: '',//出生日期
         nationality: [],//民族
         nationalityValue: '',
         nationalityKey: '',*/
        const {person, data, name, sexValue, marryValue, cardtypeValue, cardnumber, cellphone, postaddress, chusheng, nationalityValue} = this.state;
        if (isEmpty(name)) {
            Toast.message("客户姓名不能为空");
            return;
        }
        if (isEmpty(cardtypeValue)) {
            Toast.message("证件类型不能为空");
            return;
        }
        if (isEmpty(cardnumber)) {
            Toast.message("证件号码不能为空");
            return;
        }
        if (cardtypeValue === '309') {
            if(!Tool.isIdCard(cardnumber)){
                return;
            }
        }
        if (isEmpty(sexValue)) {
            Toast.message("性别不能为空");
            return;
        }
        if (isEmpty(chusheng) ) {
            if (isEmpty(userBir)) {
                Toast.message("出生日期不能为空");
                return;
            }else{
                chusheng:userBir
            }
        }

        if(!Tool.isMobile(cellphone)){
            return;
        }
        if (isEmpty(marryValue)) {
            Toast.message("婚姻状况必填");
            return;
        }

        let url = Config.baseApi + Config.publicApi.addInfoPerson +
            '?person.name=' + name +
            '&person.cardtype=' + cardtypeValue +
            '&person.sex=' + sexValue +
            '&person.cellphone=' + cellphone +
            '&person.cardnumber=' + cardnumber +
            '&person.birthday=' + chusheng +
            '&person.marry=' + marryValue +
            '&person.validity=' + person.validity +
            '&person.age=' + person.age +
            '&person.postaddress=' + postaddress +
            '&id=' + person.id +
            '&person.id=' + person.id +
            '&person.currentcompany=' + person.currentcompany +
            '&person.companyFax=' + person.companyFax +
            '&person.unitproperties=' + person.unitproperties +
            '&person.unitaddress=' + person.unitaddress +
            '&person.unitphone=' + person.unitphone +
            '&person.unitpostcode=' + person.unitpostcode +
            '&person.hangyeName=' + person.hangyeName +
            '&person.hangyeType=' + person.hangyeType +
            '&person.companyScale=' + person.companyScale +
            '&person.job=' + person.job +
            '&person.jobstarttime=' + person.jobstarttime +
            '&person.department=' + person.department +
            '&person.jobincome=' + person.jobincome +
            '&person.payDate=' + person.payDate +
            '&person.wagebank=' + person.wagebank +
            '&person.parentHireCity=' + person.parentHireCity +
            '&person.hireCity=' + person.hireCity +
            '&person.nationality=' + nationalityValue;
        RTRequest.fetch1(url).then((responseText) => {
            console.log('保存信息', responseText);
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _savePerson2 = () => {
        /*name: '',//姓名
         sex: [],//性别
         sexValue: '',
         sexKey: '',
         marry: [],//婚姻
         marryValue: '',
         marryKey: '',
         cardtype: [],//证件类型
         cardtypeValue: '',
         cardtypeKey: '',
         cardnumber: '',//证件号码
         cellphone: '',//手机号码
         postaddress: '',//通讯地址
         chusheng: '',//出生日期
         nationality: [],//民族
         nationalityValue: '',
         nationalityKey: '',*/
        const {name, sexValue, marryValue, cardtypeValue, cardnumber, cellphone, postaddress, chusheng, nationalityValue, cardtypeKey} = this.state;
        if (isEmpty(name)) {
            Toast.message("客户姓名不能为空");
            return;
        }
        if (isEmpty(cardtypeValue)) {
            Toast.message("证件类型不能为空");
            return;
        }
        if (isEmpty(cardnumber)) {
            Toast.message("证件号码不能为空");
            return;
        }
        if (cardtypeValue === '309') {
            if(!Tool.isIdCard(cardnumber)){
                return;
            }
        }
        if (isEmpty(sexValue)) {
            Toast.message("性别不能为空");
            return;
        }
        if (isEmpty(chusheng) ) {
            if (isEmpty(userBir)) {
                Toast.message("出生日期不能为空");
                return;
            }else{
                chusheng:userBir
            }
        }

        if (isEmpty(nationalityValue)) {
            Toast.message("民族必填");
            return;
        }
        if(!Tool.isMobile(cellphone)){
            return;
        }
        if (isEmpty(marryValue)) {
            Toast.message("婚姻状况必填");
            return;
        }

        let url = Config.baseApi + Config.publicApi.addInfoPerson +
            '?person.name=' + name +
            '&person.cardtype=' + cardtypeValue +
            '&person.sex=' + sexValue +
            '&person.cellphone=' + cellphone +
            '&person.cardnumber=' + cardnumber +
            '&person.birthday=' + chusheng +
            '&person.marry=' + marryValue +
            '&person.postaddress=' + postaddress +
            '&person.nationality=' + nationalityValue;
        console.log('保存信息__________________________', url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息++++++++++++++++++++++++++++++++++++++++', responseText.newId);
                responseText.success ? this._showPop('zoomOut', true, '是否继续完善', responseText.newId) : Toast.message(responseText.msg);
            }
        })
    }

    _SUCCESS = () => {
        Actions.pop();
    }
    _SUCCESS2 = (uid) => {
        this.overlayPopView.close();
        Actions.IndividualClientDetail({id: uid, flag: this.state.flag});
    }
    _SUCCESS3 = () => {
        this.overlayPopView.close();
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        /* name:'',//姓名
         sex:[],//性别
         sexValue:'',
         sexKey:'',
         marry:[],//婚姻
         marryValue:'',
         marryKey:'',
         cardtype:[],//证件类型
         cardtypeValue:'',
         cardtypeKey:'',
         cardnumber:'',//证件号码
         cellphone:'',//手机号码
         postaddress:'',//通讯地址
         chusheng:'',//出生日期
         nationality:[],//民族
         nationalityValue:'',
         nationalityKey:'',*/
        const {isModal, nationalityValue, nationalityKey, name, cardnumber, cardtypeKey, cardtype, cardtypeValue, cellphone, chusheng, postaddress, marry, marryValue, marryKey, sex, sexValue, sexKey, nationality} = this.state;
        return (
            <View style={styles.container}>
                <Title2 name={this.props.title} back toPop/>
                <View>
                    <FormInput
                        this1={this}

                        marryType={marry}
                        marryValue={marryValue}
                        onSelectedmarry={(item, index) => {
                            this.setState({
                                marryValue: item.value,
                                marryKey: item.key
                            })
                        }}
                        sexType={sex}
                        sexValue={sexValue}
                        onSelectedsex={(item, index) => {
                            this.setState({
                                sexValue: item.value,
                                sexKey: item.key
                            })
                        }}
                        nationalityType={nationality}
                        nationalityValue={nationalityValue}
                        onSelectednationalityType={(item, index) => {
                            this.setState({
                                nationalityValue: item.value,
                                nationalityKey: item.key
                            })
                        }}
                        certificateType={cardtype}
                        certificateTypeValue={cardtypeValue}
                        onSelectedcertificateType={(item, index) => {
                            this.setState({
                                cardtypeValue: item.value,
                                cardtypeKey: item.key
                            })
                        }}
                        cardNumber={cardnumber}
                        onChangeCardNumber={(text) => {
                            this.setState({
                                cardnumber: text
                            })
                        }}
                        mateName={name}
                        onChangemateName={(text) => {
                            this.setState({
                                name: text
                            })
                        }}
                        mateTel={cellphone}
                        onChangemateTel={(text) => {
                            this.setState({
                                cellphone: text
                            })
                        }}
                        startDate={chusheng}
                        onSelectedDateStatus={(text) => {
                            this.setState({
                                chusheng: text
                            });
                        }}
                        unitaddress={postaddress}
                        onChangeunitaddress={(postaddress) => {
                            this.setState({
                                postaddress
                            })
                        }}
                    />
                </View>
                <Loading visible={this.state.visible}/>
            </View>

        )
    }

    _key1 = (list, parameter) => {
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

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true})});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "black",
        fontSize: 22
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }

})



