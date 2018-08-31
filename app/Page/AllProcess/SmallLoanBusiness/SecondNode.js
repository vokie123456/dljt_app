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
import {Overlay} from 'teaset';
import ImagePicker from 'react-native-image-picker';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = (props) => {
    console.log("props22", props.data)
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
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#EEEEEE',
                height: px2dp(100)
            }}>
                <Text style={{fontSize: px2dp(27), color: '#333333'}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#757575'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
};

export default class SecondNode extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props1", props)
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
        console.log(11111, oppositeType);
    }

    componentWillReceiveProps(nextProps) {
        this._getInfo();
    }

    _getPersonId() {
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.processApi.getPersonId + "?projectId=" + projectId//获取用户id
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获取用户id----------------', responseText);
                responseText.success ? this.setState({
                    personId: responseText.oppositeID,
                    oppositeType: responseText.oppositeType
                }) : Toast.message("请检查网络连接");
            }
        })
    }

    _getInfo() {
        const {projectId} = this.state.data.vars[0];
        let url = Config.baseApi + Config.taskApi.getInfoUrl + "?userIds=" + this.state.data.userIds + "&slProjectId=" + projectId + "&slTaskId=" + this.state.data.taskId;//获得流程详细信息
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('获得流程详细信息', responseText);
                responseText.success ? this.setState({allData: responseText.data}) : Toast.message("请检查网络连接");
            }
        })
    }

    render() {
        console.log("data11", this.state);

        // const swipeOutBtn1 = [
        //     {
        //         text: '查看',
        //         type: 'primary',
        //         onPress: ()=>{
        //             // Actions.FileList({data:rowData.item.value,inputDisabled:this1.props.inputDisabled});
        //             Actions.FileList({data:rowData.item.value,inputDisabled:this1.props.inputDisabled});
        //         },
        //     },
        // ];

        return (
            <View style={styles.container}>
                {/*true不可编辑，false可编辑*/}
                <Menu name={'项目基本信息'} pageName={'CreditLoanProjectInfoPanel'} data={this.state} inputDisabled={true}
                      selectDisabled={true}/>
                {this.state.oppositeType == 'company_customer' ?
                    <Menu name={'企业基本信息'} pageName={'EnterpriseCusBasicInfo'} data={this.state} selectDisabled={true}
                          inputDisabled={true}/> : null}
                {this.state.oppositeType == 'company_customer' ?
                    <Menu name={'法人代表信息'} pageName={'LegalPersonRepresentInfo'} data={this.state} selectDisabled={true}
                          inputDisabled={true}/> : null}
                {this.state.oppositeType == 'person_customer' ?
                    <Menu name={'客户基本信息'} pageName={'PersonDetail'} data={this.state} selectDisabled={true}
                          inputDisabled={true}/> : null}
                <Menu name={'收款账户信息'} pageName={'LoanAccount'} data={this.state} selectDisabled={true}
                      inputDisabled={true} chooseDisabled={false}/>
                <Menu name={'借款基本信息'} pageName={'LoanInformation'} data={this.state} inputDisabled={true}
                      selectDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'手续费用收取清单'} pageName={'CommissionList'} data={this.state} inputDisabled={true}
                      selectDisabled={true} datePickerDisabled={true}/>
                <Menu name={'第一还款来源'} pageName={'FirstRepayment'} data={this.state} inputDisabled={true}
                      selectDisabled={true} datePickerDisabled={true}/>
                <Menu name={'共同借款人信息'} pageName={'BorrowerInfoViewList'} data={this.state} inputDisabled={true}
                      selectDisabled={true} chooseDisabled={true}/>
                <Menu name={'贷款材料'} pageName={'LoanRequirements'} data={this.state} inputDisabled={true}/>
                <Menu name={'抵质押担保'} pageName={'DZYMortgageViewList'} data={this.state} selectDisabled={true} inputDisabled={true} chooseDisabled={true} datePickerDisabled={true}/>
                <Menu name={'保证担保'} pageName={'BaoZMortgageViewList'} data={this.state} selectDisabled={true}
                      inputDisabled={true} chooseDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <TouchableOpacity
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
                        <Text style={{fontSize: px2dp(27), color: '#333333'}}>{'尽职调查报告'}</Text>

                        <View style={styles.leftText1}>

                            <Text style={{color: "#909090", fontSize: px2dp(28),paddingRight: px2dp(20),marginRight:px2dp(5)}}
                                  onPress={() => this._jumpImage()}
                            >查看</Text>
                            <Icon1 name={'arrow-up-bold-circle'} onPress={() => this._takePhotoTapped()}
                                   color={'#5cb4fc'} size={20} style={{marginRight: px2dp(5)}}/>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    //查看图片list
    _jumpImage(){
        // Actions.SurveyReportJpg({data:rowData.item.value,inputDisabled:this1.props.inputDisabled});
        Actions.SurveyReportJpg({data:this.state.data,inputDisabled:this.props.inputDisabled});
    }

    _showPull(side, modal, code) {
        let overlayView = (
            <Overlay.PullView side={side} modal={true} rootTransform={'scale'} ref={v => this.overlayPullView = v}>
                <View style={{backgroundColor: '#fff'}}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.overLayStyle}
                        onPress={() => this._takePhotoTapped()}
                    >
                        <Text style={{color: '#393939'}}>拍照上传</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.overLayStyle1}
                        // onPress={this._selectPhotoTapped.bind(this)}
                        onPress={() => this._selectPhotoTapped()}
                    >
                        <Text style={{color: '#393939'}}>本地上传</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.overLayStyle}
                        onPress={() => this.overlayPullView && this.overlayPullView.close()}
                    >
                        <Text style={{color: '#393939', fontWeight: '600'}}>取消</Text>
                    </TouchableOpacity>
                    {/*{modal ? <View style={{height: px2dp(40),backgroundColor: '#ddd'}} /> : null}*/}
                    {/*{modal ? <Button title='Close' onPress={() => this.overlayPullView && this.overlayPullView.close()} /> : null}*/}
                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    _takePhotoTapped() {
        const {projectId} = this.state.data.vars[0];
        const options = {
            quality: 0.4,
            maxWidth: 500,
            maxHeight: 500,
            noData: true,
            storageOptions: {//是否做为临时图片存储
                skipBackup: true//在手机相册存储图片
            }
        };

        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // this.overlayPullView.close();

                let formData = new FormData();
                let file = {uri: response.uri, type: 'multipart/form-data', name: Date.parse(new Date()) + ".jpg"};
                formData.append('myUpload', file);
                let url = Config.baseApi + Config.publicApi.uploadReportJSFile + projectId;
                RTRequest.uploadPhoto(url, formData).then((responseText) => {
                    if (responseText) {
                        console.log('上传文件成功', responseText);
                        responseText.success ? this._SUCCESS1(responseText.id_file) : Toast.message("请检查网络连接");
                    }
                })
            }

        });
    }

    _SUCCESS1(fileId) {
        console.log('上传文件成功');
        Toast.message("上传文件成功");
    }

    _selectPhotoTapped() {
        const {projectId} = this.state.data.vars[0];
        const options = {
            quality: 0.4,
            maxWidth: 500,
            maxHeight: 500,
            noData: true,
            storageOptions: {//是否做为临时图片存储
                skipBackup: true//在手机相册存储图片
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            console.log('prodData = ', this.state.prodData);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.overlayPullView.close();
                let formData = new FormData();
                let file = {uri: response.uri, type: 'multipart/form-data', name: Date.parse(new Date()) + ".jpg"};
                formData.append('myUpload', file);
                let url = Config.baseApi + Config.publicApi.uploadReportJSFile + projectId;
                RTRequest.uploadPhoto(url, formData).then((responseText) => {
                    if (responseText) {
                        console.log('上传文件成功', responseText);
                        responseText.success ? this._SUCCESS1(responseText.id_file) : Toast.message("请检查网络连接");
                    }
                })
            }
        });
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


