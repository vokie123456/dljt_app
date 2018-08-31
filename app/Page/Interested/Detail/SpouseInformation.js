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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';;
import Icon from "react-native-vector-icons/Ionicons";
import Loading from '../../../Component/Loading'
const DefaultInput = (props) => {
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
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={props.valOne}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
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
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                pickerType='popover'
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
    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(36), backgroundColor: '#fff', marginTop: px2dp(20)}}>

                    <DefaultInput require placeholder={'请输入 : '} name={'配偶姓名'} onChangeText={props.onChangemateName}  valOne={props.mateName} props={props}/>

                    <DefaultSelect require placeholder={'请选择'} name={'证件类型'} value={(isEmpty(props.certificateTypeValue)?props.certificateTypeValue:props.certificateTypeValue+"")}
                                   items={props.certificateType} onSelected={props.onSelectedcertificateType} props={props}/>

                    <DefaultInput keyboardType={"numeric"} require placeholder={'请输入证件号码'} name={'证件号码'}
                                  valOne={props.cardNumber} onChangeText={props.onChangeCardNumber} props={props}/>

                    <DefaultSelect placeholder={'请选择'} name={'学历'} value={(isEmpty(props.dgreeTypeValue)?props.dgreeTypeValue:props.dgreeTypeValue+"")}
                                   items={props.dgreeType} onSelected={props.onSelectedgreeType} props={props}/>

                    <DefaultSelect placeholder={'请选择'} name={'政治面貌 : '}  value={(isEmpty(props.politicsTypeValue)?props.politicsTypeValue:props.politicsTypeValue+"")}
                                   items={props.politicsType} onSelected={props.onSelectepoliticsType} props={props}/>
                    <DefaultInput placeholder={'请输入'} name={'联系电话 : '} onChangeText={props.onChangemateTel}  valOne={props.mateTel} props={props}/>
                </View>
            </KeyboardAwareScrollView>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: px2dp(150), paddingBottom: px2dp(10)}}>
                <SmallButton name="保存" style={{flex: 1}} height={75} width={250} onPress={()=>props.this1._savePerson()} />
            </View>
        </ScrollView>
    )
}

