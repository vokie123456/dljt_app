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
export default class FirstNodeGuarantee extends Component {

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
                <Menu name={'项目基本信息'} pageName={'BasicInformation'} data={this.state} inputDisabled={false} selectDisabled={false} defaultChecked={false}/>
                {this.state.oppositeType=='person_customer'? <Menu name={'客户基本信息'} pageName={'CustomerBasicInformation'} data={this.state} selectDisabled={true} inputDisabled={true}/>:null}
                {this.state.oppositeType=='company_customer'? <Menu name={'企业基本信息'} pageName={'EnterpriseBasicInformation'} data={this.state} selectDisabled={true} inputDisabled={true} />:null}
                {this.state.oppositeType=='company_customer'? <Menu name={'法人代表信息'} pageName={'LegalRepresentative'} data={this.state} selectDisabled={true} inputDisabled={true} />:null}
                {/*<Menu name={'股东信息'} pageName={'ShareholderInfo'} data={this.state} inputDisabled={false} selectDisabled={false} chooseDisabled={false} datePickerDisabled={false}/>*/}
                <Menu name={'银行信息'} pageName={'BankInformation'} data={this.state} selectDisabled={true} inputDisabled={false} chooseDisabled={false}/>
                <Menu name={'担保基本信息'} pageName={'GuaranteeBasicInformation'} data={this.state} inputDisabled={false} selectDisabled={false} datePickerDisabled={false} defaultChecked={false}/>
                <Menu name={'抵质押担保'} pageName={'CollateralGuarantee'} data={this.state} inputDisabled={false} selectDisabled={false} chooseDisabled={false} datePickerDisabled={false}/>
                <Menu name={'保证担保'} pageName={'BaoZMortgageViewListGuarantee'} data={this.state} selectDisabled={true}  inputDisabled={false} chooseDisabled={true} datePickerDisabled={true} defaultChecked={true}/>
                <Menu name={'担保材料清单'} pageName={'GuaranteeMaterial'} data={this.state} inputDisabled={false} selectDisabled={false} chooseDisabled={false}/>
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
                {/*该两个流程目前没用*/}
                {/*<Menu name={'抵质押担保'} pageName={'DZYMortgageViewList'}/>*/}
            </View>
        )
    }

    //查看图片list
    _jumpImage(){
        // Actions.SurveyReportJpg({data:rowData.item.value,inputDisabled:this1.props.inputDisabled});
        Actions.SurveyReportJpg({data:this.state.data,inputDisabled:this.props.inputDisabled,businessType:'Guarantee'});
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
                let mark='cs_document_templet.314';
                let url = Config.baseApi + Config.twoApi.uploadReportJSFile + projectId+'&mark='+mark;
                console.log('=======上传url========'+url);
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


