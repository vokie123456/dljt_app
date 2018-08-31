/**
 * Created by duansailong on 2018/3/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Title from '../../Component/Title';
import SmallButton  from '../../Component/SmallButton'
const DefaultInput = (props) => {
    return (
		<View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80)
        }}>
			<Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
				style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
			<Input
				keyboardType={props.keyboardType ? props.keyboardType : 'default'}
				editable={props.readOnly ? false:true}//readonly属性
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

const DefaultChoice = (props) => {
    return  (
		<View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(80),
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

const DefaultSelect = (props) => {
    console.log("DefaultSelect",props.value);
    return (
		<View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:hair,
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

const FormInput = (props) => {
    console.log("propsFormInput",props);
    return (
		<ScrollView style={{}}>
			<KeyboardAwareScrollView>
				<View style={{paddingLeft: px2dp(15), backgroundColor: '#fff'}}>
					<DefaultInput placeholder={'借款业务'} name={'业务类别'} readOnly={true}
								  onChangeText={props.onChangeEmailText}/>
					<DefaultSelect placeholder={'请选择业务种类'} name={'业务种类'} value={props.businessTypeValue}
								   items={props.businessType} onSelected={props.onSelectedBusinessType}/>
					<DefaultChoice name={'网点名称'} valOne={props.networkNameKey} action="SelectNetwork"/>
					<DefaultSelect require placeholder={'请选择流程类别'} name={'流程类别'} value={props.processCategoryValue}
								   items={props.processCategory} onSelected={props.onSelectedProcessCategory}/>
					<DefaultChoice name={'客户经理'} valOne={props.dialogAppUserKey} action="SelectCustomer"/>
				</View>
			</KeyboardAwareScrollView>
		</ScrollView>
    )
}

export default class ApplyLoan extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        console.log("回调参数",props);
        super(props);
        // 初始状态
        this.state = {
            email: null,
            address: null,
            businessType: [],//业务种类
            businessTypeValue: '4',//业务种类
            // businessTypeValue: null,//业务种类
            // networkNameKey: "龙票集团",//网点名称
            networkNameKey: "",//网点名称
            networkNameValue: "37",//网点名称
            processCategory: [],//流程类别
            processCategoryValue: 'generalLoanFlow',//流程类别
            // processCategoryValue: null,//流程类别
            // dialogAppUserKey: "超级管理员",//客户经理
            dialogAppUserKey: "",//客户经理
            dialogAppUserValue: "",//客户经理

        };

    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.isRefresh2){
            this.setState({
                dialogAppUserKey: nextProps.key1,
                dialogAppUserValue: nextProps.key2,
            });
        }
        if(nextProps.isRefresh1){
            this.setState({
                networkNameKey: nextProps.key1,
                networkNameValue: nextProps.key2,
            });
        }
    }

    componentDidMount() {
        this.setState({});
        this._businessType();//业务种类
        this._processCategory();//流程类别

        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("????????", ret);
            this.setState({
                dialogAppUserKey: ret.tokenStr.fullname,
                dialogAppUserValue: ret.tokenStr.userIds,
                networkNameKey:ret.tokenStr.depName,
            });
            console.log("????????", this.state.dialogAppUserKey+'----'+this.state.dialogAppUserValue);
        }).catch(err => {
            console.warn(err.message);
        })

    }
    _businessType (){
        let url = Config.baseApi + Config.applyApi.businessType+'?proType=1036';
        RTRequest.fetch1(url).then((responseText) => {

            if (responseText) {
                console.log('业务种类', responseText);
                responseText.success ? this._key1(responseText.result, "businessType") : Toast.message(responseText.msg);
            }
        })
    }
    //提交测试注释
    _processCategory (){
        let url = Config.baseApi + Config.applyApi.processCategory+'?parentId=1066&flowKey=generalLoanFlow';
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('流程类别', responseText);
                responseText.success ? this._key1(responseText.result, "processCategory") : Toast.message(responseText.msg);
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

    _next(){
        console.log("aaaaaaa",this.state);
        Actions.AllCustomer({data: this.state});
    }

    render() {
        const {businessType,businessTypeValue,processCategory,processCategoryValue,dialogAppUserKey,networkNameKey} = this.state;
        return (
			<View style={styles.container}>
				<Title name={this.props.title} back/>
				<View style={{borderWidth: StyleSheet.hairlineWidth,borderColor: '#797979', margin: px2dp(15)}}>
					<Text style={styles.border}>项目基本信息</Text>
					<FormInput
						//流程类别
						businessType={businessType}
						businessTypeValue={businessTypeValue}
						onSelectedBusinessType={(item, index) => {
                            this.setState({
                                businessTypeValue: item.value
                            })
                        }}
						//流程类别
						processCategory={processCategory}
						processCategoryValue={processCategoryValue}
						onSelectedProcessCategory={(item, index) => {
                            this.setState({
                                processCategoryValue: item.value
                            })
                        }}
						//客户经理
						dialogAppUserKey={dialogAppUserKey}
						//网点名称
						networkNameKey={networkNameKey}

					/>
				</View>
				<SmallButton name="下一步" style={{marginTop: px2dp(40)}} height={75} width={250} onPress={()=>this._next()} />
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
    }

})


