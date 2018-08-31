/**
 * Created by duansailong on 2018/3/9.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../../Component/Title';
import {Input, Select} from 'teaset';
import SmallButton  from '../../../Component/SmallButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
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

const FormInput = (props) => {
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff',}}>
                    <DefaultInput placeholder={'请输入姓名'} name={'姓名：'} onChangeText={props.onChangeAddressText}/>
                    <DefaultInput placeholder={'请输入职务'} name={'职务：'} onChangeText={props.onChangeAddressText}/>
                    <DefaultInput keyboardType={"numeric"} placeholder={'请输入联系电话'} name={'联系电话：'} onChangeText={props.onChangeAddressText}/>
                    <DefaultSelect placeholder={'请选择'} name={'是否主联系人：'} value={props.maritalStatusValue}
                                   items={props.maritalStatusItems} onSelected={props.onSelectedmaritalStatus}/>
                    <DefaultInput placeholder={'请输入住址'} name={'住址：'} onChangeText={props.onChangeAddressText}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class EnterpriseContactInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

    }

    maritalStatusItems = ['已婚', '未婚'];

    componentDidMount() {
        this.setState({})
    }

    renderList (){
        var list = [];

        for (var i=0;i<50;i++) {
            list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
        }

        return list;
    }
    render() {
        const {maritalStatusValue} = this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                <ScrollView style={styles.container}>
                    <View>
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
                        />
                    </View>
                    <SmallButton style={{flex: 1,marginTop: px2dp(50)}} name="保存" height={70} width={240} onPress={()=>Actions.pop()}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        color: "black",
        fontSize: 22
    },

})


