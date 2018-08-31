/**
 * Created by Rabbit on 2017/11/3.
 */
//test commit
import React from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    Tabs,
    Modal,
    Lightbox,
    Stack,
} from 'react-native-router-flux';
import {Theme} from 'teaset';

import TabIcon from './Component/TabIcon';
//首页测试
import Index from './Page/Home/Index';
//计算器
//我的
import Account from './Page/Mines/Account';
import Mine from './Page/Mines/Mine';
import ChangePassword from './Page/Mines/ChangePassword';

//业务申请
import ApplyLoan from './Page/Approve/ApplyLoan';
import UserInfo from './Page/Approve/UserInfo';
import SelectCustomer from './Page/Approve/SelectCustomer';
import PersonSelectCustomer from './Page/Approve/PersonSelectCustomer';
import personCustomers from './Page/Approve/personCustomers';
import SelectNetwork from './Page/Approve/SelectNetwork';
import PaymentAccount from './Page/Approve/PaymentAccount';
import QueryEnterprise from './Page/Approve/QueryEnterprise';

//任务列表
import MyTaskForm from './Page/Main/MyTaskForm';
import MyTask from './Page/Main/MyTask';
import ProjectTracking from './Page/Main/ProjectTracking';
import AllCustomer from './Page/Main/AllCustomer';

//意向客户
import LoanIntention from './Page/Interested/LoanIntention';
import InterestedBuyers from './Page/Interested/InterestedBuyers';
import AddPerson from './Page/Interested/AddPerson';
import InterestedBuyersDetail from './Page/Interested/InterestedBuyersDetail';
import FollowUpRecords from './Page/Interested/FollowUpRecords';
import FollowUpClient from './Page/Interested/FollowUpClient';
import FollowUpRecordsDetail from './Page/Interested/FollowUpRecordsDetail';
import ConvertOfficialAccountC from './Page/Interested/ConvertOfficialAccountC';
import InterestedCompanyDetail from './Page/Interested/InterestedCompanyDetail';
import ConvertOfficialAccountP from './Page/Interested/ConvertOfficialAccountP';
import InterestedPersonDetail from './Page/Interested/InterestedPersonDetail';

//意向客户详情页
import BankAccountInformation from './Page/Interested/Detail/BankAccountInformation';
import EnterpriseContactInformation from './Page/Interested/Detail/EnterpriseContactInformation';
import SpouseInformation from './Page/Interested/Detail/SpouseInformation';
import UnitInformation from './Page/Interested/Detail/UnitInformation';
import ContactInformation from './Page/Interested/Detail/ContactInformation';
import FamilyInformation from './Page/Interested/Detail/FamilyInformation';

//个人
import IndividualClient from './Page/Interested/IndividualClients/IndividualClient';//个人页面
import IndividualClientDetail from './Page/Interested/IndividualClients/IndividualClientDetail';//个人页面
import BusinessContact from './Page/Interested/IndividualClients/BusinessContact'
import ContactPersonInformation from './Page/Interested/IndividualClients/ContactPersonInformation'; //联系人信息
import ContactPersonInfoDetail from './Page/Interested/IndividualClients/ContactPersonInfoDetail'; //联系人详情
import BankAccountList from './Page/Interested/IndividualClients/BankAccountList';
import ProjectManagement from './Page/Interested/ProjectManagement';

