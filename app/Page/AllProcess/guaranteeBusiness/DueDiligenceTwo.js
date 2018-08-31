/**
 * Created by Administrator on 2018\8\10 0010.
 */
/**
 * Created by duansailong on 2018/4/27.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'teaset';
import ImagePicker from 'react-native-image-picker';




const Menu = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.pageName && Actions[props.pageName]({
                    data: props.data,
                    selectDisabled: props.selectDisabled,//选择框
                    inputDisabled: props.inputDisabled,//输入框
                    chooseDisabled: props.chooseDisabled,//选择回填
                    datePickerDisabled: props.datePickerDisabled,//日期选择框
                    defaultChecked: props.defaultChecked,//checkbox
                    title:props.name
                });
            }}
            style={{
                backgroundColor: '#fff',
                height: px2dp(100),
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{width: px2dp(90), alignItems: 'center'}}>
                <Icon color={'#12b7f5'} name={'md-copy'} size={20}/>
            </View>
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#EEEEEE',
                height: px2dp(100)
            }}>
                <Text style={{fontSize: px2dp(27), color: '#333333'}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#757575'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
export default class DueDiligenceTwo extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: props,
            allData: '',//所有项目详情
            isRefresh1: false,
        };

    }

    componentWillMount() {
        // this._getPersonId();
        this._getInfo();//获得流程详细信息
    }
    componentDidMount() {
        const {oppositeType}=this.state.data.vars[0];
        this.setState({oppositeType});
    }
    componentWillReceiveProps(nextProps) {
        this._getInfo();
    }
    _getPersonId (){
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.processApi.getPersonId+"?projectId="+projectId//获取用户id
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this.setState({personId:responseText.oppositeID,oppositeType:responseText.oppositeType}) : Toast.message("请检查网络连接");
            }
        })
    }
    _getInfo (){
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.twoApi.getUserInfo+"?userIds="+this.state.data.userIds+"&glProjectId="+projectId+"&glTaskId="+this.state.data.taskId;//获得流程详细信息
        console.log("---------------------",url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this.setState({allData:responseText.data}) : Toast.message("请检查网络连接");
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {/*true不可编辑，false可编辑*/}
                <Menu name={'项目基本信息'} pageName={'BasicInformation'} data={this.state} inputDisabled={true} selectDisabled={true} defaultChecked={true}/>
                {this.state.oppositeType=='person_customer'? <Menu name={'客户基本信息'} pageName={'CustomerBasicInformation'} data={this.state} selectDisabled={true} inputDisabled={true}/>:null}
                {this.state.oppositeType=='company_customer'? <Menu name={'企业基本信息'} pageName={'EnterpriseBasicInformation'} data={this.state} selectDisabled={true} inputDisabled={true} />:null}
                {this.state.oppositeType=='company_customer'? <Menu name={'法人代表信息'} pageName={'LegalRepresentative'} data={this.state} selectDisabled={true} inputDisabled={true} />:null}
                {/*<Menu name={'股东信息'} pageName={'ShareholderInfo'} data={this.state} inputDisabled={false} selectDisabled={false} chooseDisabled={false} datePickerDisabled={false}/>*/}
                {this.props.activityName=='业务申请及尽职调查'?<Menu name={'银行信息'} pageName={'BankInformation'} data={this.state} selectDisabled={true} inputDisabled={false} chooseDisabled={false}/>:<View/>}
                <Menu name={'担保基本信息'} pageName={'GuaranteeBasicInformation'} data={this.state} inputDisabled={true} selectDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'抵质押担保'} pageName={'CollateralGuarantee'} data={this.state} inputDisabled={true} selectDisabled={true} chooseDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'保证担保'} pageName={'BaoZMortgageViewListGuarantee'} data={this.state} selectDisabled={true}  inputDisabled={true} chooseDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'担保材料清单'} pageName={'GuaranteeMaterial'} data={this.state} inputDisabled={false} selectDisabled={false} chooseDisabled={false}/>
                <Menu name={'尽职调查报告'} pageName={'SurveyReportFile'} data={this.state} inputDisabled={true}/>
                {/*该两个流程目前没用*/}
                {/*<Menu name={'抵质押担保'} pageName={'DZYMortgageViewList'}/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contacts: {
        backgroundColor: '#fff',
    },
    leftText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: px2dp(20),
        backgroundColor: '#fff'
    },
    leftText1: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        paddingRight: px2dp(20),
        backgroundColor: '#fff'
    },
    listStyle: {
        borderRadius: px2dp(10),
        // paddingBottom:px2dp(30),
        backgroundColor: '#f5f5f5',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
    },
    overLayStyle: {
        height: px2dp(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: px2dp(1),
        borderBottomColor: '#939393'
    },
    overLayStyle1: {
        height: px2dp(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: px2dp(10),
        borderBottomColor: '#939393'
    },
})


