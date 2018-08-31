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

const Menu = (props) => {
    console.log("props22",props.data)
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
                borderBottomWidth: hair,
                borderBottomColor: '#EEEEEE',
                height: px2dp(100)
            }}>
                <Text style={{fontSize: px2dp(27), color: '#333333'}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#757575'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
export default class TwentyNode extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props1",props)
        // 初始状态
        this.state = {
            data: props,
            allData: '',//所以项目详情
            isRefresh1: false,
        };

    }

    componentWillMount() {
        this._getPersonId();
        this._getInfo();//获得流程详细信息
    }
    componentDidMount() {
        const {oppositeType} = this.state.data.vars[0];
        console.log(2000,oppositeType);
    }
    componentWillReceiveProps(nextProps) {
        this._getInfo();
    }
    _getPersonId (){
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.processApi.getPersonId+"?projectId="+projectId//获取用户id
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获取用户id', responseText);
                responseText.success ? this.setState({personId:responseText.oppositeID,oppositeType:responseText.oppositeType}) : Toast.message("请检查网络连接");
            }
        })
    }
    _getInfo (){
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.taskApi.getInfoUrl+"?userIds="+this.state.data.userIds+"&slProjectId="+projectId+"&slTaskId="+this.state.data.taskId;//获得流程详细信息
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获得流程详细信息', responseText);
                responseText.success ? this.setState({allData:responseText.data}) : Toast.message("请检查网络连接");
            }
        })
    }
    render() {
        console.log("data11",this.state)
        return (
            <View style={styles.container}>
                {/*true不可编辑，false可编辑*/}
                <Menu name={'项目基本信息'} pageName={'CreditLoanProjectInfoPanel'} data={this.state} inputDisabled={true} selectDisabled={true}/>
                {this.state.oppositeType=='company_customer'? <Menu name={'企业基本信息'} pageName={'EnterpriseCusBasicInfo'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={false}/>:null}
                {this.state.oppositeType=='company_customer'? <Menu name={'法人代表信息'} pageName={'LegalPersonRepresentInfo'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={false}/>:null}
                {this.state.oppositeType=='person_customer'? <Menu name={'客户基本信息'} pageName={'PersonDetail'} data={this.state} selectDisabled={true} inputDisabled={true}/>:null}
                <Menu name={'收款账户信息'} pageName={'LoanAccount'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={false}/>
                <Menu name={'付款申请'} pageName={'PaymentRequest'} data={this.state} inputDisabled={true} selectDisabled={true} chooseDisabled={true} datePickerDisabled={true}/>
                <Menu name={'第一还款来源'} pageName={'FirstRepayment'} data={this.state} inputDisabled={true} selectDisabled={true} datePickerDisabled={true}/>
                <Menu name={'共同借款人信息'} pageName={'BorrowerInfoViewList'} data={this.state} inputDisabled={true} selectDisabled={true} chooseDisabled={true} />
                <Menu name={'贷款材料'} pageName={'LoanRequirements'} data={this.state} inputDisabled={true}/>
                <Menu name={'抵质押担保'} pageName={'DZYMortgageViewList'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={true} datePickerDisabled={true}/>
                <Menu name={'保证担保'} pageName={'BaoZMortgageViewList'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'尽职调查报告'} pageName={'SurveyReportFile'} data={this.state} />
                <Menu name={'手续费用收取清单'} pageName={'CommissionList'} data={this.state} inputDisabled={true} selectDisabled={true} datePickerDisabled={true}/>
                <Menu name={'借款人放款收息表'} pageName={'LoanStatement'} data={this.state} />
                {/*<Menu name={'集团内关联业务'} pageName={'ReviewTheContent'} data={this.state} inputDisabled={true}/>*/}
                <Menu name={'借款合同'} pageName={'LoanContractFile'} data={this.state} inputDisabled={false}/>
                <Menu name={'借款基本信息'} pageName={'LoanInformation'} data={this.state} inputDisabled={true} selectDisabled={true} datePickerDisabled={true} defaultChecked={true} />
                <Menu name={'尽职调查报告'} pageName={'SurveyReportFile'} data={this.state} inputDisabled={true}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


