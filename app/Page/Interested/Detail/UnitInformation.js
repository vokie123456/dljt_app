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
import DatePicker from 'react-native-datepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../../Component/Loading'
const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1),
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
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}

const DefaultSelect = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                pickerType='popover'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}
const DefaultSelect2 = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                pickerType='popover'
                value={props.value}
                items={props.items}
                placeholder={props.placeholder}
                pickerTitle={`请选择 ${props.name}`}
                onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
            />
        </View>
    )
}

const DefaultSelect1 = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border ? 0 : px2dp(1),
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
        }}>
            <Text style={{width: px2dp(227), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                pickerType='popover'
                value={props.value1}
                items={props.items1}
                placeholder={'请选择省'}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                onSelected={props.onSelected1 ? props.onSelected1 : () => console.log('没回调')}
            />
            <Select
                style={{flex: 1, marginRight: px2dp(36), paddingLeft: 0, borderWidth: 0}}
                pickerType='popover'
                value={props.value2}
                items={props.items2}
                placeholder={'请选择市'}
                getItemValue={(item, index) => item.value}
                getItemText={(item, index) => item.text}
                onSelected={props.onSelected2 ? props.onSelected2 : () => console.log('没回调')}
            />
        </View>
    )
}

const DatePicker1 = (props) => {
    return (
        <View style={styles.datePicker}>
            <Text style={{width: px2dp(227), color: '#ffffff'}}>*<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <DatePicker
                style={{width: 200}}
                date={props.props.startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginRight: 50,
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={props.onChangeDate}
            />
        </View>
    )
}
const FormInput = (props) => {
    return (
        <ScrollView style={{}}>
            <KeyboardAwareScrollView>
                <View style={{paddingLeft: px2dp(15), paddingRight: px2dp(15), backgroundColor: '#fff'}}>
                    <DefaultInput placeholder={'请输入工作单位'} name={'工作单位'} onChangeText={props.onChangecurrentcompany}
                                  value={props.currentcompany}/>
                    <DefaultSelect placeholder={'请选择'} name={'工作性质'}
                                   value={(isEmpty(props.unitpropertiesValue) ? props.unitpropertiesValue : props.unitpropertiesValue + "")}
                                   items={props.unitpropertiesItems} onSelected={props.onSelectedunitproperties}/>
                    <DefaultInput keyboardType={"numeric"} placeholder={'请输入单位电话'} name={'单位电话'} value={props.unitphone}
                                  onChangeText={props.onChangeunitphone}/>
                    <DefaultInput placeholder={'请输入公司地址'} name={'公司地址'} value={props.unitaddress}
                                  onChangeText={props.onChangeunitaddress}/>
                    <DefaultSelect placeholder={'请选择'} name={'职务'}
                                   value={(isEmpty(props.jobValue) ? props.jobValue : props.jobValue + "")}
                                   items={props.jobItems} onSelected={props.onSelecteJob}/>
                    <DatePicker1 props={props} name={"入职时间"} onChangeDate={props.onSelectedDateStatus}/>
                    <DefaultInput placeholder={'请输入所属部门'} name={'所属部门'} onChangeText={props.onChangedepartment}
                                  value={props.department}/>
                    <DefaultInput placeholder={'请输入月收入'} name={'月收入'} onChangeText={props.onChangejobincome}
                                  value={(isEmpty(props.jobincome) ? props.jobincome : props.jobincome + "")}/>
                    <DefaultSelect2 placeholder={'请选择'} name={'发薪时间'} value={props.payDate}
                                    items={props.payDateItems} onSelected={props.onSelectePayDate}/>
                    <DefaultSelect2 placeholder={'请选择'} name={'发薪方式'} value={props.wagebank}
                                    items={props.wagebankTypeItems} onSelected={props.onSelecteWagebank}/>
                    <DefaultSelect1 placeholder={'请选择'} name={'工作地址'}
                                    value1={(isEmpty(props.parentHireCityValue) ? props.parentHireCityValue : props.parentHireCityValue + "")}
                                    value2={(isEmpty(props.hireCityValue) ? props.hireCityValue : props.hireCityValue + "")}
                                    items1={props.parentHireCityItems} onSelected1={props.onSelecteParentHireCity}
                                    items2={props.hireCityItems} onSelected2={props.onSelecteHireCity}/>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}
export default class UnitInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log("aaa--------------------", props);
        this.state = {
            visible: false,
            id: props.id,
            person: null,
            currentcompany: '',//工作单位
            unitproperties: [],//工作性质
            unitpropertiesValue: '',
            unitpropertiesKey: '',
            unitphone: '',//单位电话
            unitaddress: '',//公司地址
            hangyeName: '',//行业类别
            job: [],//职务
            jobValue: '',//职务
            jobKey: '',//职务
            jobstarttime: '',//入职时间
            department: '',//所属部门
            jobincome: '',//月收入
            payDate: '',//发薪时间
            wagebank: '',//发薪方式
            parentHireCity: [],//省
            parentHireCityValue: '',
            parentHireCityKey: '',
            hireCity: [],//市
            hireCityValue: '',//市
            hireCityKey: '',//市
        };
        console.log("-------------------DDDDDDDDDDDDDDD",this.state.id);
    }

    componentDidMount() {
        this._getByIdPerson();
        this._currentcompany();
        this._job();
        this._parentHireCity();
    }

    _parentHireCity() {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + "6591";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "parentHireCity") : Toast.message(responseText.msg);
            }
        })
    }

    _hireCity=(parentId)=> {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + parentId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "hireCity") : Toast.message(responseText.msg);
            }
        })
    }

    _hireCity2=(parentId)=> {
        let url = Config.baseApi + Config.publicApi.ByParentIdCsBank + parentId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                this.setState({hireCityValue:responseText.result[1].value}),
                responseText.success ? this._key1(responseText.result, "hireCity") : Toast.message(responseText.msg);
            }
        })
    }

    _currentcompany() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "unitproperties";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "unitproperties") : Toast.message(responseText.msg);
            }
        })
    }


    _job() {
        let url = Config.baseApi + Config.publicApi.dictionaryNodeKeyUrl + "zhiwujob";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._key1(responseText.result, "job") : Toast.message(responseText.msg);
            }
        })
    }

    _key1 = (list, parameter) => {
        let dataBlob = [];
        for (let i = 1; i < list.length; i++) {
            let item = {
                text: list[i].text,
                value: list[i].value,
            };
            dataBlob.push(item);
        }
        this.setState({
            [parameter]: dataBlob,
        });
        console.log([parameter] + "---", dataBlob);
    }

    _getByIdPerson() {
        let url = Config.baseApi + Config.processApi.getByIdPerson + "?personId=" + this.state.id;
        this.setState({visible: true})
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._upDataPer(responseText.data) : Toast.message("请检查网络连接");
            }
        })
    }

    _upDataPer(state) {

        console.log('工作情况------------------', state);
        const {hireCity, parentHireCity, wagebank, currentcompany, unitproperties, unitphone, unitaddress, hangyeName, job, jobstarttime, department, jobincome, payDate}=state;
        this.setState({
            visible: false,
            person: state
        })
        if (!isEmpty(hireCity)&& "null"!==hireCity) {
            this.setState({hireCityValue: hireCity});
        }
        if (!isEmpty(parentHireCity)&& "null"!==parentHireCity) {
            this._hireCity(parentHireCity);
            this.setState({parentHireCityValue: parentHireCity});
        }
        if (!isEmpty(wagebank) && "null"!==wagebank) {
            this.setState({wagebank});
        }else{
            console.log('jiaojiao专用分割线------------------');
        }
        if (!isEmpty(currentcompany)&& "null"!==currentcompany) {
            this.setState({currentcompany})
        }
        if (!isEmpty(unitproperties)&& "null"!==unitproperties) {
            this.setState({
                unitpropertiesValue: unitproperties
            })
        }
        if (!isEmpty(unitphone)&& "null"!==unitphone) {
            this.setState({
                unitphone
            })
        }
        if (!isEmpty(unitaddress)&& "null"!==unitaddress) {
            this.setState({
                unitaddress
            })
        }
        if (!isEmpty(hangyeName)&& "null"!==hangyeName) {
            this.setState({
                hangyeName
            })
        }
        if (!isEmpty(job)&& "null"!==job) {
            this.setState({
                jobValue: job
            })
        }
        if (!isEmpty(jobstarttime)&& "null"!==jobstarttime) {
            this.setState({
                jobstarttime
            })
        }
        if (!isEmpty(department)&& "null"!==department) {
            this.setState({
                department
            })
        }
        if (!isEmpty(jobincome)&& "null"!==wagebank) {
            this.setState({
                jobincome
            })
        }
        if (!isEmpty(payDate)&& "null"!==payDate) {
            this.setState({
                payDate
            })
        }

    }

    _savePerson = () => {
        /*person.name: 张老五 person.cardtype:309  person.sex:312  person.cellphone:18293894839  person.cardnumber:5.33022E+17
         person.birthday:28272  person.marry: 317   person.validity: 43258   person.age:41   person.postaddress:通讯地址是啊嗷嗷嗷
         person.shopName: 龙票集团  person.shopId: 37  id:952  person.id:952   person.currentcompany:工作单位
         person.companyFax:  person.unitproperties: 496
         person.unitaddress: 公司地址  person.unitphone: 1054321   person.unitpostcode:
         person.hangyeName: 国际组织和机构的活动   person.hangyeType: 11018
         person.companyScale:    person.job: 579
         person.jobstarttime:2018/6/7  person.department:所属部门   person.jobincome: 2300
         person.payDate: 15   person.wagebank:  打卡  person.parentHireCity: 10089
         person.hireCity: 10184
         */
        const {person,id,currentcompany,unitphone,unitpropertiesValue,unitaddress,hangyeName,jobValue,jobstarttime,department,jobincome,payDate,wagebank,parentHireCityValue,hireCityValue} = this.state;
        let url = Config.baseApi + Config.processApi.updateInfo +
                '?person.name=' + person.name +
                '&person.cardtype=' + person.cardtype +
                '&person.sex=' + person.sex +
                '&person.cellphone=' + person.cellphone +
                '&person.birthday=' + person.birthday +
                '&person.marry=' + person.marry +
                '&person.validity=' + person.validity +
                '&person.age=' + person.age +
                '&id=' + id +
                '&person.id=' +id +
                '&person.currentcompany=' + currentcompany +
                '&person.unitproperties=' + unitpropertiesValue +
                '&person.unitaddress=' +unitaddress +
                '&person.unitphone=' +unitphone +
                '&person.hangyeName=' +hangyeName +
                '&person.job=' +jobValue+
                '&person.jobstarttime=' +jobstarttime+
                '&person.department=' +department+
                '&person.jobincome=' +jobincome+
                '&person.payDate=' +payDate+
                '&person.wagebank=' +wagebank+
                '&person.parentHireCity=' +parentHireCityValue+
                '&person.hireCity=' +hireCityValue;
        // if(isEmpty(currentcompany)){
        //     Toast.message("工作单位不能为空");
        //     return;
        // }
        // if(isEmpty(unitpropertiesValue)){
        //     Toast.message("工作性质不能为空");
        //     return;
        // }
        // if(!Tool.isMobile(unitphone)){
        //     return;
        // }
        // if(isEmpty(unitaddress)){
        //     Toast.message("公司地址不能为空");
        //     return;
        // }
        // if(isEmpty(jobValue)){
        //     Toast.message("职务不能为空");
        //     return;
        // }
        // if(isEmpty(jobstarttime)){
        //     Toast.message("入职时间不能为空");
        //     return;
        // }
        // if(isEmpty(jobstarttime)){
        //     Toast.message("入职时间不能为空");
        //     return;
        // }
        // if(isEmpty(department)){
        //     Toast.message("所属部门不能为空");
        //     return;
        // }
        // if(isEmpty(jobincome)){
        //     Toast.message("月收入不能为空");
        //     return;
        // }
        // if(isEmpty(payDate)){
        //     Toast.message("发薪时间不能为空");
        //     return;
        // }
        // if(isEmpty(wagebank)){
        //     Toast.message("发薪方式不能为空");
        //     return;
        // }
        // if(isEmpty(parentHireCityValue)){
        //     Toast.message("工作地址不能为空");
        //     return;
        // }

        console.log('保存信息__________________________', url);
        RTRequest.fetch1(url).then((responseText) => {
            console.log('保存信息', responseText);
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS() {
        Toast.message("保存成功");
        Actions.pop();
    }

    payDateType = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    wagebankType = ['现金', '打卡'];

    render() {
        const {hireCity, hireCityValue, hireCityKey, parentHireCity, parentHireCityValue, parentHireCityKey, wagebank, unitproperties, unitpropertiesKey, jobValue, jobKey, unitpropertiesValue, currentcompany, unitphone, unitaddress, hangyeName, job, jobstarttime, department, jobincome, payDate}=this.state;
        return (
            <View style={{flex: 1}}>
                <Title name={this.props.title} back/>
                    <ScrollView style={{margin: px2dp(15)}}>
                        <FormInput
                            currentcompany={currentcompany}
                            onChangecurrentcompany={(currentcompany) => {
                                this.setState({
                                    currentcompany
                                })
                            }}

                            unitaddress={unitaddress}
                            onChangeunitaddress={(unitaddress) => {
                                this.setState({
                                    unitaddress
                                })
                            }}

                            jobincome={jobincome}
                            onChangejobincome={(jobincome) => {
                                this.setState({
                                    jobincome
                                })
                            }}

                            unitphone={unitphone}
                            onChangeunitphone={(unitphone) => {
                                this.setState({
                                    unitphone
                                })
                            }}

                            department={department}
                            onChangedepartment={(department) => {
                                this.setState({
                                    department
                                })
                            }}

                            startDate={jobstarttime}
                            onSelectedDateStatus={(text) => {
                                this.setState({
                                    jobstarttime: text
                                });
                            }}

                            unitpropertiesValue={unitpropertiesValue}
                            unitpropertiesItems={unitproperties}
                            onSelectedunitproperties={(item, index) => {
                                this.setState({
                                    unitpropertiesValue: item.value,
                                    unitpropertiesKey: item.key
                                })
                            }}

                            payDateItems={this.payDateType}
                            payDate={payDate}
                            onSelectePayDate={(item, index) => {
                                this.setState({
                                    payDate: item,
                                })
                            }}

                            jobItems={job}
                            jobValue={jobValue}
                            onSelecteJob={(item, index) => {
                                this.setState({
                                    jobValue: item.value,
                                    jobKey: item.key
                                })
                            }}

                            wagebankTypeItems={this.wagebankType}
                            wagebank={wagebank}
                            onSelecteWagebank={(item, index) => {
                                this.setState({
                                    wagebank: item,
                                })
                            }}

                            hireCityItems={hireCity}
                            hireCityValue={hireCityValue}
                            onSelecteHireCity={(item, index) => {
                                this.setState({
                                    hireCityValue: item.value,
                                    hireCityKey: item.key
                                })
                            }}
                            parentHireCityItems={parentHireCity}
                            parentHireCityValue={parentHireCityValue}
                            onSelecteParentHireCity={(item, index) => {
                                this.setState({
                                    parentHireCityValue: item.value,
                                    parentHireCityKey: item.key
                                })
                                this._hireCity2(item.value)
                            }}
                        />
                        <SmallButton style={{flex: 1, marginTop: px2dp(10)}} name="保存" height={70} width={240} onPress={() => this._savePerson()}/>
                    </ScrollView>
                <Loading visible={this.state.visible}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "black",
        fontSize: 22
    },
    datePicker: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        height: px2dp(100)
    }

})


