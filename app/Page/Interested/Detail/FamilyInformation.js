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
import Modal from 'react-native-modalbox';
import {Input, Select} from 'teaset';
import SmallButton  from '../../../Component/SmallButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:px2dp(1),marginRight: px2dp(30),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),marginLeft: px2dp(30)
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
                    paddingLeft: 0
                }}
                editable={true}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.valOne}
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
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '* ' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
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
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: '#fff',}}>
                    <DefaultSelect require placeholder={'请选择'} name={'是否户主：'} value={props.isHeadOfFamilyValue}
                                   items={props.isHeadOfFamilyArray} onSelected={props.onSelectedHeadOfFamilyStatus}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入家庭人数'} name={'家庭人数：'} valOne={props.personCount + ''} onChangeText={props.onChangePersonCount}/>
                    <DefaultInput require placeholder={'请输入家庭住址'} name={'家庭住址：'} valOne={props.familyAddress} onChangeText={props.onChangefamilyAddress}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入邮政编码'} name={'邮政编码：'} valOne={props.familyPostCode + ''} onChangeText={props.onChangefamilyPostCode}/>
                    <DefaultInput require placeholder={'请输入社区名'} name={'社区名：'} valOne={props.communityName} onChangeText={props.onChangefCommunityName}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入子女个数'} name={'子女个数：'} valOne={props.childrenCount + ''} onChangeText={props.onChangeChildrenCount}/>
                    <DefaultSelect require placeholder={'请选择'} name={'居住状况：'} value={props.employValue+""}
                                   items={props.employArray} onSelected={props.onSelectedEmployStatus}/>
                    <DefaultSelect require placeholder={'请选择'} name={'住宅形式：'} value={props.homeShapeValue + ''}
                                   items={props.homeShapeArray} onSelected={props.onSelectedHomeShapeStatus}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入住宅面积'} name={'住宅面积：'} valOne={props.houseArea + ''} onChangeText={props.onChangeHouseArea}/>
                    <DefaultInput require keyboardType={"numeric"} placeholder={'请输入税后月收入'} name={'税后月收入：'} valOne={props.homeInCome + ''} onChangeText={props.onChangeHomeInCome}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
};
export default class FamilyInformation extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: '',
            isHeadOfFamilyValue:'',//是否为户主
            isHeadOfFamily:'',
            personCount:'', //家庭人数
            familyAddress:'', //家庭住址
            familyPostCode:'', //邮政编码
            communityName:'', //社区名
            childrenCount:'', //子女个数
            employArray:[],//居住状况
            employValue:'',
            homeShapeArray:[], //住宅形式
            homeShapeValue:'',
            houseArea:'', //住在面积
            homeInCome:'', //税后月收入
        };
    }

    isHeadOfFamilyArray = [
            {
                text:'是',
                value:true
            },
            {
                text:'否',
                value:false
            }
        ];

    componentDidMount() {
        this.setState({});
        this._getPersonInformation();
        this._employWay();
        this._homeShape();
    }

    _getPersonInformation(){
        let url = Config.baseApi + Config.processApi.getByIdPerson+"?personId="+ this.props.id;//个人客户信息
        RTRequest.fetch1(url).then((responseText) => {
            console.log('======================>>>>>>>>>>>>>>>>>>>>>>>>responseText', responseText);
            if (responseText.success) {
                let isHeadOfFamily = '';
                this.isHeadOfFamilyArray.map((item) => {
                    if (item.value == responseText.data.isheadoffamily) {
                        isHeadOfFamily = item.value;
                    }
                });
                this.setState({
                    data: responseText.data,
                    isHeadOfFamilyValue: isHeadOfFamily
                })
                this._updateState();
            } else {
                Toast.message(responseText.msg)
            }
            console.log('aa======================>>>>>>>>>>>>>>>>>>>>>>>>...', this.state.data);
        })
    }

    //居住状况
    _employWay() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + 'jzzk';
        RTRequest.fetch1(url).then((responseText) => {
            console.log('responseText>>>>>>>>>>jzzk', responseText);
            responseText.success ? this._parsingList(responseText.result, 'employArray') : Toast.message(responseText.msg);
        })
    }

    //住宅形式
    _homeShape() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + 'homeshape';
        RTRequest.fetch1(url).then((responseText) => {
            console.log('responseText>>>>>>>>>>homeshape', responseText);
            responseText.success ? this._parsingList(responseText.result, 'homeShapeArray') : Toast.message(responseText.msg);
        })
    }

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
        if (isEmpty(this.props)){
            return;
        }
        const { personCount, familyaddress, familypostcode, employway, homeshape, communityname, childrenCount, housearea, homeincome} = this.state.data;
        console.log('======================>>>>>>>>>>>>>>>>>>>>>>>>', personCount);
        if (!isEmpty(personCount)){
            this.setState({
                personCount:personCount
            })
        }
        if (!isEmpty(familyaddress)){
            this.setState({
                familyAddress:familyaddress
            })
        }
        if (!isEmpty(familypostcode)){
            this.setState({
                familyPostCode:familypostcode
            })
        }
        if (!isEmpty(employway)){
            this.setState({
                employValue:employway
            })
        }
        if (!isEmpty(homeshape)){
            this.setState({
                homeShapeValue:homeshape
            })
        }
        if (!isEmpty(communityname)){
            this.setState({
                communityName:communityname
            })
        }
        if (!isEmpty(childrenCount)){
            this.setState({
                childrenCount:childrenCount
            })
        }
        if (!isEmpty(housearea)){
            this.setState({
                houseArea:housearea
            })
        }
        if (!isEmpty(homeincome)){
            this.setState({
                homeInCome:homeincome
            })
        }
    }

    _savePartInfoPerson = () => {
        let url = Config.baseApi + Config.publicApi.savePartInfoPerson +
            '?id=' + this.props.id +
            '&person.isheadoffamily=' + this.state.isHeadOfFamilyValue +
            '&person.personCount=' + this.state.personCount + "" +
            '&person.familyaddress=' + this.state.familyAddress +
            '&person.familypostcode=' + this.state.familyPostCode + "" +
            '&person.communityname=' + this.state.communityName +
            '&person.childrenCount=' + this.state.childrenCount + "" +
            '&person.employway=' + this.state.employValue + "" +
            '&person.homeshape=' + this.state.homeShapeValue + "" +
            '&person.housearea=' + this.state.houseArea + "" +
            '&person.homeincome=' + this.state.homeInCome + "";
        console.log('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<', url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText){
                responseText.success ? this._SUCCESS() : Toast.message('请检查网络连接');
            }
        })
    }

    _SUCCESS() {
        Toast.message('保存成功');
        Actions.pop()
    }

    //非空判断
    _determineWhetherIsEmpty = () => {
        const {personCount, familyAddress, familyPostCode, communityName, childrenCount, houseArea, homeInCome, flagKey} = this.state;
        let mobileCodeReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (isEmpty(personCount)) {
            Toast.message('请输家庭人数');
            return;
        } else if (isEmpty(familyAddress)) {
            Toast.message('请输入家庭住址');
            return;
        } else if (isEmpty(familyPostCode)) {
            Toast.message('请输入邮政编码');
            return;
        } else if (isEmpty(communityName)) {
            Toast.message('请输入社区名称');
            return;
        }else if (isEmpty(childrenCount)) {
            Toast.message('请输入子女个数');
            return;
        } else if (isEmpty(houseArea)) {
            Toast.message('请输入住宅面积');
            return;
        } else if (isEmpty(homeInCome)) {
            Toast.message('请输入税后月收入');
            return;
        }else {
            this.refs.modalSix.open()
            return;
        }
    };

    render() {
        const {isHeadOfFamilyValue, personCount, familyAddress, familyPostCode, communityName, childrenCount, employArray, employValue, homeShapeArray, homeShapeValue, houseArea, homeInCome} = this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                <ScrollView style={styles.container}>
                    <FormInput
                        isHeadOfFamilyValue={isHeadOfFamilyValue}
                        isHeadOfFamilyArray={this.isHeadOfFamilyArray}
                        onSelectedHeadOfFamilyStatus={(item, index) => {
                            this.setState({
                                isHeadOfFamilyValue:item.value,
                            })
                        }}

                        personCount={personCount}
                        onChangePersonCount={(text) => {
                            this.setState({
                                personCount:text
                            })
                        }}

                        familyAddress={familyAddress}
                        onChangefamilyAddress={(text) => {
                            this.setState({
                                familyAddress:text
                            })
                        }}

                        familyPostCode={familyPostCode}
                        onChangefamilyPostCode={(text) => {
                            this.setState({
                                familyPostCode:text
                            })
                        }}

                        communityName={communityName}
                        onChangefCommunityName={(text) => {
                            this.setState({
                                communityName:text
                            })
                        }}

                        childrenCount={childrenCount}
                        onChangeChildrenCount={(text) => {
                            this.setState({
                                childrenCount:text
                            })
                        }}

                        employArray={employArray}
                        employValue={employValue}
                        onSelectedEmployStatus={(item, index) => {
                            this.setState({
                                employValue:item.value,
                            })
                        }}

                        homeShapeArray={homeShapeArray}
                        homeShapeValue={homeShapeValue}
                        onSelectedHomeShapeStatus={(item, index) => {
                            this.setState({
                                homeShapeValue:item.value
                            })
                        }}

                        houseArea={houseArea}
                        onChangeHouseArea={(text) => {
                            this.setState({
                                houseArea:text
                            })
                        }}
                        homeInCome={homeInCome}
                        onChangeHomeInCome={(text) => {
                            this.setState({
                                homeInCome:text
                            })
                        }}
                    />
                    <SmallButton style={{flex: 1,marginTop: px2dp(50)}} name="保存" height={70} width={240} onPress={()=>this._determineWhetherIsEmpty()}/>
                </ScrollView>
                <Modal style={styles.modal} position={"center"} ref={"modalSix"} swipeArea={20}>
                    <View style={styles.viewBG}>
                        <Text style={styles.textView}>确定保存</Text>
                    </View>
                    <View style={{flex: 1.5,borderBottomRightRadius: px2dp(30),borderBottomLeftRadius: px2dp(30),flexDirection: 'row',justifyContent: 'space-around'}}>
                        <SmallButton  name="确定" style={{flex: 1}} height={70} width={200} onPress={()=>this._savePartInfoPerson()}/>
                        <SmallButton  name="取消" style={{flex: 1}} height={70} width={200} onPress={()=>this.refs.modalSix.close()}/>
                    </View>
                </Modal>
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


