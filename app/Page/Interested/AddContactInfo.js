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
import SmallButton from '../../Component/SmallButton';
import {Input, Select,Toast} from 'teaset';
import Modal from 'react-native-modalbox';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
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
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerType='popover'
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}

const FormInput = (props) => {
    let that = props.that;
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput name={'姓名：'} onChangeText={props.onChangeRelationName}/>
                    <DefaultInput name={'职务：'} onChangeText={props.onChangeRelationJob}/>
                    <DefaultInput name={'固定电话：'} onChangeText={props.onChangeRelationFixedPhone}/>
                    <DefaultInput name={'移动电话：'} onChangeText={props.onChangeRelationMovePhone}/>
                    <DefaultSelect require name={'是否主联系人：'} value={props.customerTypeValue}
                                   items={props.customerType} onSelected={props.onSelectedCustomerType}/>
                    <DefaultInput name={'住址：'} onChangeText={props.onChangeRelationFamilyAddress}/>
                    <DefaultInput name={'备注：'} onChangeText={props.onChangeReMarks}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )

}
/*======添加企业联系人======*/
export default class AddContactInfo extends Component {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            customerTypeValue: null,
            customerType: [
                {text: "是", value: true},
                {text: "否", value: false},
            ],
            relationName: '',
            relationJob: '',
            relationFixedPhone: '',
            relationMovePhone: '',
            relationFamilyAddress: '',
            remarks: '',
        };
    }

    componentDidMount() {
        if (!isEmpty(this.props.newId)) {
            this.setState({id: this.props.newId});
        } else {
            this.setState({id: this.props.allData.id});
        }
    }

    _addPersonInfo() {
        const {id,relationName,relationFixedPhone,relationMovePhone,customerTypeValue,relationJob,relationFamilyAddress,remarks}=this.state;
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!isEmpty(relationMovePhone)){
            if (!reg.test(relationMovePhone)) {
                Toast.message("移动电话格式不正确");
                return;
            }
        }
        let url = Config.baseApi + "/api/addRelationPersonEnterpriseRelationPerson.do"
            + "?relationPerson.relationName=" + relationName
            + "&relationPerson.relationFixedPhone=" + relationFixedPhone
            + "&relationPerson.relationMovePhone=" + relationMovePhone
            + "&relationPerson.mark=" + customerTypeValue
            + "&relationPerson.relationJob=" + relationJob
            + "&relationPerson.relationFamilyAddress=" + relationFamilyAddress
            + "&relationPerson.remarks=" + remarks
            + "&relationPerson.enterpriseid=" + id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络");
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {customerTypeValue,customerType,relationName,relationJob,relationFixedPhone,relationMovePhone,relationFamilyAddress,remarks} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View>
                    <FormInput
                        that={this}
                        customerType={customerType}
                        customerTypeValue={customerTypeValue}
                        onSelectedCustomerType={(item) => {
                        this.setState({
                            customerTypeValue: item.value
                        })
                    }}
                        onChangeRelationName={(relationName) => {
                            this.setState({
                                relationName
                            })
                        }}
                        onChangeRelationJob={(relationJob) => {
                            this.setState({
                                relationJob
                            })
                        }}
                        onChangeRelationFixedPhone={(relationFixedPhone) => {
                            this.setState({
                                relationFixedPhone
                            })
                        }}
                        onChangeRelationMovePhone={(relationMovePhone) => {
                            this.setState({
                                relationMovePhone
                            })
                        }}
                        onChangeRelationFamilyAddress={(relationFamilyAddress) => {
                            this.setState({
                                relationFamilyAddress
                            })
                        }}
                        onChangeReMarks={(remarks) => {
                            this.setState({
                                remarks
                            })
                        }}
                    />
                </View>
                <View
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: px2dp(150), paddingBottom: px2dp(10)}}>
                    <SmallButton name="保存" style={{flex: 1}} height={75} width={250}
                                 onPress={()=>this.refs.ss.open()}/>
                </View>
                <Modal style={styles.modal} position={"center"} ref={"ss"} swipeArea={20}>
                    <View>
                        <Text
                            style={{fontSize:28,textAlign:'center',marginBottom:px2dp(30),marginTop:px2dp(20),color:'blue'}}>
                            确认保存
                        </Text>
                    </View>
                    <View
                        style={{borderBottomRightRadius: px2dp(30),borderBottomLeftRadius: px2dp(30),flexDirection: 'row',justifyContent: 'space-around'}}>
                        <SmallButton name="确定" style={{flex: 1}} height={70} width={240}
                                     onPress={()=>this._addPersonInfo()}/>
                        <SmallButton name="取消" style={{flex: 1}} height={70} width={240}
                                     onPress={()=>this.refs.ss.close()}/>
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
    modal: {
        height: global.SCREEN_HEIGHT * .2,
        width: global.SCREEN_WIDTH * .85,
        borderRadius: px2dp(10)
    }
})


