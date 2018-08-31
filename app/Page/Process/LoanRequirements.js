/**
 * Created by duansailong on 2018/3/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {Overlay} from 'teaset';
import ImagePicker from 'react-native-image-picker';
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LoanRequirements extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props----------", props.data.data)
        // 初始状态
        this.state = {
            prodData: [],
            data: props
        };

    }

    componentDidMount() {
        this.setState({});
        this._seeInfo();//查询贷款材料
        // this._seeInfo1();//查询贷款材料
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._seeInfo();//回调贷款材料
        }
    }

    _seeInfo() {
        let url = Config.baseApi + Config.processApi.listEnterprise + this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询贷款材料', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }

    _render = (list) => {
        console.log("list", list);
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
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

    _deleteItem(rowID) {
        let url = Config.baseApi + Config.processApi.deleteMaterials + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除贷款材料', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS() {
        Toast.message("删除成功");
        this._seeInfo();//查询贷款材料
    }

    _showPull(side, modal, code, proMaterialsId) {
        let overlayView = (
            <Overlay.PullView side={side} modal={true} rootTransform={'scale'} ref={v => this.overlayPullView = v}>
                <View style={{backgroundColor: '#fff'}}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.overLayStyle}
                        onPress={() => this._takePhotoTapped(proMaterialsId)}
                    >
                        <Text style={{color: '#393939'}}>拍照上传</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.overLayStyle1}
                        // onPress={this._selectPhotoTapped.bind(this)}
                        onPress={() => this._selectPhotoTapped(proMaterialsId)}
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

    _takePhotoTapped(proMaterialsId) {
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
                // let source = { uri: response.uri };
                // this.setState({
                //     avatarSource: source
                // });
                let file = {uri: response.uri, type: 'multipart/form-data', name: Date.parse(new Date()) + ".jpg"};
                formData.append('myUpload', file);
                let url = Config.baseApi + Config.publicApi.uploadWay + "&mark=sl_procredit_materials." + proMaterialsId;
                RTRequest.uploadPhoto(url, formData).then((responseText) => {
                    if (responseText) {
                        console.log('上传文件成功', responseText);
                        responseText.success ? this._SUCCESS1(responseText.id_file, proMaterialsId) : Toast.message("请检查网络连接");
                    }
                })
            }
        });
    }

    _selectPhotoTapped(proMaterialsId) {
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
                // this.overlayPullView.close();
                let formData = new FormData();
                // let source = { uri: response.uri };
                // this.setState({
                //     avatarSource: source
                // });
                let file = {uri: response.uri, type: 'multipart/form-data', name: Date.parse(new Date()) + ".jpg"};
                console.log("response.uriadsssssssssssssssssssssssssssss", response.uri)
                formData.append('myUpload', file);
                let url = Config.baseApi + Config.publicApi.uploadWay + "mark=sl_procredit_materials." + proMaterialsId;
                RTRequest.uploadPhoto(url, formData).then((responseText) => {
                    if (responseText) {
                        console.log('上传文件成功', responseText);
                        responseText.success ? this._SUCCESS1(responseText.id_file, proMaterialsId) : Toast.message("请检查网络连接");
                    }
                })
            }
        });
    }

    _SUCCESS1(fileId, proMaterialsId) {
        Toast.message("上传文件成功");
        this._seeInfoDetail(proMaterialsId);//查询贷款材料
    }

    _seeInfoDetail(proMaterialsId) {
        let url = Config.baseApi + Config.processApi.getUploadedFileList + proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('重新查询材料份数', responseText);
                responseText.success ? this.changeTotals(proMaterialsId, responseText.totals) : Toast.message("请检查网络连接");
            }
        })
    }

    changeTotals = (proMaterialsId, size) => {
        console.log("list111111111111", proMaterialsId + "--------" + size)
        let url = Config.baseApi + Config.processApi.updateDataNum + "?slProcreditMaterials.datumNums=" + size + "&slProcreditMaterials.proMaterialsId=" + proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('修改贷款材料份数', responseText);
                responseText.success ? this._seeInfo() : Toast.message("请检查网络连接");
            }
        })
    }

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {materialsName, datumNums, proMaterialsId, projId, materialsId, parentId} = rowData.item.value;
        console.log('88888888888888____________-' + proMaterialsId);
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    this._deleteItem(proMaterialsId);
                },
            },
            {
                text: '查看',
                type: 'primary',
                onPress: () => {
                    Actions.FileList({data: rowData.item.value, inputDisabled: this1.props.inputDisabled});
                },
            },
        ];
        const swipeOutBtn1 = [
            {
                text: '查看',
                type: 'primary',
                onPress: () => {
                    Actions.FileList({data: rowData.item.value, inputDisabled: this1.props.inputDisabled});
                },
            },
        ];
        return (
            <View>
                <View style={{height: px2dp(15), backgroundColor: '#f5f5f5'}}></View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    // left={rowData.left}
                    right={this1.props.inputDisabled ? swipeOutBtn1 : swipeOutBtn1}
                    // right={this.state.btnsTypes}
                    rowID={rowID}
                    sectionID={sectionID}
                    autoClose={true}
                    backgroundColor={rowData.backgroundColor}
                    onOpen={(sectionID, rowID) => {
                    }}
                    onClose={() => console.log('onClose') }
                    scroll={event => console.log('scroll event') }
                >
                    <View style={styles.contacts}>
                        <View style={{flexDirection: 'row', height: px2dp(80)}}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                // onPress={ ()=>Actions.AddFirstRepayment({data:rowData.item.value,allData:this1.props.data,type1: "see",data1:this1.props})}
                                style={styles.leftText}>
                                <View style={{paddingLeft: px2dp(15)}}>
                                    <Text style={{color: 'black', marginBottom: px2dp(1)}}>{materialsName}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.leftText1}>
                                <Text
                                    style={{color: "#858585", fontSize: px2dp(26), paddingRight: px2dp(20)}}>{datumNums}份</Text>
                                {this1.props.inputDisabled ? <View/> :
                                    <Icon onPress={() => this._takePhotoTapped( proMaterialsId)}
                                          name="arrow-up-bold-circle" size={px2dp(38)} style={{color: "#5cb4fc"}}/>}
                                {/*<Icon name="md-cloud-upload" size={px2dp(38)} style={{color: "#5cb4fc"}}/>*/}
                            </View>
                        </View>
                    </View>
                </Swipeout>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back toPop/>
                <FlatList
                    style={styles.listStyle}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow.bind(this)}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onEndReachedThreshold={1}
                    refreshing={true}
                    numColumns={1}
                />
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


