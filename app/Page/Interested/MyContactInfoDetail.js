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
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100)
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}
                <Text
                    style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text>
            </Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                editable={props.disabled? false : true}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>

    )
}

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
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
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>
                    <DefaultInput name={'姓名：'} value={props.relationName} onChangeText={props.onChangeRelationName}/>
                    <DefaultInput name={'职务：'} value={props.relationJob} onChangeText={props.onChangeRelationJob}/>
                    <DefaultInput name={'固定电话：'} value={props.relationFixedPhone}
                                  onChangeText={props.onChangeFixedTell}/>
                    <DefaultInput name={'移动电话：'} value={props.relationMovePhone}
                                  onChangeText={props.onChangeMobileTell}/>
                    <DefaultInput name={'企业联系人姓名：'} value={props.bossName} onChangeText={props.onChangeBossName}/>
                    <DefaultInput name={'企业联系人电话：'} value={props.bossPhone} onChangeText={props.onChangeBossTell}/>
                    <DefaultSelect require name={'是否主联系人：'} value={props.markText}
                                   items={props.MarkArray} onSelected={props.onSelectedMark}/>
                    <DefaultInput name={'住址：'} value={props.relationFamilyAddress}
                                  onChangeText={props.onChangeAddress}/>
                    <DefaultInput name={'备注：'} value={props.remarks} onChangeText={props.onChangeReMarks}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )

}
/*企业联系人详情*/
export default class MyContactInfoDetail extends Component {

    // 构造
    constructor(props) {
        super(props);
        console.log("sss", props.data);
        this.state = {
            mark: '',
            markText: '',
            MarkArray: [
                {text: "是", value: true},
                {text: "否", value: false},
            ],
            relationName: '',
            relationJob: '',
            relationFixedPhone: '',
            relationMovePhone: '',
            bossName: '',
            bossPhone: '',
            relationFamilyAddress: '',
            remarks: '',
        }
        ;
    }

    componentDidMount() {
        this._setState1()
    }


    _setState1() {
        const {bossName,bossPhone,relationFamilyAddress,relationFixedPhone,relationJob,relationMovePhone,relationName,remarks,mark} = this.props.data;
        if (!isEmpty(relationName)) {
            this.setState({
                relationName: relationName
            });
        }
        if (!isEmpty(mark)) {
            this.setState({
                mark: mark
            });
        }
        if (!isEmpty(relationFixedPhone)) {
            this.setState({
                relationFixedPhone: relationFixedPhone
            });
        }
        let markTexts = ''
        this.state.MarkArray.map((item) => {
            if (item.value === this.props.data.mark) {
                markTexts = item.text
            }
        });
        this.setState({
            markText: markTexts
        })
        if (!isEmpty(relationJob)) {
            this.setState({
                relationJob: relationJob
            });
        }
        if (!isEmpty(relationMovePhone)) {
            this.setState({
                relationMovePhone: relationMovePhone
            });
        }
        if (!isEmpty(remarks)) {
            this.setState({
                remarks: remarks
            });
        }
        if (!isEmpty(bossName)) {
            this.setState({
                bossName: bossName
            });
        }
        if (!isEmpty(bossPhone)) {
            this.setState({
                bossPhone: bossPhone
            });
        }
        if (!isEmpty(relationFamilyAddress)) {
            this.setState({
                relationFamilyAddress: relationFamilyAddress
            });
        }
    }

    _updatePersonInfo() {
        const {relationName,relationFixedPhone,relationMovePhone,mark,relationJob,bossName,bossPhone,relationFamilyAddress,remarks}=this.state;
        // let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        // if (!reg.test(relationFixedPhone)) {
        //     Toast.message("固定电话格式不正确");
        //     return;
        // }
        // if (!reg.test(relationFixedPhone)) {
        //     Toast.message("移动电话格式不正确");
        //     return;
        // }
        // if (!reg.test(bossPhone)) {
        //     Toast.message("Boss电话格式不正确");
        //     return;
        // }
        let url = Config.baseApi + "/api//updateRelationPersonEnterpriseRelationPerson.do"
            + "?relationPerson.relationName=" + relationName
            + "&relationPerson.relationFixedPhone=" + relationFixedPhone
            + "&relationPerson.relationMovePhone=" + relationMovePhone
            + "&relationPerson.mark=" + mark
            + "&relationPerson.relationJob=" + relationJob
            + "&relationPerson.bossName=" + bossName
            + "&relationPerson.bossPhone=" + bossPhone
            + "&relationPerson.relationFamilyAddress=" + relationFamilyAddress
            + "&relationPerson.remarks=" + remarks
            + "&relationPerson.enterpriseid=" + this.props.data.enterpriseid
            + "&relationPerson.id=" + this.props.data.id
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络");
            }
        })
    }

    _SUCCESS() {
        Toast.message("更新成功");
        Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
    }

    _render = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        this.setState({
            prodData: dataBlob,
        })
    }

    render() {
        const {bossName,bossPhone,relationName,MarkArray,mark,relationFixedPhone,relationMovePhone,markText,customerType,relationJob,relationFamilyAddress,remarks}=this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View>
                    <FormInput
                        that={this}

                        MarkArray={MarkArray}
                        markText={markText}
                        onSelectedMark={(item) => {
                        this.setState({
                                markText:item.text,
                                mark: item.value
                            })
                        }}
                        relationName={relationName}
                        onChangeName={(relationName) => {
                            this.setState({
                                relationName
                            })
                        }}
                        relationJob={relationJob}
                        onChangeRelationJob={(relationJob) => {
                            this.setState({
                                relationJob
                            })
                        }}
                        relationFixedPhone={relationFixedPhone}
                        onChangeFixedTell={(relationFixedPhone) => {
                            this.setState({
                                relationFixedPhone
                            })
                        }}
                        relationMovePhone={relationMovePhone}
                        onChangeMobileTell={(relationMovePhone) => {
                            this.setState({
                                relationMovePhone
                            })
                        }}
                        bossName={bossName}
                        onChangeBossName={(bossName) => {
                            this.setState({
                                bossName
                            })
                        }}
                        bossPhone={bossPhone}
                        onChangeBossTell={(bossPhone) => {
                            this.setState({
                                bossPhone
                            })
                        }}
                        relationFamilyAddress={relationFamilyAddress}
                        onChangeAddress={(relationFamilyAddress) => {
                            this.setState({
                                relationFamilyAddress
                            })
                        }}
                        remarks={remarks}
                        onChangeReMarks={(remarks) => {
                            this.setState({
                                remarks
                            })
                        }}
                    />
                </View>
                <View
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: px2dp(150), paddingBottom: px2dp(10)}}>
                    <SmallButton name="更新" style={{flex: 1}} height={75} width={250}
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
                                     onPress={()=>this._updatePersonInfo()}/>
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