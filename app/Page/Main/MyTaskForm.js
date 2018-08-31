/**
 * Created by duansailong on 2018/3/7.
 */


'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {SegmentedView} from 'teaset';
import ImageViewer from 'react-native-image-zoom-viewer';
import SmallButton from '../../Component/SmallButton';
import {Input, Select, Button, Label, Checkbox, Overlay} from 'teaset';
import FirstNode from '../../Page/AllProcess/SmallLoanBusiness/FirstNode';
import SecondNode from '../../Page/AllProcess/SmallLoanBusiness/SecondNode';
import ThirdNode from "../AllProcess/SmallLoanBusiness/ThirdNode";
import FourthNode from "../AllProcess/SmallLoanBusiness/FourthNode";
import FifthNode from "../AllProcess/SmallLoanBusiness/FifthNode";
import SixthNode from "../AllProcess/SmallLoanBusiness/SixthNode";
import SeventhNode from "../AllProcess/SmallLoanBusiness/SeventhNode";
import EighthNode from "../AllProcess/SmallLoanBusiness/EighthNode";
import NinthNode from "../AllProcess/SmallLoanBusiness/NinthNode";
import TenthNode from "../AllProcess/SmallLoanBusiness/TenthNode";
import EleventhNode from "../AllProcess/SmallLoanBusiness/EleventhNode";
import TwelfthNode from "../AllProcess/SmallLoanBusiness/TwelfthNode";
import ThireteenthNode from "../AllProcess/SmallLoanBusiness/ThireteenthNode";
import FourteenNode from "../AllProcess/SmallLoanBusiness/FourteenNode";
import FifteenNode from "../AllProcess/SmallLoanBusiness/FifteenNode";
import SieteenthNode from "../AllProcess/SmallLoanBusiness/SieteenthNode";
import SeventeenthNode from "../AllProcess/SmallLoanBusiness/SeventeenthNode";
import SeventeenthNode1 from "../AllProcess/SmallLoanBusiness/SeventeenthNode1";
import EighteenthNode from "../AllProcess/SmallLoanBusiness/EighteenthNode";
import NineteenthNode from "../AllProcess/SmallLoanBusiness/NineteenthNode";
import TwentyNode from "../AllProcess/SmallLoanBusiness/TwentyNode";
import TwentyOneNode from "../AllProcess/SmallLoanBusiness/TwentyOneNode";
import TwentyTwoNode from "../AllProcess/SmallLoanBusiness/TwentyTwoNode";
//担保业务
import FirstNodeGuarantee from '../AllProcess/guaranteeBusiness/FirstNodeGuarantee';
import DueDiligenceTwo from '../AllProcess/guaranteeBusiness/DueDiligenceTwo';
let {height, width} = Dimensions.get('window');

const BottomButton = (props) => {
    return (
        <View style={{
            backgroundColor: '#f7f5f6',
            width: SCREEN_WIDTH,
            alignItems: 'center',
            paddingTop: px2dp(25),
            paddingBottom: px2dp(25)
        }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => props.that._showPop('zoomOut', true)}
                style={{alignItems: 'center', paddingBottom: px2dp(20)}}>
                {/*<SmallButton style={{flex: 1}} name="执行下一步" height={75} width={250} onPress={() => this._showPop('zoomOut', true)} />*/}
                <ImageBackground
                    resizeMode={"stretch"}
                    style={{width: SCREEN_WIDTH - px2dp(60), height: px2dp(80)}} source={Images.nextTop}>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => Actions.ApprovalRecord({taskId: props.that.props.taskId})}
                style={{alignItems: 'center', paddingBottom: px2dp(10)}}>
                <ImageBackground
                    resizeMode={"stretch"}
                    style={{width: SCREEN_WIDTH - px2dp(60), height: px2dp(75)}} source={Images.nextBottom}>
                </ImageBackground>
                {/*<SmallButton style={{flex: 1}} name="意见说明记录" height={75} width={250} onPress={()=>Actions.ApprovalRecord({taskId: this.props.taskId})} />*/}
            </TouchableOpacity>
        </View>
    )
}

