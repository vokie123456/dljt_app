/**
 * Created by Administrator on 2018\8\6 0006.
 */
/**
 * Created by duansailong on 2018/3/8.
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
import Title from '../../Component/Title';
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton  from '../../Component/SmallButton';
import Icon from 'react-native-vector-icons/Ionicons';
/*收款账户信息*/
const DefaultInput = (props) => {
    const {inputDisabled} =  props.props.data;
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: inputDisabled ? '#fffdcc' : 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    marginRight: px2dp(20),
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                editable={inputDisabled ? false : true}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const DefaultChoice = (props) => {
    const {chooseDisabled} =  props.props.data;
    return (
        <View style={{borderBottomWidth: props.border?0:hair,
            flexDirection: 'row', borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Text onPress={
                chooseDisabled?"":()=>Actions[props.action]({data:props.data.props.data})
            }
                  style={{
                      backgroundColor: chooseDisabled? '#fffdcc' : 'transparent',
                      borderColor: 'transparent',
                      textAlign: 'left',
                      flex: 1,
                      paddingTop: px2dp(12),
                      marginRight: px2dp(38),
                      paddingBottom: px2dp(12),
                      width: px2dp(300),
                      paddingLeft: 0
                  }}
            >{props.valOne}</Text>
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultChoice name={'银行联系人'} valOne={props.name} data={props.this1}
                                     action="BankContacts" props={props}/>
                    <DefaultInput require placeholder={'请输入贷款银行'} name={'贷款银行'}
                                    valOne={props.bankName} props={props} onChangeText={props.onChangeBankName}/>
                    <DefaultInput keyboardType={"numeric"} border require placeholder={'请输入电话号码'} name={'电话号码'}
                                    valOne={props.blmtelephone} props={props} onChangeText={props.onChangeBlmtelePhone}/>
                </View>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput keyboardType={"numeric"} border require placeholder={'请输入职务'} name={'职务'}
                                  valOne={props.duty} props={props} onChangeText={props.onChangeDuty}/>
                    <DefaultInput keyboardType={"numeric"} border require placeholder={'请输入邮箱'} name={'邮箱'}
                                  valOne={props.email} props={props} onChangeText={props.onChangeEmail}/>
                </View>

            </KeyboardAwareScrollView>
            {props.data.chooseDisabled ? <View/> :
                <SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250}
                             onPress={()=>props.this1._savePerson()}/>}
        </ScrollView>
    )
}

export default class BankInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: props,
            name:'',//银行联系人
            bankname:'',//贷款银行
            fenbankvalue:'',
            bankid:'',//贷款银行ID
            blmtelephone:'',//贷款人电话
            duty:'',//职务
            email:'',//邮箱
            id:'',
            fenbankid:'',
        };
    }

    componentDidMount() {
       this._upDataState();
    }

    componentWillReceiveProps(nextProps) {
        if (isEmpty(nextProps.users)) {
            return;
        }
        const {name,bankname,bankid,blmtelephone,duty,email,fenbankvalue,id,fenbankid} = nextProps.users;
        if (nextProps.isRefresh) {
            this.setState({
                name,
                bankname,
                bankid,
                blmtelephone,
                duty,
                email,
                id,
                fenbankid,
            });
        }
    }

    _upDataState() {
        if (isEmpty(this.props.data.allData.customerBankRelationPerson)) {
            return;
        }
        const {name,bankName,bankid,fenbankid,email,blmtelephone,duty,id} =this.props.data.allData.customerBankRelationPerson;
        if (!isEmpty(name)) {
            this.setState({name});
        }
        if (!isEmpty(bankName)) {
            this.setState({bankname: bankName});
        }
        if (!isEmpty(bankid)) {
            this.setState({bankid});
        }
        if (!isEmpty(fenbankid)) {
            this.setState({fenbankid});
        }
        if (!isEmpty(blmtelephone)) {
            this.setState({blmtelephone})
        }
        if (!isEmpty(duty)) {
            this.setState({duty})
        }
        if (!isEmpty(email)) {
            this.setState({email})
        }
        if (!isEmpty(id)) {
            this.setState({id})
        }

    }
    _savePerson(){
        const{name,bankname,bankid,blmtelephone,duty,email,id,fenbankid,data} = this.state;
        if(isEmpty(bankname)){
            Toast.message('贷款银行不能为空');
            return;
        }
        if(!Tool.isMobile(blmtelephone)){
            return;
        }
        if(isEmpty(duty)){
            Toast.message('职务不能为空');
            return;
        }
        if(isEmpty(email)){
            Toast.message('邮箱不能为空');
            return;
        }
        let url = Config.baseApi + Config.twoApi.updateGLGuarantee+
            "?gLGuaranteeloanProject.projectId="+this.props.data.data.vars[0].projectId+
            '&person.id='+ this.props.data.allData.person.id +
            '&task_id'+  this.props.data.data.taskId +
            '&enterprise.id=' + this.props.data.allData.enterprise.id +
            "&preHandler=gLGuaranteeloanProjectService.guaranteeBusinessNextStep" +
            '&customerBankRelationPerson.id='+id +
            '&customerBankRelationPerson.bankid='+ bankid +
            '&customerBankRelationPerson.bankName='+ bankname +
            '&businessTypeKey='+  this.props.data.allData.businessTypeKey +
            '&customerBankRelationPerson.name='+ name +
            '&customerBankRelationPerson.blmtelephone='+ blmtelephone +
            '&customerBankRelationPerson.duty='+ duty +
            "&customerBankRelationPerson.email="+ email+
            "&gLGuaranteeloanProject.productName="+ this.props.data.allData.gLGuaranteeloanProject.productName;
        console.log('保存信息', url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('保存信息', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("登录超时，请重新登录!");
            }
        })
    }
    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    render() {
        const {name,bankname,bankid,blmtelephone,duty,email,id,fenbankid,data} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={this.props.title} back/>
                <FormInput
                    name={name}
                    bankName={bankname}
                    onChangeBankName={(text) => {
                        this.setState({
                            bankname: text
                        })
                    }}
                    blmtelephone={blmtelephone}
                    onChangeBlmtelePhone={(text) => {
                        this.setState({
                            blmtelephone: text
                        })
                    }}
                    duty={duty}
                    onChangeDuty={(text) => {
                        this.setState({
                            duty: text
                        })
                    }}
                    email={email}
                    onChangeEmail={(text) => {
                        this.setState({
                            email: text
                        })
                    }}
                    data={data}
                    this1={this}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    defaultView: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    }
})





