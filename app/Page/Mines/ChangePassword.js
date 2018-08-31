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
                    backgroundColor:'transparent',
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
const FormInput = (props) => {
    return (
        <ScrollView>
            <View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
                <DefaultInput name={'旧密码'} valOne={props.oldPassword} placeholder={'请输入'} onChangeText={props.onChangeOldPassword} props={props}/>
                <DefaultInput name={'新密码'}  placeholder={'请输入'} props={props} valOne={props.newPassword} onChangeText={props.onChangeNewPassword}/>
                <DefaultInput name={'在输入'}  placeholder={'请输入'} props={props} valOne={props.againPassword} onChangeText={props.onChangeAgainPassword}/>
            </View>
        </ScrollView>
    )
}
export default class ChangePassword extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            oldPassword:null,//旧密码
            newPassword:null,//新密码
            againPassword:null,//在输入新密码
            data: props.props,
        };

    }

    componentDidMount() {
    }

    _resetPasswordAppUser() {
        const {data,oldPassword,newPassword,againPassword} = this.state;
        let url = Config.baseApi + Config.processApi.resetPasswordAppUser+
            '?oldPassword=' + oldPassword +
            '&newPassword=' +newPassword +
            '&againPassword=' +againPassword;
        if(isEmpty(oldPassword)){
            Toast.message("旧密码不能为空");
            return;
        }
        if(isEmpty(newPassword)){
            Toast.message("新密码不能为空");
            return;
        }
        if(isEmpty(againPassword)){
            Toast.message("确认密码不能为空");
            return;
        }
        if(newPassword!==againPassword){
            Toast.message("两次密码不一致");
            return;
        }
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message(responseText.msg);
            }
        })
    }
    _SUCCESS() {
        Toast.message("保存成功");
        storage.save({
            key: 'curUserInfo',
            data: {
            }
        });
        storage.save({
            key: 'isLogin',
            data: false
        });
        storage.clearMap();
        Actions.Login();
    }

    render() {
        const {data,oldPassword,newPassword,againPassword} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View style={{margin: px2dp(15)}}>
                    <FormInput
                        data={data}
                        oldPassword={oldPassword}
                        onChangeOldPassword={(item) => {
                            this.setState({
                                oldPassword:item,
                            })
                        }}

                        newPassword={newPassword}
                        onChangeNewPassword={(item) => {
                            this.setState({
                                newPassword:item,
                            })
                        }}

                        againPassword={againPassword}
                        onChangeAgainPassword={(item) => {
                            this.setState({
                                againPassword:item,
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})