export default class MyTaskForm extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        console.log("111111111", props);
        super(props);
        // 初始状态
        this.state = {
            page: <View/>,
            outers: [],
            outersValue: "",
            outersValueKey: "",
            dialogAppUserKey: "",//客户经理
            dialogAppUserValue: "",//客户经理
            actorUserFlag: '',
            isChecked: false,//如果已经按照借款金额选取任务提交节点就不再继续默认判断
            preHandler:'',//提交节点
        };
        // if (props.vars[0].businessType == "SmallLoanBusiness") {//小贷
        if (props.vars[0].businessType == "SmallLoan") {//小贷
            if (props.activityName == "业务申请") {//第一个节点
                this.state = {
                    page: <FirstNode {...this.props}/>
                }
            } else if (props.activityName == "尽职调查一") {
                this.state = {
                    page: <SecondNode {...this.props}/>
                }
            } else if (props.activityName == "尽职调查二") {
                this.state = {
                    page: <ThirdNode {...this.props}/>
                }
            } else if (props.activityName == "风控人员审核") {
                this.state = {
                    page: <FourthNode {...this.props}/>
                }
            } else if (props.activityName == "分公司总经理1") {
                this.state = {
                    page: <FifthNode {...this.props}/>
                }
            } else if (props.activityName == "风险管理部总经理") {
                this.state = {
                    page: <SixthNode {...this.props}/>
                }
            } else if (props.activityName == "事业部总裁") {
                this.state = {
                    page: <SeventhNode {...this.props}/>
                }
            } else if (props.activityName == "大额业务审批小组") {
                this.state = {
                    page: <EighthNode {...this.props}/>
                }
            } else if (props.activityName == "汇总审批意见") {
                this.state = {
                    page: <NinthNode {...this.props}/>
                }
            } else if (props.activityName == "总裁") {
                this.state = {
                    page: <TenthNode {...this.props}/>
                }
            } else if (props.activityName == "董事长") {
                this.state = {
                    page: <EleventhNode {...this.props}/>
                }
            } else if (props.activityName == "落实担保措施及合同签署") {
                this.state = {
                    page: <TwelfthNode {...this.props}/>
                }
            } else if (props.activityName == "风控终审") {
                this.state = {
                    page: <ThireteenthNode {...this.props}/>
                }
            } else if (props.activityName == "付款申请") {
                this.state = {
                    page: <FourteenNode {...this.props}/>
                }
            } else if (props.activityName == "财务前置收费，生成款项计划") {
                this.state = {
                    page: <FifteenNode {...this.props}/>
                }
            } else if (props.activityName == "分公司总经理2") {
                this.state = {
                    page: <SieteenthNode {...this.props}/>
                }
            } else if (props.activityName == "财务审核") {
                this.state = {
                    page: <SeventeenthNode {...this.props}/>
                }
            } else if (props.activityName == "财务经理") {
                this.state = {
                    page: <SeventeenthNode1 {...this.props}/>
                }
            } else if (props.activityName == "总裁审批") {
                this.state = {
                    page: <EighteenthNode {...this.props}/>
                }
            } else if (props.activityName == "董事长审批") {
                this.state = {
                    page: <NineteenthNode {...this.props}/>
                }
            } else if (props.activityName == "财务确认放款") {
                this.state = {
                    page: <TwentyNode {...this.props}/>
                }
            } else if (props.activityName == "客户经理上传归档材料") {
                this.state = {
                    page: <TwentyOneNode {...this.props}/>
                }
            } else if (props.activityName == "档案管理员审核资料归档") {
                this.state = {
                    page: <TwentyTwoNode {...this.props}/>
                }
            }
        }else if (props.vars[0].businessType == "Guarantee") {//担保业务
            if (props.activityName == "业务申请及尽职调查") {//第一个节点
                this.state = {
                    page: <FirstNodeGuarantee {...this.props}/>
                }
            } else if (props.activityName == "尽职调查二") {
                this.state = {
                    page: <DueDiligenceTwo {...this.props}/>
                }
            } else if (props.activityName == "副总") {
                this.state = {
                    page: <ThirdNode {...this.props}/>
                }
            } else if (props.activityName == "分公司总经理") {
                this.state = {
                    page: <FourthNode {...this.props}/>
                }
            } else if (props.activityName == "风险管理部总经理") {
                this.state = {
                    page: <FifthNode {...this.props}/>
                }
            } else if (props.activityName == "事业部总裁") {
                this.state = {
                    page: <SixthNode {...this.props}/>
                }
            } else if (props.activityName == "大额审批小组") {
                this.state = {
                    page: <SeventhNode {...this.props}/>
                }
            } else if (props.activityName == "汇总大额审批小组") {
                this.state = {
                    page: <EighthNode {...this.props}/>
                }
            } else if (props.activityName == "总裁") {
                this.state = {
                    page: <NinthNode {...this.props}/>
                }
            } else if (props.activityName == "董事长") {
                this.state = {
                    page: <TenthNode {...this.props}/>
                }
            } else if (props.activityName == "合同签署并上传盖完章合同") {
                this.state = {
                    page: <EleventhNode {...this.props}/>
                }
            } else if (props.activityName == "风控终审") {
                this.state = {
                    page: <TwelfthNode {...this.props}/>
                }
            } else if (props.activityName == "总经理银行盖章") {
                this.state = {
                    page: <ThireteenthNode {...this.props}/>
                }
            } else if (props.activityName == "客户经理填写联系单") {
                this.state = {
                    page: <FourteenNode {...this.props}/>
                }
            } else if (props.activityName == "财务审核") {
                this.state = {
                    page: <FifteenNode {...this.props}/>
                }
            } else if (props.activityName == "上传资料生成合同") {
                this.state = {
                    page: <SieteenthNode {...this.props}/>
                }
            } else if (props.activityName == "客户经理确认资料") {
                this.state = {
                    page: <SeventeenthNode {...this.props}/>
                }
            } else if (props.activityName == "总经理审核") {
                this.state = {
                    page: <SeventeenthNode1 {...this.props}/>
                }
            }

        }

    }

    componentDidMount() {
        if(this.props.vars[0].businessType == "SmallLoan"){
            this._getInfo();
        }else if(this.props.vars[0].businessType == "Guarantee"){
            this._getInfo1();
        }
        this._getActorUserList();
    }

    _getInfo() {
        let url = Config.baseApi + Config.taskApi.getInfoUrl + "?userIds=" + this.props.userIds + "&slProjectId=" + this.props.vars[0].projectId + "&slTaskId=" + this.props.taskId;//获得流程详细信息
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获得流程详细信息***', responseText);
                responseText.success ? this._check(responseText.data.slSmallloanProject.alltotalMoney) : Toast.message("请检查网络连接");
            }
        })
    }
    _getInfo1() {
        let url = Config.baseApi + Config.twoApi.getUserInfo + "?userIds=" + this.props.userIds + "&glProjectId=" + this.props.vars[0].projectId + "&slTaskId=" + this.props.taskId;//获得流程详细信息
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获得流程详细信息---------------', responseText);
                responseText.success ? this._check(responseText.data.gLGuaranteeloanProject.alltotalMoney) : Toast.message("请检查网络连接");
            }
        })
    }

    _getActorUserList() {
        let url = Config.baseApi + '/api/getIsReSetNextProcessActivity.do?taskId=' + this.state.page.props.taskId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('处理人状态***', responseText);
                responseText.success ? this._SUCCESS1(responseText) : Toast.message("当前处理人更新失败！");
            }
        })
    }

    _check(allTotalMoney) {
        console.log("平台总借款金额*********", allTotalMoney)
        const {destType} = this.props.trans[0];
        if (destType == 'decision' || destType == 'fork') {
            this._outerTrans(allTotalMoney);//流程分支查询
        } else if (destType.indexOf('end') != -1) {
            // this._outerTrans1();//流程分支查询
        } else {
            this._outerTrans1(allTotalMoney);//流程分支查询
        }
    }

    _outerTrans(allTotalMoney) {
        let url = Config.baseApi + Config.taskApi.outerTrans + this.props.taskId + "&nodeName=" + this.props.trans[0].destination;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('流程分支查询', responseText);
                this._boxValue(responseText, "one", allTotalMoney);
            } else {
                Toast.message("请联系管理员");
            }
        })
    }

    _outerTrans1(allTotalMoney) {
        let url = Config.baseApi + Config.taskApi.outerTrans + this.props.taskId + "&isNode=identification&nodeName=" + this.props.trans[0].destination;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('流程分支查询1', responseText);
                this._boxValue(responseText, "two", allTotalMoney);
            }
        })
    }

    _boxValue(outers, type, allTotalMoney) {
        let that = this;
        let dataBlob = [];
        let i = 0;
        let boxValue = "";
        const {activityName} = this.props;
        if (type === 'one') {//'decision' == destType || 'fork' == destType
            outers.map(function (item, index) {
                if (!that.state.isChecked) {
                    if (!item[5]) {
                        if (item[6]) {
                            that.setState({
                                outersValue: item[1]
                            })
                        }
                    }
                }
                if (activityName == '分公司总经理1') {
                    if (allTotalMoney > 1000000) {
                        if (item[0].indexOf('风险管理部总经理') != -1) {
                            that.setState({
                                outersValue: '风险管理部总经理',
                                isChecked: true
                            })
                        }
                    } else {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署',
                                isChecked: true
                            })
                        }
                    }
                } else if (activityName == '风险管理部总经理') {
                    if (allTotalMoney > 1000000) {
                        if (item[0].indexOf('事业部总裁') != -1) {
                            that.setState({
                                outersValue: '事业部总裁',
                                isChecked: true
                            })
                        }
                    } else {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署',
                                isChecked: true
                            })
                        }
                    }
                } else if (activityName == '事业部总裁') {
                    if (allTotalMoney <= 2000000) {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署',
                                isChecked: true
                            })
                        }
                    } else if (allTotalMoney > 2000000 && allTotalMoney < 3000000) {
                        if (item[0].indexOf('总裁') != -1) {
                            that.setState({
                                outersValue: '总裁',
                                isChecked: true
                            })
                        }
                    } else if (allTotalMoney >= 3000000) {
                        if (item[0].indexOf('大额业务审批小组') != -1) {
                            that.setState({
                                outersValue: '大额业务审批小组',
                                isChecked: true
                            })
                        }
                    }
                } else if (activityName == '总裁') {
                    if (allTotalMoney < 5000000) {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署',
                                isChecked: true
                            })
                        }
                    } else {
                        if (item[0].indexOf('董事长') != -1) {
                            that.setState({
                                outersValue: '董事长',
                                isChecked: true
                            })
                        }
                    }
                }
                if (!item[6] && !(item[1].indexOf("终止") != -1) && !(item[1].indexOf("结束") != -1)) {
                    boxValue = "退回至<" + item[1].replace(/[0-9]/g, '') + ">";
                } else {
                    boxValue = item[1].replace(/[0-9]/g, '');
                }
                dataBlob.push({
                    text: boxValue,
                    value: item[1],
                });
                i++;
            });
        } else if (type === 'two') {
            outers.map(function (item, index) {
                console.log("itemitem", item[0].indexOf('落实担保措施及合同签署') != -1)
                if (activityName == '分公司总经理1') {
                    if (allTotalMoney > 1000000) {
                        if (item[0].indexOf('风险管理部总经理') != -1) {
                            that.setState({
                                outersValue: '风险管理部总经理'
                            })
                        }
                    } else {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署'
                            })
                        }
                    }
                } else if (activityName == '风险管理部总经理') {
                    if (allTotalMoney > 1000000) {
                        if (item[0].indexOf('事业部总裁') != -1) {
                            that.setState({
                                outersValue: '事业部总裁'
                            })
                        }
                    } else {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署'
                            })
                        }
                    }
                } else if (activityName == '事业部总裁') {
                    if (allTotalMoney <= 2000000) {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署'
                            })
                        }
                    } else if (allTotalMoney > 2000000 && allTotalMoney < 3000000) {
                        if (item[0].indexOf('总裁') != -1) {
                            that.setState({
                                outersValue: '总裁'
                            })
                        }
                    } else if (allTotalMoney >= 3000000) {
                        if (item[0].indexOf('大额业务审批小组') != -1) {
                            that.setState({
                                outersValue: '大额业务审批小组'
                            })
                        }
                    }
                } else if (activityName == '总裁') {
                    if (allTotalMoney < 5000000) {
                        if (item[0].indexOf('落实担保措施及合同签署') != -1) {
                            that.setState({
                                outersValue: '落实担保措施及合同签署'
                            })
                        }
                    } else {
                        if (item[0].indexOf('董事长') != -1) {
                            that.setState({
                                outersValue: '董事长'
                            })
                        }
                    }
                }
                if (i < 1) {
                    dataBlob.push({
                        text: item[0] + "[" + item[2] + "]",
                        value: item[0],
                    });
                }
                i++;
            });
        }
        this.setState({outers: dataBlob})
        // this.setState({outers: dataBlob,outersValue: "董事长审批"})
        console.log("dataBlodataBlobb", this.state)
    }

    componentWillMount() {
        this.setState({
            advice: '',//审批意见
            sendMail: false,
            sendMsg: true,
            outersValue: this.props.trans[0].destination,
            // remindWay: [
            //     {text: "邮件提醒",value: 0},
            //     {text: "短信提醒",value: 1}
            // ],
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProp777777777777", nextProps.isRefresh);
        if (nextProps.isRefresh) {
            this.setState({
                page: <View/>,
            });
            if (this.props.newJs == "SmallLoanBusiness") {//小贷
                if (this.props.activityName == "业务申请") {//第一个节点
                    this.setState({
                        page: <FirstNode {...this.props}/>
                    })
                } else if (this.props.activityName == "尽职调查一") {
                    this.state = {
                        page: <SecondNode {...this.props}/>
                    }
                } else if (this.props.activityName == "尽职调查二") {
                    this.state = {
                        page: <ThirdNode {...this.props}/>
                    }
                } else if (this.props.activityName == "风控人员审核") {
                    this.state = {
                        page: <FourthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "分公司总经理1") {
                    this.state = {
                        page: <FifthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "风险管理部总经理") {
                    this.state = {
                        page: <SixthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "事业部总裁") {
                    this.state = {
                        page: <SeventhNode {...this.props}/>
                    }
                } else if (this.props.activityName == "大额业务审批小组") {
                    this.state = {
                        page: <EighthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "汇总审批意见") {
                    this.state = {
                        page: <NinthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "总裁") {
                    this.state = {
                        page: <TenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "董事长") {
                    this.state = {
                        page: <EleventhNode {...this.props}/>
                    }
                } else if (this.props.activityName == "落实担保措施及合同签署") {
                    this.state = {
                        page: <TwelfthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "风控终审") {
                    this.state = {
                        page: <ThireteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "付款申请") {
                    this.state = {
                        page: <FourteenNode {...this.props}/>
                    }
                } else if (this.props.activityName == "财务前置收费，生成款项计划") {
                    this.state = {
                        page: <FifteenNode {...this.props}/>
                    }
                } else if (this.props.activityName == "分公司总经理2") {
                    this.state = {
                        page: <SieteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "财务审核") {
                    this.state = {
                        page: <SeventeenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "财务经理") {
                    this.state = {
                        page: <SeventeenthNode1 {...this.props}/>
                    }
                } else if (this.props.activityName == "总裁审批") {
                    this.state = {
                        page: <EighteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "董事长审批") {
                    this.state = {
                        page: <NineteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "财务确认放款") {
                    this.state = {
                        page: <TwentyNode {...this.props}/>
                    }
                } else if (this.props.activityName == "客户经理上传归档材料") {
                    this.state = {
                        page: <TwentyOneNode {...this.props}/>
                    }
                } else if (this.props.activityName == "档案管理员审核资料归档") {
                    this.state = {
                        page: <TwentyTwoNode {...this.props}/>
                    }
                }
            }else if (this.props.vars[0].businessType == "Guarantee") {//担保业务
                if (this.props.activityName == "业务申请及尽职调查") {//第一个节点
                    this.state = {
                        page: <FirstNodeGuarantee {...this.props}/>
                    }
                } else if (this.props.activityName == "尽职调查二") {
                    this.state = {
                        page: <DueDiligenceTwo {...this.props}/>
                    }
                } else if (this.props.activityName == "副总") {
                    this.state = {
                        page: <ThirdNode {...this.props}/>
                    }
                } else if (this.props.activityName == "分公司总经理") {
                    this.state = {
                        page: <FourthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "风险管理部总经理") {
                    this.state = {
                        page: <FifthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "事业部总裁") {
                    this.state = {
                        page: <SixthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "大额审批小组") {
                    this.state = {
                        page: <SeventhNode {...this.props}/>
                    }
                } else if (this.props.activityName == "汇总大额审批小组") {
                    this.state = {
                        page: <EighthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "总裁") {
                    this.state = {
                        page: <NinthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "董事长") {
                    this.state = {
                        page: <TenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "合同签署并上传盖完章合同") {
                    this.state = {
                        page: <EleventhNode {...this.props}/>
                    }
                } else if (this.props.activityName == "风控终审") {
                    this.state = {
                        page: <TwelfthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "总经理银行盖章") {
                    this.state = {
                        page: <ThireteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "客户经理填写联系单") {
                    this.state = {
                        page: <FourteenNode {...this.props}/>
                    }
                } else if (this.props.activityName == "财务审核") {
                    this.state = {
                        page: <FifteenNode {...this.props}/>
                    }
                } else if (this.props.activityName == "上传资料生成合同") {
                    this.state = {
                        page: <SieteenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "客户经理确认资料") {
                    this.state = {
                        page: <SeventeenthNode {...this.props}/>
                    }
                } else if (this.props.activityName == "总经理审核") {
                    this.state = {
                        page: <SeventeenthNode1 {...this.props}/>
                    }
                }
            }
        }
        if (nextProps.isRefresh2) {
            this.setState({
                dialogAppUserKey: nextProps.key1,
                dialogAppUserValue: nextProps.key2,
            });
        }
    }

    _next() {
        this.overlayPopView.close();
        // useTemplate:TRUE
        // signVoteType:
        // flowAssignId://下个节点处理人id
        // taskId:6690034
        // signalName:风控终审
        // destName:风控终审
        // sendMsg:
        // sendMail:
        // comments:asd
        // preHandler:slSmallloanProjectService.ahGoToNext
        // needSave: 1
        // info: 1
        // repaymentSource:
        // task_id:6690034
        // projectId: 519
        if(this.props.vars[0].businessType == "SmallLoan"){
            this._next1('slSmallloanProjectService.ahGoToNext');
        }else if(this.props.vars[0].businessType == "Guarantee"){
            this._next1('gLGuaranteeloanProjectService.guaranteeBusinessNextStep');
        }
    }
    _next1(preHandler){
        const {advice, sendMsg, sendMail, outersValue, dialogAppUserValue} = this.state;
        const {destType} = this.props.trans[0];
        let url = Config.baseApi + Config.publicApi.nextProcess +
            "?useTemplate=true" +
            "&signVoteType=" +
            "&isMobile=1" +
            "&taskId=" + this.props.taskId +
            "&flowAssignId=" + (isEmpty(dialogAppUserValue) ? "" : dialogAppUserValue) +
            "&task_id=" + this.props.taskId +
            "&signalName=" + outersValue +
            "&destName=" + (destType == "task" ? outersValue : "") +
            "&sendMsg=" + sendMsg +
            "&sendMail=" + sendMail +
            "&comments=" + Tool.iGetInnerText(advice) +
            "&preHandler=" +preHandler+
            // "&needSave=1"+
            "&info=1" +
            "&repaymentSource=" +
            "&projectId=" + this.props.vars[0].projectId;

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('提交到下个节点', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("失败，请联系管理员");
            }
        })
    }

    _SUCCESS = () => {
        Toast.message("提交成功");
        // Actions.pop({refresh: ({isRefresh: true, date1: new Date()})});
        this.props._repayment();
        Actions.pop();
    }

    _SUCCESS1(responseText) {
        this.setState({
            actorUserFlag: responseText.flag,
        });
    }

    _showPop(type, modal) {//modal控制是否点击周围取消弹框
        const {advice, outersValue} = this.state;
        if (isEmpty(outersValue)) {
            Toast.message("请选择任务提交");
            return;
        }
        if (isEmpty(advice)) {
            Toast.message("请填写审批意见");
            return;
        }
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: width / 5 * 4 - px2dp(50),
                    minHeight: width / 2 * 1 - px2dp(50),
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flexDirection: 'row', position: 'absolute', top: width / 9 * 1}}>
                        <Text style={{fontSize: px2dp(32),}}>确认提交到</Text>
                        <Text style={{fontSize: px2dp(34), color: '#393939'}}>{this.state.outersValue}</Text>
                        <Text style={{fontSize: px2dp(32),}}>节点</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: width / 13 * 1}}>
                        <Button style={{width: width / 5 * 1, backgroundColor: '#43a5e7'}} titleStyle={{color: '#fff'}}
                                title='是' onPress={() => this._next(this.state.outersValue)}/>
                        <View style={{width: px2dp(60)}}/>
                        <Button style={{width: width / 5 * 1, backgroundColor: '#43a5e7'}} titleStyle={{color: '#fff'}}
                                title='否' onPress={() => this.overlayPopView && this.overlayPopView.close()}/>
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    render() {
        let that = this;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <SegmentedView
                    indicatorLineColor={"#398ef6"}
                    style={{flex: 1, paddingTop: px2dp(10)}}
                    type='carousel'//是否可以左右滑动切换
                >
                    <SegmentedView.Sheet title='任务内容' badge={1}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                            {/*节点页面*/}
                            {this.state.page}
                        </ScrollView>
                        <BottomButton that={this}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='流程图'>
                        <ImageViewer imageUrls={[{url: Config.baseApi + Config.publicApi.jbPmImage + this.props.vars[0].runId}]}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='审批设置'>
                        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                            <View style={{
                                flexDirection: 'row',
                                marginLeft: px2dp(35),
                                marginRight: px2dp(35),
                                alignItems: 'center',
                                borderBottomWidth: hair,
                                borderBottomColor: '#ddd',
                                height: px2dp(100),
                            }}>
                                <Text style={{flex: 1, color: '#fff'}}>*<Text style={{fontSize: px2dp(28), color: '#333'}}>任务提交至：</Text></Text>
                                <Select
                                    style={{
                                        flex: 2,
                                        marginRight: px2dp(36),
                                        paddingLeft: 0,
                                        borderWidth: 0,
                                        backgroundColor: '#fff'
                                    }}
                                    size='md'
                                    pickerType='popover'
                                    value={this.state.outersValue}
                                    items={this.state.outers}
                                    getItemValue={(item, index) => item.value}
                                    getItemText={(item, index) => item.text}
                                    pickerTitle={`请选择`}
                                    onSelected={(item, index) => {
                                        this.setState({
                                            outersValue: item.value,

                                        })
                                    }}
                                />
                            </View>
                            {(this.state.actorUserFlag == 1) ?
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => this.actorUser()}
                                    style={styles.textCenter}
                                >
                                    <Text style={{fontSize: px2dp(27), color: '#333333'}}>处理人</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Text style={{
                                            fontSize: px2dp(27),
                                            color: '#333333',
                                            marginRight: px2dp(20)
                                        }}>{this.state.dialogAppUserKey}</Text>
                                        <Icon name={'ios-arrow-forward'} color={'#757575'} size={20}
                                              style={{marginRight: px2dp(40)}}/>
                                    </View>
                                </TouchableOpacity>
                                : <View/>}
                            <View style={{flexDirection: 'row', marginLeft: px2dp(35), marginRight: px2dp(35)}}>
                                <View style={{
                                    flexDirection: 'row', flex: 1, borderBottomWidth: hair,
                                    borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),
                                }}>
                                    <Text style={{flex: 2, color: '#fff'}}>*<Text
                                        style={{fontSize: px2dp(28), color: '#333'}}>任务提醒方式</Text></Text>
                                    <View style={{
                                        flex: 3,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Checkbox
                                            size='md'
                                            title={"邮件提醒"}
                                            checked={this.state.sendMail}
                                            onChange={value => this.setState({sendMail: value})}
                                        />
                                        <Checkbox
                                            size='md'
                                            disabled={true}
                                            title={"短信提醒"}
                                            checked={this.state.sendMsg}
                                            onChange={value => this.setState({sendMsg: value})}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={{height: px2dp(80), marginTop: px2dp(20), marginLeft: px2dp(35), color: '#FF1737'}}>*<Text
                                style={{fontSize: px2dp(28), color: '#333'}}>审批意见：</Text></Text>
                            <View style={{
                                height: px2dp(100),
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginLeft: px2dp(20),
                                marginRight: px2dp(20),
                                marginBottom: px2dp(600)
                            }}>
                                <Input
                                    style={{
                                        textAlignVertical: 'top',
                                        justifyContent: 'center',
                                        flex: .9,
                                        height: px2dp(300)
                                    }}
                                    size='md'
                                    multiline={true}
                                    value={this.state.advice}
                                    placeholder='审批意见'
                                    onChangeText={text => this.setState({advice: text})}
                                />
                            </View>
                        </ScrollView>
                        <View style={{position: 'absolute', bottom: 0}}>
                            <BottomButton that={this}/>
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>
            </View>
        )
    }

    actorUser() {
        console.log("处理人");
        Actions.ActorUserList({
            inputDisabled: this.props.inputDisabled
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: px2dp(45), marginRight: px2dp(35),
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EEEEEE',
        height: px2dp(100)
    }
})