//流程页面
import ActorUserList from './Page/Process/ActorUserList';
import SurveyReportJpg from './Page/Process/SurveyReportJpg';
import LoanContractFileLImageList from './Page/Process/LoanContractFileLImageList';
import CreditLoanProjectInfoPanel from './Page/Process/CreditLoanProjectInfoPanel';
import PersonDetail from './Page/Process/PersonDetail';
import LoanAccount from './Page/Process/LoanAccount';
import LoanInformation from './Page/Process/LoanInformation';
import SurveyReportFile from './Page/Process/SurveyReportFile';
import LoanContractFile from './Page/Process/LoanContractFile';
import UploadReportFile from './Page/Process/UploadReportFile';
import CommissionList from './Page/Process/CommissionList';
import AddCommissionList from './Page/Process/AddCommissionList';
import FirstRepayment from './Page/Process/FirstRepayment';
import AddFirstRepayment from './Page/Process/AddFirstRepayment';
import BorrowerInfoViewList from './Page/Process/BorrowerInfoViewList';
import AddBorrowerInfoViewList from './Page/Process/AddBorrowerInfoViewList';
import LoanRequirements from './Page/Process/LoanRequirements';
import DZYMortgageViewList from './Page/Process/DZYMortgageViewList';
import DZYMortgageViewDetail2 from './Page/Process/DZYMortgageViewDetail2';
import DZYMortgageViewDetail from './Page/Process/DZYMortgageViewDetail';
import BaoZMortgageViewList from './Page/Process/BaoZMortgageViewList';
import BaoZMortgageViewDetail from './Page/Process/BaoZMortgageViewDetail';
import CustomerMortgageDetail from './Page/Process/CustomerMortgageDetail';
import CustomerMortgage from './Page/Process/CustomerMortgage';
import PersonMortgage from './Page/Process/PersonMortgage';
import PersonMortgageDetail from './Page/Process/PersonMortgageDetail';
import FileList from './Page/Process/FileList';
import ApprovalRecord from './Page/Process/ApprovalRecord';
import ApprovalRecordDetails from './Page/Process/ApprovalRecordDetails';
import ReviewTheContent from './Page/Process/ReviewTheContent';
import ReviewTheContentDetails from './Page/Process/ReviewTheContentDetails';
import JudgesAdvices from './Page/Process/JudgesAdvices';
import JudgesAdvicesDetail from './Page/Process/JudgesAdvicesDetail';
import PaymentRequest from './Page/Process/PaymentRequest';
import LoanStatement from './Page/Process/LoanStatement';
import EnterpriseCusBasicInfo from './Page/Process/EnterpriseCusBasicInfo'
import LegalPersonRepresentInfo from './Page/Process/LegalPersonRepresentInfo'
//一般担保业务
import BasicInformation from './Page/Guarantee/BasicInformation'; //项目基本信息
import CustomerBasicInformation from './Page/Guarantee/CustomerBasicInformation'; //客户基本信息
import EnterpriseBasicInformation from './Page/Guarantee/EnterpriseBasicInformation'; //企业客户基本信息
import LegalRepresentative from './Page/Guarantee/LegalRepresentative'; //法定代表人信息
import BankInformation from './Page/Guarantee/BankInformation'; //银行信息
import BankContacts from './Page/Guarantee/BankContacts'; //银行联系人
import CollateralGuarantee from './Page/Guarantee/CollateralGuarantee'; //抵质押担保
import CollateralGuarantee2 from './Page/Guarantee/CollateralGuarantee2'; //抵质押担保
import GuaranteeBasicInformation from './Page/Guarantee/GuaranteeBasicInformation'; //担保基本信息
/*import ShareholderInfo from './Page/Guarantee/ShareholderInfo'; //股东信息列表
import ShareholderInfo2 from './Page/Guarantee/ShareholderInfo2'; //股东个人信息详情*/
import GuaranteeMaterial from './Page/Guarantee/GuaranteeMaterial'; //担保材料列表
import GuaranteeMaterial2 from './Page/Guarantee/GuaranteeMaterial2'; //担保材料清单
//企业客户信息
import EnterpriseCustomer from './Page/Interested/EnterpriseCustomer';
import EnterpriseCustomerInfo from './Page/Interested/EnterpriseCustomerInfo';
import EnterpriseLegalInfo from './Page/Interested/EnterpriseLegalInfo';
import AddBanks from './Page/Interested/AddBanks';
import EnterpriseContactInfo from './Page/Interested/EnterpriseContactInfo';
import BankAccountInfo from './Page/Interested/BankAccountInfo';
import MyBanksDetail from './Page/Interested/MyBanksDetail';
import AddContactInfo from './Page/Interested/AddContactInfo';
import MyContactInfoDetail from './Page/Interested/MyContactInfoDetail';

//保证担保BaoZMortgageViewList
 import BaoZMortgageViewListGuarantee from './Page/Guarantee/BaoZMortgageViewList';
