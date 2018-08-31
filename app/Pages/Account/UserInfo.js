import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native' ;
import {Input, Select} from 'teaset'
import Title from '../../Component/Title';
import Picker from 'react-native-picker';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const DefaultInput = (props) => {

    return (

        <View style={{
            flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
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
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>

    )
}
const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}

const AddressSelect = (props) => {
    const pickerData = [
        {
            北京: [
                {
                    北京: ['朝阳', '海淀', '昌平']
                },
            ]
        },
        {
            河南: [
                {
                    郑州: ['惠济区', '二七区']
                },
                {
                    信阳: ['信阳一区', '信阳二区']
                },

            ]
        },
    ]
    selectAddress = () => {
        Picker.init({
            pickerData: pickerData,
            selectedValue: [],
            pickerTitleText: '',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerBg: [236, 236, 236, 1],
            /*    pickerToolBarBg: [245, 245, 245, 1],*/
            onPickerConfirm: data => {
                props.onChangeText(data)
                console.log(data);
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();

    }
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <TouchableOpacity onPress={() => this.selectAddress()}>
                <Text>
                    北京 北京市 朝阳区
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(20)}}>
            <KeyboardAwareScrollView>

                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff'}}>
                    <DefaultInput keyboardType={'email-address'} placeholder={'邮箱'} name={'邮箱'}
                                  onChangeText={props.onChangeEmailText}/>
                    <DefaultSelect require placeholder={'婚姻状况'} name={'婚姻状况'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    <DefaultSelect require placeholder={'居住地区'} name={'居住地区'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    <DefaultInput placeholder={'现居住详细地址'} name={'现居住详细地址'} onChangeText={props.onChangeAddressText}/>
                    <AddressSelect require placeholder={'工作单位地区'} name={'工作单位地区'}
                                   onChangeText={props.onChangeAreaText}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>

                    <DefaultSelect placeholder={'第一联系人'} name={'第一联系人'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    <DefaultInput require placeholder={'请输入真实姓名'} name={'直系亲属'} onChangeText={props.onChangeEmailText}/>
                    <DefaultInput keyboardType={'numeric'} require placeholder={'第一联系人手机号码'} name={'手机号码'}
                                  onChangeText={props.onChangeAddressText}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>

                    <DefaultSelect placeholder={'第二联系人'} name={'第二联系人'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    <DefaultInput require placeholder={'请输入真实姓名'} name={'直系亲属'} onChangeText={props.onChangeEmailText}/>
                    <DefaultInput require keyboardType={'numeric'} placeholder={'第一联系人手机号码'} name={'手机号码'}
                                  onChangeText={props.onChangeAddressText}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

export default class UserInfo extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {
        email: null,
        address: null,
        areaArray: []
    };

    maritalStatusItems = ['已婚', '未婚'];

    componentWillUnmount() {
        Picker.hide()
    }

    // 渲染
    render() {
        const {maritalStatusValue} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name='个人资料' back/>
                <FormInput
                    maritalStatusValue={maritalStatusValue}
                    maritalStatusItems={this.maritalStatusItems}
                    onSelectedmaritalStatus={(item, index) => {
                        this.setState({maritalStatusValue: item})
                    }}
                    onChangeEmailText={(email) => {
                        this.setState({
                            email
                        })
                    }}
                    onChangeAddressText={(address) => {
                        this.setState({
                            address
                        })
                    }}
                    onChangeAreaText={(areaArray) => {
                        this.setState({
                            areaArray
                        }, () => console.log('地区数组', areaArray))
                    }}
                />
            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    }
})
