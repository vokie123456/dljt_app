'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import Title from '../../../Component/Title';
import {Input, Select} from 'teaset';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import SmallButton from '../../../Component/SmallButton';
import Icon from 'react-native-vector-icons/Ionicons';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '* ' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    marginRight: px2dp(34),
                    paddingLeft: 0
                }}
                editable={true}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
};

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : hair,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '* ' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{
                    flex: 1,
                    marginRight: px2dp(36),
                    paddingLeft: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                }}
                size='md'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                pickerTitle={`请选择 ${props.name}`}
                disabled={false}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
};

const FormInput = (props) => {
    return (
        <ScrollView style={{marginTop: px2dp(0)}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput require placeholder={'请输入姓名'} name={'姓名'}
                                  valOne={props.relationName} onChangeText={props.onChangeRelationName} props={props}/>
                    <DefaultInput require placeholder={'请输入职业'} name={'职业'}
                                  valOne={props.relationProfession} onChangeText={props.onChangeRelationProfession}
                                  props={props}/>
                    <DefaultSelect require placeholder={'关系'} name={'关系'} value={props.relationShipValue}
                                   items={props.relationShipType} onSelected={props.onSelectedRelationShipType}
                                   props={props}/>
                    <DefaultInput require placeholder={'请输入手机号码'} name={'手机'}
                                  valOne={props.relationCellPhone} onChangeText={props.onChangeRelationCellPhone}
                                  props={props}/>
                    <DefaultInput require placeholder={'请输入住址'} name={'住址'}
                                  valOne={props.relationAddress} onChangeText={props.onChangeRelationAddress}
                                  props={props}/>
                    <DefaultInput require placeholder={'请输入工作单位'} name={'工作单位'}
                                  valOne={props.relationJobAddress} onChangeText={props.onChangeRelationJobAddress}
                                  props={props}/>
                    <DefaultInput require placeholder={'请输入单位电话'} name={'单位电话'}
                                  valOne={props.relationCompanyPhone} onChangeText={props.onChangeRelationCompanyPhone}
                                  props={props}/>
                    <DefaultSelect border require placeholder={'联系人类型'} name={'联系人类型'}
                                   value={(isEmpty(props.flagKey) ? props.flagKey : props.flagKey)}
                                   items={props.flags} onSelected={props.onSelectedFlagType} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            {/*{props.data.chooseDisabled?<View/>:<SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={()=>props.this1._savePerson()} />}*/}
        </ScrollView>
    )
};

export default class ContactPersonInfoDetail extends PureComponent {
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log('%&%&%&%&%&%&%&%&%&%&%&%&%&%&%&%&', this.props)
        this.state = {
            data: '',
            relationAddress: "",
            relationCellPhone: "",
            relationCompanyPhone: "",
            relationJobAddress: "",
            relationJobCompany: "",
            relationName: "",
            relationPhone: "",
            relationProfession: "",
            relationShip: 0,
            relationShipType: [],
            relationShipValue: null,
            flagKey: null,
            flag: ""
        };
    }

    //联系人类型数组
    flags = [{
        text: '家庭联系人',
        value: 0
    }, {
        text: '工作联系人',
        value: 1
    }, {
        text: '紧急联系人',
        value: 2
    }];

    componentDidMount() {
        this.setState({});
        if (this.props.type1 === "see") {
            this._updateState();
        }
        this._getContactDetail();
        this._relationShipValue();
    }

    _getContactDetail = () => {
        let id = (this.props.type1 === "see" ? this.props.data.id : this.props.allData.id);
        let url = Config.baseApi + Config.publicApi.seePersonRelation + '?id=' + id;
        RTRequest.fetch1(url).then((responseText) => {
            console.log('======================>>>>>>>>>>>>>>>>>>>>>>>>responseText', responseText);
            if (responseText.success) {
                let flagK = '';
                this.flags.map((item) => {
                    if (item.value == responseText.data.flag) {
                        flagK = item.text;
                    }
                });
                this.setState({
                    data: responseText.data,
                    flagKey: flagK
                })
            }
            console.log('aa======================>>>>>>>>>>>>>>>>>>>>>>>>...', this.props);
        })
    };

    //请求关系数据
    _relationShipValue = () => {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + 'gxrgx';
        RTRequest.fetch1(url).then((responseText) => {
            responseText.success ? this._parsingList(responseText.result, 'relationShipType') : Toast.message(responseText.msg);
        })
    };

    //解析数组
    _parsingList = (list, parameter) => {
        let dataBlob = [];
        let i = 0;
        for (let i = 1; i < list.length; i++) {
            let item = {
                text: list[i].text,
                value: list[i].value,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        })
    };

    _updateState() {
        if (isEmpty(this.props)) {
            return;
        }
        const {relationAddress, relationCellPhone, relationCompanyPhone, relationJobAddress, relationJobCompany, relationName, relationPhone, relationProfession, relationShip, relationShipValue, flag, flagKey} = this.props.data;
        if (!isEmpty(relationAddress)) {
            this.setState({
                relationAddress: relationAddress
            })
        }
        if (!isEmpty(relationCellPhone)) {
            this.setState({
                relationCellPhone: relationCellPhone
            })
        }
        if (!isEmpty(relationCompanyPhone)) {
            this.setState({
                relationCompanyPhone: relationCompanyPhone
            })
        }
        if (!isEmpty(relationJobAddress)) {
            this.setState({
                relationJobAddress: relationJobAddress
            })
        }
        if (!isEmpty(relationJobCompany)) {
            this.setState({
                relationJobCompany: relationJobCompany
            })
        }
        if (!isEmpty(relationName)) {
            this.setState({
                relationName: relationName
            })
        }
        if (!isEmpty(relationPhone)) {
            this.setState({
                relationPhone: relationPhone
            })
        }
        if (!isEmpty(relationProfession)) {
            this.setState({
                relationProfession: relationProfession
            })
        }
        if (!isEmpty(relationShip)) {
            this.setState({
                relationShip: relationShip
            })
        }
        if (!isEmpty(relationShipValue)) {
            this.setState({
                relationShipValue: relationShipValue
            })
        }
        if (!isEmpty(flag)) {
            this.setState({
                flag: flag
            })
        }
        if (!isEmpty(flagKey)) {
            this.setState({
                flagKey: flagKey
            })
        }
    }

    //保存修改过过得联系人信息
    _saveUpdatePersonRelation = () => {
        let url = Config.baseApi + Config.publicApi.updatePersonRelation +
            '?personRelation.relationName=' + this.state.relationName +
            '&personRelation.relationShip=' + this.state.relationShip +
            '&personRelation.relationJobAddress=' + this.state.relationJobAddress +
            '&personRelation.flag=' + this.state.flag +
            '&personRelation.relationPhone=' + this.state.relationPhone +
            '&personRelation.relationCellPhone=' + this.state.relationCellPhone +
            '&personRelation.personId=' + this.props.data.personId +
            '&personRelation.relationJobCompany=' + this.state.relationJobCompany +
            '&personRelation.relationProfession=' + this.state.relationProfession +
            '&personRelation.relationAddress=' + this.state.relationAddress +
            '&personRelation.relationCompanyPhone=' + this.state.relationCompanyPhone +
            '&personRelation.id=' + this.props.data.id;
        RTRequest.fetch1(url).then((responseText) => {
            console.log('responseText+++++++++++++++++++++++', responseText)
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message('请检查网络连接');
            }
        })
    };

    _savePerson = () => {
        let url = Config.baseApi + Config.publicApi.addPersonRelation +
            '?personRelation.relationName=' + this.state.relationName +
            '&personRelation.relationShip=' + this.state.relationShip +
            '&personRelation.relationJobAddress=' + this.state.relationJobAddress +
            '&personRelation.flag=' + this.state.flag +
            '&personRelation.relationPhone=' + this.state.relationPhone +
            '&personRelation.relationCellPhone=' + this.state.relationCellPhone +
            '&personRelation.personId=' + this.props.allData.id +
            '&personRelation.relationJobCompany=' + this.state.relationJobCompany +
            '&personRelation.relationProfession=' + this.state.relationProfession +
            '&personRelation.relationAddress=' + this.state.relationAddress +
            '&personRelation.relationCompanyPhone=' + this.state.relationCompanyPhone;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message('请检查网络连接');
            }
        })
    };

    _SUCCESS() {
        Toast.message('保存成功');
        Actions.pop({refresh: ({isRefresh: true, data1: new Date()})})
    }

    //非空判断
    _determineWhetherIsEmpty = () => {
        const {relationName, relationProfession, relationShipValue, relationCellPhone, relationAddress, relationJobAddress, relationCompanyPhone, flagKey} = this.state;
        let mobileCodeReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (isEmpty(relationName)) {
            Toast.message('请输入姓名');
            return;
        } else if (isEmpty(relationProfession)) {
            Toast.message('请输入职业');
            return;
        } else if (isEmpty(relationShipValue)) {
            Toast.message('请选择关系');
            return;
        } else if (isEmpty(relationCellPhone)) {
            Toast.message('请输入手机号');
            return;
        } else if (!mobileCodeReg.test(relationCellPhone)) {
            Toast.message('请输入正确的手机号');
            return;
        } else if (isEmpty(relationAddress)) {
            Toast.message('请输入地址');
            return;
        } else if (isEmpty(relationJobAddress)) {
            Toast.message('请输入公司地址');
            return;
        } else if (isEmpty(relationCompanyPhone)) {
            Toast.message('请输入公司电话');
            return;
        } else if (isEmpty(flagKey)) {
            Toast.message('请选择联系人类型');
            return;
        } else {
            this.refs.modalSix.open()
            return;
        }

    };

    render() {
        const {relationAddress, relationCellPhone, relationCompanyPhone, relationJobAddress, relationJobCompany, relationName, relationPhone, relationProfession, relationShipValue, relationShipType, flag, flagKey} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <ScrollView>
                    <FormInput
                        //住址
                        relationAddress={relationAddress}
                        onChangeRelationAddress={(text) => {
                            this.setState({
                                relationAddress: text
                            })
                        }}
                        //手机
                        relationCellPhone={relationCellPhone}
                        onChangeRelationCellPhone={(text) => {
                            this.setState({
                                relationCellPhone: text
                            })
                        }}

                        //公司电话
                        relationCompanyPhone={relationCompanyPhone}
                        onChangeRelationCompanyPhone={(text) => {
                            this.setState({
                                relationCompanyPhone: text
                            })
                        }}
                        //工作地点
                        relationJobAddress={relationJobAddress}
                        onChangeRelationJobAddress={(text) => {
                            this.setState({
                                relationJobAddress: text
                            })
                        }}
                        //公司
                        relationJobCompany={relationJobCompany}
                        //姓名
                        relationName={relationName}
                        onChangeRelationName={(text) => {
                            this.setState({
                                relationName: text
                            })
                        }}
                        relationPhone={relationPhone}
                        //职业
                        relationProfession={relationProfession}
                        onChangeRelationProfession={(text) => {
                            this.setState({
                                relationProfession: text
                            })
                        }}
                        //关系
                        relationShipValue={relationShipValue}
                        relationShipType={relationShipType}
                        onSelectedRelationShipType={(item, index) => {
                            this.setState({
                                relationShipValue: item.text,
                                relationShip: item.value
                            })
                        }}
                        //联系人类型
                        flags={this.flags}
                        flagKey={flagKey}
                        // flag={flag}
                        onSelectedFlagType={(item, index) => {
                            this.setState({
                                flagKey: item.text,
                                flag: item.value
                            })
                        }}
                        this1={this}
                    />
                    <SmallButton name="保存" style={{marginBottom: px2dp(10)}} height={75} width={250} onPress={() => this._determineWhetherIsEmpty()}/>
                </ScrollView>
                <Modal style={styles.modal} position={"center"} ref={"modalSix"} swipeArea={20}>
                    <View style={styles.viewBG}>
                        <Text style={styles.textView}>确定保存</Text>
                    </View>
                    <View style={{flex: 1.5,borderBottomRightRadius: px2dp(30),borderBottomLeftRadius: px2dp(30),flexDirection: 'row',justifyContent: 'space-around'}}>
                        <SmallButton name="确定" style={{flex: 1}} height={70} width={200} onPress={this.props.type1 === "see" ? () => this._saveUpdatePersonRelation() : () => this._savePerson()}/>
                        <SmallButton name="取消" style={{flex: 1}} height={70} width={200} onPress={() => this.refs.modalSix.close()}/>
                    </View>
                </Modal>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    text: {
        color: "black",
        fontSize: px2dp(26)
    },
    viewBG:{
        paddingLeft: px2dp(15),
        paddingTop: px2dp(15),
        borderTopLeftRadius:px2dp(30),
        borderTopRightRadius:px2dp(30),
        // backgroundColor: '#999',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1
    },
    textView:{
        fontSize:px2dp(38),
        color:'#3A93F5',
    },
    modal: {
        height: global.SCREEN_HEIGHT*.22,
        width: global.SCREEN_WIDTH*.75,
        backgroundColor: '#ebebeb',
        borderRadius: px2dp(30)
    }
});