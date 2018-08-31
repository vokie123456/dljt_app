'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {Input, Select} from 'teaset';
import Title from '../../Component/Title';
import SmallButton  from '../../Component/SmallButton';
import Loading from '../../Component/Loading'
const DefaultInput = (props) => {
    const {inputDisabled}=props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#EEEEEE', alignItems: 'center', height: px2dp(90)
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
                editable={!isEmpty(props.disabled) ? false : (!inputDisabled)}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultSelect = (props) => {
    const {selectDisabled}=props.props.data
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1,
                    marginRight: px2dp(36),
                    paddingLeft: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                }}
                pickerType='popover'
                size='md'
                value={props.value}
                items={props.items}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                disabled={selectDisabled ? true : false}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView>
            <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                <DefaultInput disabled={true} name={'登录账号'} valOne={props.username} placeholder={'请输入'} props={props}/>
                <DefaultInput require name={'员工姓名'} valOne={props.fullname} placeholder={'请输入'} props={props}
                              onChangeText={props.onChangeFullname}/>
                <DefaultInput require name={'邮        箱'} valOne={props.email} placeholder={'请输入'}
                              onChangeText={props.onChangeEmail} props={props}/>
                <DefaultSelect placeholder={'请选择'} name={'性        别'}
                               value={(isEmpty(props.sexValue) ? props.sexValue : props.sexValue + "")}
                               items={props.sex} onSelected={props.onSelectedSex}
                               props={props}/>

                <DefaultInput name={'家庭电话'} placeholder={'请输入'} valOne={props.phone} props={props}
                              onChangeText={props.onChangePhone}/>

                <DefaultInput name={'移动电话'} placeholder={'请输入'} valOne={props.mobile} props={props}
                              onChangeText={props.onChangeMobile}/>

                <DefaultInput name={'传        真'} placeholder={'请输入'} valOne={props.fax} props={props}
                              onChangeText={props.onChangeFax}/>

                <DefaultInput name={'家庭住址'} placeholder={'请输入'} valOne={props.address} props={props}
                              onChangeText={props.onChangeAddress}/>

                <DefaultInput name={'邮        编'} placeholder={'请输入'} valOne={props.zip} props={props}
                              onChangeText={props.onChangeZip}/>
            </View>
        </ScrollView>
    )
}
export default class Mine extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
            depName: '',//集团
            fullname: '',//管理员
            username: '',//登录账号
            userId: null,
            data: props.props,
            email: '',
            phone: '',
            mobile: '',
            fax: '',
            titleValue: '',
            titleKey: '',
            address: '',
            zip: '',
        };

    }

    componentDidMount() {
        this._getByIdPerson();
    }

    _getByIdPerson() {
        this.setState({visible: true})
        let url = Config.baseApi + Config.processApi.getAppUser;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log("-----------------------", responseText);
                responseText.success ? this._upDataPer(responseText.data) : Toast.message(responseText.msg);
            }
        })
    }

    _upDataPer(state) {
        this.setState({visible: false})
        const {email, fax, fullname, username, zip, title, address, phone, mobile, userId}=state[0];
        if (!isEmpty(mobile)) {
            this.setState({mobile})
        }
        if (!isEmpty(fax)) {
            this.setState({fax})
        }
        if (!isEmpty(userId)) {
            this.setState({userId})
        }
        if (!isEmpty(email)) {
            this.setState({email})
        }
        if (!isEmpty(fullname)) {
            this.setState({fullname})
        }
        if (!isEmpty(username)) {
            this.setState({username})
        }
        if (!isEmpty(zip)) {
            this.setState({zip})
        }
        if (!isEmpty(title)) {
            this.setState({titleValue: title})
        }
        if (!isEmpty(address)) {
            this.setState({address})
        }
        if (!isEmpty(phone)) {
            this.setState({phone})
        }
    }

    _resetPasswordAppUser() {
        /*data: props.props,
         ret:null,
         email:'zhiwei2012@163.com',
         phone:'150102108332',
         mobile:'11111111111',
         fax:'123123',
         titleValue:'1',
         address:'address',
         zip:'130500',*/
        const {data, fullname, zip, address, email, titleValue, phone, mobile, fax, userId, username} = this.state;
        let url = Config.baseApi + Config.processApi.profileAppUser +
            '?appUser.userId=' + userId +
            '&appUser.username=' + username +
            '&appUser.fullname=' + fullname +
            '&appUser.email=' + email +
            '&appUser.title=' + titleValue +
            '&appUser.phone=' + phone +
            '&appUser.mobile=' + mobile +
            '&appUser.fax=' + fax +
            '&appUser.zip=' + zip +
            '&appUser.address=' + address;
        if (isEmpty(fullname)) {
            Toast.message('员工姓名不能为空');
            return;
        }
        if (!isEmpty(email)) {
            if (!Tool.isEmail(email)) {
                return;
            }
        }

        /*if(isEmpty(titleValue)){
         Toast.message("性别必选");
         return;
         }*/
        // if (!isEmpty(phone)) {
        //     if (!Tool.isMobile(phone)) {
        //         return;
        //     }
        // }
        // if (!isEmpty(mobile)) {
        //     if (!Tool.isMobile(mobile)) {
        //         return;
        //     }
        // }
        /*if(isEmpty(fax)){
         Toast.message('传真不能为空');
         return;
         }
         if(isEmpty(address)){
         Toast.message('地址不能为空');
         return;
         }
         if(isEmpty(zip)){
         Toast.message('传真不能为空');
         return;
         }*/
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message(responseText.msg);
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true})});
    }

    sex = [{value: '1', text: '先生'}, {value: '2', text: '女士'}];

    render() {
        const {data, fullname, zip, address, email, titleValue, phone, mobile, fax, username} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View style={{margin: px2dp(15)}}>
                    <FormInput
                        data={data}
                        username={username}

                        zip={zip}
                        onChangeZip={(item) => {
                            this.setState({
                                zip: item,
                            })
                        }}

                        address={address}
                        onChangeAddress={(item) => {
                            this.setState({
                                address: item,
                            })
                        }}

                        fax={fax}
                        onChangeFax={(item) => {
                            this.setState({
                                fax: item,
                            })
                        }}

                        fullname={fullname}
                        onChangeFullname={(item) => {
                            this.setState({
                                fullname: item,
                            })
                        }}

                        phone={phone}
                        onChangePhone={(item) => {
                            this.setState({
                                phone: item,
                            })
                        }}

                        mobile={mobile}
                        onChangeMobile={(item) => {
                            this.setState({
                                mobile: item,
                            })
                        }}


                        email={email}
                        onChangeEmail={(item) => {
                            this.setState({
                                email: item,
                            })
                        }}


                        sex={this.sex}
                        sexValue={titleValue}
                        onSelectedSex={(item, index) => {
                            this.setState({
                                titleValue: item.value,
                                titlekey: item.text
                            })
                        }}
                    />
                    <View style={{
                        borderBottomRightRadius: px2dp(30),
                        borderBottomLeftRadius: px2dp(30),
                        flexDirection: 'row',
                        marginTop: px2dp(0),
                        justifyContent: 'space-around'
                    }}>
                        {data.selectDisabled ? <View/> :
                            <SmallButton style={{flex: 1}} name="保存" height={70} width={240}
                                         onPress={() => this._resetPasswordAppUser()}/>}
                    </View>
                </View>
                <Loading visible={this.state.visible}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})