export default class SpouseInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("_++_+__++_+_++",props);
        // 初始状态
        this.state = {
            visible: false,
            id:props.id,
            //配偶信息
            mateName: '',
            job:'',
            mateTel:'',
            mateNameId:'',
            dgree: [],//学历
            dgreeKey: null,
            dgreeValue: null,

            //证件类型
            certificateType: [],
            certificateTypeKey: null,
            certificateTypeValue: null,
            certificateNumber: '',

            //政治面貌
            politics: [],
            politicsTyoeKey:null,
            politicsValue:null,
        }
    }
    componentDidMount() {
        this._dialogAppUser();
        this._showEducation();
        this._politics();
        this._certificate();
    }
    _dialogAppUser (){
        let url = Config.baseApi + Config.publicApi.getInfoSpouse+"?personId="+this.state.id;
        console.log('==============idididid==========', this.state.id)
        this.setState({visible: true})
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('配偶信息', responseText);
                responseText.success ? this._upDataPer(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    _upDataPer(state) {
        console.log("state",state)
        this.setState({visible: false})
        const {spouseId,cardnumber,name,personId,cardtype,politicalStatus,dgree,linkTel,job} = state;
        this.setState({mateNameId:spouseId});
        this.setState({job:job});
        if(!isEmpty(cardnumber)) {
            this.setState({certificateNumber:cardnumber});
        }
        if(!isEmpty(name)) {
            this.setState({mateName:name});
        }
        if(!isEmpty(cardtype)) {
            this.setState({certificateTypeValue:cardtype+""});
        }
        if(!isEmpty(politicalStatus)) {
            this.setState({politicsValue:politicalStatus})
        }
        if(!isEmpty(dgree)) {
            this.setState({
                dgreeValue:dgree
            })
        }
        if(!isEmpty(linkTel)) {
            this.setState({
                mateTel:linkTel
            })
        }

    }


    _showEducation (){//学历
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl+'dgree';
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log("学历-------------",responseText);
                responseText.success ? this._key1(responseText.result, "dgree") : Toast.message(responseText.msg);
            }
        })
    }

    _politics (){//政治面貌
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl+'zzmm';
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log("政治面貌-------------",responseText);
                responseText.success ? this._key1(responseText.result, "politics") : Toast.message(responseText.msg);
            }
        })
    }

    _certificate (){
        let url = Config.baseApi + Config.publicApi.dictionaryUrl + "证件类型";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('证件类型', responseText);
                responseText.success ? this._key1(responseText.result, "certificateType") : Toast.message(responseText.msg);
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

    _savePerson=()=>{
       /* spouse.personId:
        952
        spouse.spouseId:
        spouse.name:
        张小帅
        spouse.dgree:
        480
        spouse.linkTel:
        13267767734
        spouse.cardtype:
        310
        spouse.job:
        580
        spouse.cardnumber:
        4343434
        spouse.politicalStatus:
        792
       */
        const {mateNameId,mateName,dgreeValue,certificateTypeValue,mateTel,job,certificateNumber,politicsValue,certificateTypeKey} = this.state;
        let url = Config.baseApi + Config.publicApi.addSpouse +
            '?spouse.personId='+this.state.id+
            '&spouse.spouseId='+mateNameId+
            '&spouse.name='+mateName+
            '&spouse.dgree='+dgreeValue+
            '&spouse.linkTel='+mateTel+
            '&spouse.job='+job+
            '&spouse.cardtype='+certificateTypeValue+
            '&spouse.cardnumber='+certificateNumber+
            '&spouse.politicalStatus='+politicsValue;
        if(isEmpty(mateName)){
            Toast.message("配偶姓名不能为空");
            return;
        }
        if(isEmpty(certificateTypeValue)){
            Toast.message("证件类型不能为空");
            return;
        }
        if(isEmpty(certificateNumber)){
            Toast.message("证件号码不能为空");
            return;
        }
        if(certificateTypeValue==='309'){
            if(!Tool.isIdCard(certificateNumber)){
                return;
            }
        }
        if(!isEmpty(mateTel)){
            if(!Tool.isMobile(mateTel)){
                return;
            }
        }
        // if(isEmpty(dgreeValue)){
        //     Toast.message("学历不能为空");
        //     return;
        // }
        // if(isEmpty(politicsValue)){
        //     Toast.message("政治面貌不能为空");
        //     return;
        // }

        RTRequest.fetch1(url).then((responseText) => {
            console.log('保存信息', responseText);
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS(){
        Toast.message("保存成功");
        Actions.pop();
    }

    render() {
        const {mateName,data,mateTel,mateNameId,dgree,dgreeKey,dgreeValue,politics,politicsTyoeKey,politicsValue,certificateNumber,certificateTypeKey,certificateType,certificateTypeValue} = this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View>
                    <FormInput
                        data={data}
                        this1={this}
                        certificateType={certificateType}
                        certificateTypeValue={certificateTypeValue}
                        onSelectedcertificateType={(item, index) => {
                            this.setState({
                                certificateTypeValue: item.value,
                                certificateTypeKey:item.key,
                            })
                        }}
                        mateName={mateName}
                        onChangemateName={(text) => {
                            this.setState({
                                mateName: text
                            })
                        }}

                        mateTel={mateTel}
                        onChangemateTel={(text) => {
                            this.setState({
                                mateTel: text
                            })
                        }}

                        cardNumber={certificateNumber}
                        onChangeCardNumber={(text) => {
                            this.setState({
                                certificateNumber: text
                            })
                        }}


                        politicsType={politics}
                        politicsTypeValue={politicsValue}
                        onSelectepoliticsType={(item, index) => {
                            this.setState({
                                politicsValue: item.value,
                                politicsKey:item.key
                            })
                        }}

                        dgreeType={dgree}
                        dgreeTypeValue={dgreeValue}
                        onSelectedgreeType={(item, index) => {
                            this.setState({
                                dgreeValue: item.value,
                                dgreeKey:item.key
                            })
                        }}
                    />
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
    rightStyle: {
        flex:1,
        borderLeftWidth: px2dp(1),
        borderLeftColor: '#ddd',
        borderBottomColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: global.hair,
        width: px2dp(150),
        height: px2dp(200)
    },

})