import  BaoZMortgageViewDetailGuarantee from './Page/Guarantee/BaoZMortgageViewDetail';
 import CustomerMortgageGuarantee from './Page/Guarantee/CustomerMortgage';
 import PersonMortgageGuarantee from './Page/Guarantee/PersonMortgage';
 import CustomerMortgageDetailGuarantee from './Page/Guarantee/CustomerMortgageDetail';
 import PersonMortgageDetailGuarantee from './Page/Guarantee/PersonMortgageDetail';

import LoansCountForm from './Page/Calculator/LoansCountForm';
import Login from './Page/Login';
import Splash from './Page/Splash';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);

    };
};

const getSceneStyle = () => ({
    backgroundColor: Theme.backgroundColor,
    // shadowOpacity: 1,
    // shadowRadius: 3,
});
const onBackPress = () => {
    console.log("Actions.state", Actions.state)
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}

const router = (...props) => (

    <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        backAndroidHandler={onBackPress}
    >
        <Modal
            hideNavBar
            transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid})}
        >
            <Stack key="Splash1" hideNavBar >
                <Scene component={Splash} key="Splash"/>
            </Stack>
            {/*<Stack gesturesEnabled={false} key="Login">*/}
            {/*<Scene*/}
            {/*title='登录'*/}
            {/*key="LoginModal"*/}
            {/*component={Login}*/}
            {/*initial*/}
            {/*gesturesEnabled={false}*/}
            {/*// hideNavBar*/}
            {/*onExit={() => console.log('onExit')}*/}
            {/*onLeft={Actions.pop}*/}
            {/*/>*/}
            {/*<Scene*/}
            {/*key="ChooseCompany"*/}
            {/*title='选择金融公司'*/}
            {/*component={ChooseCompany}*/}
            {/*gesturesEnabled*/}
            {/*// hideNavBar*/}
            {/*onExit={() => console.log('onExit')}*/}
            {/*onLeft={Actions.pop}*/}
            {/*/>*/}
            {/*<Scene*/}
            {/*key="CompanyInvitationCode"*/}
            {/*title='选择金融公司'*/}
            {/*component={CompanyInvitationCode}*/}
            {/*gesturesEnabled*/}
            {/*// hideNavBar*/}
            {/*onExit={() => console.log('onExit')}*/}
            {/*onLeft={Actions.pop}*/}
            {/*/>*/}
            {/*</Stack>*/}
            {/* 这种写法是将全部的跳转页面都放在Root下面 */}
            <Stack hideNavBar headerMode='screen' key="root">
                {/* key 就是给页面的标签,供Actions使用 */}
                {/* component 设置关联的页面 */}
                {/* title 就是给页面标题 */}
                {/* initial 就是设置默认页面*/}
                <Tabs
                    key="tabbar"        // 唯一标识
                    wrap={true}         // 自动使用自己的导航栏包装每个场景
                    showLabel={false}   // 显示文字
                    tabBarStyle={styles.tabBarStyle} // tabBar的样式
                    swipeEnabled={false}// 是否可以滑动
                    headerMode='screen' // 页面切换方式
                    icon={TabIcon}      // 自定义Icon显示方式
                    lazy={true}         // 是否默认渲染tabbar
                    tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                    activeBackgroundColor='white'   // 选中tabbar的背景色
                    inactiveBackgroundColor='white' // 未选中tabbar的背景色
                    activeTintColor='#4ECBFC'       // 选中tabbar图标的颜色
                    inactiveTintColor='#aaa'        // 未选中tabbar图标的颜色
                    animationEnabled={true}         // 切换动画
                >
                    <Stack key="Index"
                           title={'首页'}
                           image={Images.Home}
                           hideNavBar
                           initial
                           selectedImage={Images.Home_Select}
                    >
                        <Scene component={Index} key="Index_key"/>
                    </Stack>
                    {/*<Stack key='LoansCountForm'*/}
                    {/*title='计算'*/}
                    {/*hideNavBar*/}
                    {/*image={Images.JSuan}*/}
                    {/*selectedImage={Images.jSuan_Select}*/}
                    {/*>*/}
                    {/*<Scene component={LoansCountForm} key="LoansCountForm"/>*/}
                    {/*</Stack>*/}
                    <Stack key="Account"
                           hideNavBar
                           title='我的'
                           image={Images.Main}
                           selectedImage={Images.Main_Select}
                    >
                        <Scene component={Account} key="Account_key"/>
                    </Stack>
                </Tabs>
                {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.key()/Actions[index.key].call();*/}
                <Scene component={Login} key="Login"/>
                <Scene component={MyTaskForm} hideNavBar key="MyTaskForm" title="项目详情"/>
                <Scene component={ProjectTracking} hideNavBar key="ProjectTracking" title="跟进提醒"/>
                <Scene component={MyTask} hideNavBar key="MyTask" title="代办任务"/>
                <Scene component={ApplyLoan} hideNavBar key="ApplyLoan" title="业务申请"/>
                <Scene component={AllCustomer} hideNavBar key="AllCustomer"/>
                <Scene component={UserInfo} hideNavBar key="UserInfo" title="基本信息"/>
                <Scene component={Mine} hideNavBar key="Mine" title="个人资料"/>
                <Scene component={ChangePassword} hideNavBar key="ChangePassword" title="修改密码"/>
                <Scene component={SelectCustomer} hideNavBar key="SelectCustomer" title="选择客户"/>
                <Scene component={PersonSelectCustomer} hideNavBar key="PersonSelectCustomer" title="选择法人代表人"/>
                <Scene component={personCustomers} hideNavBar key="personCustomers" title="人员列表"/>
                <Scene component={SelectNetwork} hideNavBar key="SelectNetwork" title="网点列表"/>
                <Scene component={PaymentAccount} hideNavBar key="PaymentAccount" title="银行开户信息"/>
                <Scene component={QueryEnterprise} hideNavBar key="QueryEnterprise" title="企业列表"/>
                {/*流程节点START*/}
                <Scene component={ActorUserList} hideNavBar key="ActorUserList" title="处理人列表"/>
                <Scene component={SurveyReportJpg} hideNavBar key="SurveyReportJpg" title="尽职调查报告"/>
                <Scene component={LoanContractFileLImageList} hideNavBar key="LoanContractFileLImageList" title="合同附件查看"/>
                <Scene component={CreditLoanProjectInfoPanel} hideNavBar key="CreditLoanProjectInfoPanel" title="项目基本信息"/>
                <Scene component={EnterpriseCusBasicInfo} hideNavBar key="EnterpriseCusBasicInfo" title="企业基本信息"/>
                <Scene component={LegalPersonRepresentInfo} hideNavBar key="LegalPersonRepresentInfo" title="法人代表信息"/>
                <Scene component={PersonDetail} hideNavBar key="PersonDetail" title="客户基本信息"/>
                <Scene component={LoanAccount} hideNavBar key="LoanAccount" title="收款账户信息"/>
                <Scene component={LoanInformation} hideNavBar key="LoanInformation" title="借款基本信息"/>
                <Scene component={LoanContractFile} hideNavBar key="LoanContractFile" title="借款合同"/>
                <Scene component={UploadReportFile} hideNavBar key="UploadReportFile" title="上传借款合同"/>
                <Scene component={SurveyReportFile} hideNavBar key="SurveyReportFile" title="尽职调查报告"/>
                <Scene component={CommissionList} hideNavBar key="CommissionList" title="手续费用收取清单"/>
                <Scene component={AddCommissionList} hideNavBar key="AddCommissionList" title="添加费用收取清单"/>
                <Scene component={FirstRepayment} hideNavBar key="FirstRepayment" title="第一还款来源"/>
                <Scene component={AddFirstRepayment} hideNavBar key="AddFirstRepayment" title="添加还款来源"/>
                <Scene component={BorrowerInfoViewList} hideNavBar key="BorrowerInfoViewList" title="共同借款人信息"/>
                <Scene component={AddBorrowerInfoViewList} hideNavBar key="AddBorrowerInfoViewList" title="添加共同借款人"/>
                <Scene component={LoanRequirements} hideNavBar key="LoanRequirements" title="贷款材料"/>
                <Scene component={DZYMortgageViewList} hideNavBar key="DZYMortgageViewList" title="抵质押担保"/>
                <Scene component={DZYMortgageViewDetail2} hideNavBar key="DZYMortgageViewDetail2" title="抵质押担保"/>
                <Scene component={DZYMortgageViewDetail} hideNavBar key="DZYMortgageViewDetail" title="抵质押物详情"/>
                <Scene component={BaoZMortgageViewList} hideNavBar key="BaoZMortgageViewList" title="保证担保"/>
                <Scene component={BaoZMortgageViewDetail} hideNavBar key="BaoZMortgageViewDetail" title="添加保证担保"/>
                <Scene component={CustomerMortgage} hideNavBar key="CustomerMortgage" title="企业保证担保"/>
                <Scene component={CustomerMortgageDetail} hideNavBar key="CustomerMortgageDetail" title="企业保证担保详情"/>
                <Scene component={PersonMortgage} hideNavBar key="PersonMortgage" title="个人保证担保"/>
                <Scene component={PersonMortgageDetail} hideNavBar key="PersonMortgageDetail" title="个人保证担保详情"/>
                <Scene component={ApprovalRecord} hideNavBar key="ApprovalRecord" title="意见与说明记录"/>
                <Scene component={ApprovalRecordDetails} hideNavBar key="ApprovalRecordDetails" title="节点详详情"/>
                <Scene component={ReviewTheContent} hideNavBar key="ReviewTheContent" title="审核内容"/>
                <Scene component={ReviewTheContentDetails} hideNavBar key="ReviewTheContentDetails" title="关联业务详情"/>
                <Scene component={JudgesAdvices} hideNavBar key="JudgesAdvices" title="评审会意见"/>
                <Scene component={JudgesAdvicesDetail} hideNavBar key="JudgesAdvicesDetail" title="评审会意见详情"/>
                <Scene component={PaymentRequest} hideNavBar key="PaymentRequest" title="付款申请"/>
                <Scene component={LoanStatement} hideNavBar key="LoanStatement" title="借款人放款收息表"/>
                {/*意向客户*/}
                <Scene component={InterestedBuyers} hideNavBar key="InterestedBuyers" title="意向客户"/>
                <Scene component={InterestedBuyersDetail} hideNavBar key="InterestedBuyersDetail" title="意向客户详情"/>
                <Scene component={AddPerson} hideNavBar key="AddPerson" title="客户基本信息"/>{/*添加客户*/}
                <Scene component={LoanIntention} hideNavBar key="LoanIntention" title="借款意向信息"/>
                <Scene component={FollowUpRecords} hideNavBar key="FollowUpRecords" title="跟进记录"/>
                <Scene component={FollowUpRecordsDetail} hideNavBar key="FollowUpRecordsDetail" title="跟进记录详情"/>
                <Scene component={FollowUpClient} hideNavBar key="FollowUpClient" title="客户跟进"/>
                <Scene component={ConvertOfficialAccountC} hideNavBar key="ConvertOfficialAccountC" title="业务往来查询"/>
                <Scene component={InterestedCompanyDetail} hideNavBar key="InterestedCompanyDetail" title="详细信息"/>
                <Scene component={ConvertOfficialAccountP} hideNavBar key="ConvertOfficialAccountP" title="个人基本信息"/>
                <Scene component={InterestedPersonDetail} hideNavBar key="InterestedPersonDetail" title="详细信息"/>
                {/*企业客户*/}
                <Scene component={EnterpriseCustomer} hideNavBar key="EnterpriseCustomer" title="企业客户"/>
                <Scene component={EnterpriseCustomerInfo} hideNavBar key="EnterpriseCustomerInfo" title="详细信息"/>
                <Scene component={EnterpriseLegalInfo} hideNavBar key="EnterpriseLegalInfo" title="企业法人信息"/>
                <Scene component={AddBanks} hideNavBar key="AddBanks" title="新增银行开户"/>
                <Scene component={EnterpriseContactInfo} hideNavBar key="EnterpriseContactInfo" title="企业联系人信息"/>
                <Scene component={BankAccountInfo} hideNavBar key="BankAccountInfo" title="企业银行列表"/>
                <Scene component={MyBanksDetail} hideNavBar key="MyBanksDetail" title="企业银行详情"/>
                <Scene component={AddContactInfo} hideNavBar key="AddContactInfo" title="新增企业联系人"/>
                <Scene component={MyContactInfoDetail} hideNavBar key="MyContactInfoDetail" title="企业联系人详情"/>
                {/*企业客户*/}
                {/*意向客户详情页*/}
                <Scene component={BankAccountInformation} hideNavBar key="BankAccountInformation" title="银行开户信息"/>
                <Scene component={EnterpriseContactInformation} hideNavBar key="EnterpriseContactInformation" title="新增企业联系人"/>
                <Scene component={ContactInformation} hideNavBar key="ContactInformation" title="添加联系人"/>
                <Scene component={FamilyInformation} hideNavBar key="FamilyInformation" title="家庭信息"/>
                <Scene component={FileList} hideNavBar key="FileList" title="贷款材料清单"/>
                {/*<Scene component={ChooseCompany} hideNavBar key="ChooseCompany" title="家庭信息" />*/}
                {/*<Scene component={CompanyInvitationCode} hideNavBar key="CompanyInvitationCode" title="家庭信息" />*/}
                {/*个人客户*/}
                <Scene component={IndividualClient} hideNavBar key="IndividualClient" title="个人客户"/>
                <Scene component={IndividualClientDetail} hideNavBar key="IndividualClientDetail" title="个人客户详情"/>
                <Scene component={UnitInformation} hideNavBar key="UnitInformation" title="工作情况"/>
                <Scene component={SpouseInformation} hideNavBar key="SpouseInformation" title="配偶信息"/>
                <Scene component={ContactPersonInformation} hideNavBar key="ContactPersonInformation" title="联系人信息"/>
                <Scene component={ContactPersonInfoDetail} hideNavBar key="ContactPersonInfoDetail" title="联系人详情"/>
                <Scene component={BankAccountList} hideNavBar key="BankAccountList" title="银行列表"/>
                <Scene component={BusinessContact} hideNavBar key="BusinessContact" title="业务往来"/>
                <Scene component={ProjectManagement} hideNavBar key="ProjectManagement" title="项目查询"/>
                {/*一般担保业务*/}
                <Scene component={BasicInformation} hideNavBar key="BasicInformation" title="项目基本信息"/>
                <Scene component={CustomerBasicInformation} hideNavBar key="CustomerBasicInformation" title="客户基本信息"/>
                <Scene component={EnterpriseBasicInformation} hideNavBar key="EnterpriseBasicInformation" title="企业基本信息"/>
                <Scene component={LegalRepresentative} hideNavBar key="LegalRepresentative" title="法定代表人信息"/>
                <Scene component={BankInformation} hideNavBar key="BankInformation" title="银行信息"/>
                <Scene component={BankContacts} hideNavBar key="BankContacts" title="银行信息列表"/>
                <Scene component={GuaranteeBasicInformation} hideNavBar key="GuaranteeBasicInformation" title="担保基本信息"/>
                <Scene component={CollateralGuarantee} hideNavBar key="CollateralGuarantee" title="抵质押担保"/>
                <Scene component={CollateralGuarantee2} hideNavBar key="CollateralGuarantee2" title="抵质押担保"/>
                {/*<Scene component={ShareholderInfo} hideNavBar key="ShareholderInfo" title="股东信息"/>
                <Scene component={ShareholderInfo2} hideNavBar key="ShareholderInfo2" title="股东信息详情页"/>*/}
                <Scene component={GuaranteeMaterial} hideNavBar key="GuaranteeMaterial" title="担保材料列表"/>
                <Scene component={GuaranteeMaterial2} hideNavBar key="GuaranteeMaterial2" title="担保材料清单"/>
                <Scene component={BaoZMortgageViewListGuarantee} hideNavBar key="BaoZMortgageViewListGuarantee" title="保证担保"/>
                <Scene component={BaoZMortgageViewDetailGuarantee} hideNavBar key="BaoZMortgageViewDetailGuarantee" title="保证担保"/>
                <Scene component={CustomerMortgageGuarantee} hideNavBar key="CustomerMortgageGuarantee" title="保证担保"/>
                <Scene component={PersonMortgageGuarantee} hideNavBar key="PersonMortgageGuarantee" title="保证担保"/>
                <Scene component={PersonMortgageDetailGuarantee} hideNavBar key="PersonMortgageDetailGuarantee" title="保证担保"/>
                <Scene component={CustomerMortgageDetailGuarantee} hideNavBar key="CustomerMortgageDetailGuarantee" title="保证担保"/>
            </Stack>
        </Modal>
    </Router>
);

export default router;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height: 49,
    },
});