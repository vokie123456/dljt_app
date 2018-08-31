/*
 借款合同
 */

'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Title from '../../Component/Title';
import RNFS from 'react-native-fs';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SmallButton from '../../Component/SmallButton';
import {Overlay} from 'teaset';
import ImagePicker from 'react-native-image-picker';
let {height, width} = Dimensions.get('window');
import Swipeout from 'react-native-swipeout'

export default class LoanContractFile extends PureComponent {
    constructor(props) {
        super(props);
        console.log("props----------", props.data.data);
        this.state = {
            progressNum: 0,
            readTxtResult: '',
            prodData: [],
            data: props,
            formUrl: '',
        };
    }

    componentDidMount() {
        this.setState({});
        this._seeInfo();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._seeInfo();
        }
    }

    _seeInfo() {
        let url = Config.baseApi + Config.processApi.getContractCategoryTree + this.props.data.data.vars[0].projectId;

        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询借款合同', responseText);
                responseText.success ? this._render(responseText.topics) : Toast.message("请检查网络连接");
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

        });
        console.log('succ-------------esssss', dataBlob);
    };

    /*下载文件*/
    downloadFile(url) {
        // 文件
        // const downloadDest = `${RNFS.DocumentDirectoryPath

        this.overlayPopView.close();
        const formUrl1 = url;
        // const formUrl1 = 'http://139.224.199.31:8182/erp_test/attachFiles/projFile/contfolder/SmallLoan//101_2018_0067//呵呵呵-101_2018_0067-借款合同个人-06.doc';
        let array = formUrl1.split('.', formUrl1.length);
        let arrayName = array[array.length - 2].split('/', array.length);

        const downloadDest = `${RNFS.ExternalDirectoryPath}/` + arrayName[arrayName.length - 1] + '.doc';
        const options = {
            fromUrl: formUrl1,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
                let pro = res.bytesWritten / res.contentLength;
                this.setState({
                    progressNum: pro,
                });
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                Toast.message('保存成功');
                console.log('successsss', res);
                console.log('file://' + downloadDest);
            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }
    }

    _deleteItem(rowID) {
        let url = Config.baseApi + "/api/deleteContractCategoryRecordContractDraft.do?categoryId=" + rowID;
        RTRequest.fetch1(url).then((responseText) => {

            if (responseText) {
                console.log('删除合同', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _primaryItem(rowID) {
        Actions.LoanContractFileLImageList({
            data: this.state.data,
            inputDisabled: this.props.inputDisabled,
            projectId: rowID
        });
    }

    _SUCCESS() {
        Toast.message("删除成功");
        this._seeInfo();
    }


    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {id, contractId, contractCategoryText, url} = rowData.item.value;

        let formurl = Config.baseApi + '/' + url;

        // this.setState({
        //    formUrl: Config.baseApi+'/'+url,
        // });
        const swipeOutBtn = [
            {
                text: '查看',
                type: 'primary',
                onPress: () => {
                    this._primaryItem(contractId);
                },
            },
            // {
            //     text: '删除',
            //     type: 'delete',
            //     onPress: () => {
            //         this._deleteItem(id);
            //     },
            // },
        ];
        return (
            <View>
                <View style={{height: px2dp(15), backgroundColor: '#f5f5f5'}}></View>

                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    right={swipeOutBtn}
                    disabled={this1.props.disabled}
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
                                    <Text style={{color: 'black', marginBottom: px2dp(1)}}>{contractCategoryText}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.leftText1}>
                                {this1.props.inputDisabled ? <View/> :
                                    <Icon onPress={() => this1._openDelog(formurl)} name="arrow-down-bold-circle"
                                          size={px2dp(38)} style={{color: "#5cb4fc"}}/>}
                            </View>
                        </View>
                    </View>
                </Swipeout>
            </View>
        );
    }

    _openDelog = (formurl) => {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={'zoomOut'}
                modal={true}
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
                        <Text style={{fontSize: px2dp(34), color: '#393939'}}>{'确定保存'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', bottom: width / 13 * 1}}>
                        <Button style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                titleStyle={{color: '#fff'}} title='   保 存   '
                                onPress={() => this.downloadFile(formurl)}/>
                        <View style={{width: px2dp(60)}}/>
                        <Button style={{width: width / 4 * 1, backgroundColor: '#43a5e7'}}
                                titleStyle={{color: '#fff'}} title='   取 消   ' onPress={() => this.closeDialog()}/>

                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);

    };
    closeDialog() {
        this.overlayPopView && this.overlayPopView.close();
    }
    _renderRow11(rowData, sectionID, rowID) {
        console.log('333333333333333333' + this.state.data.data.data.taskId + (this.state.data.data.data.taskId == 7310188));
        return (
            <View>
                {this.state.data.data.data.activityName === '落实担保措施及合同签署' ?
                    <SmallButton style={{flex: 1, marginTop: px2dp(20)}} name="上传合同" height={70} width={240}
                                 onPress={() => this._takePhotoTapped()}
                    /> : <ListFooter/>}

            </View>
        );
    }

    _showPull(side, modal, code) {//'bottom', true, 'scale'
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
        const {projectId} = this.state.data.data.data.vars[0];
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
                        responseText.success ? this._SUCCESS1() : Toast.message("请检查网络连接");
                    }
                })
            }

        });
    }

    _SUCCESS1() {
        console.log('上传文件成功');
        Toast.message("上传文件成功");
    }

    _selectPhotoTapped() {
        const {projectId} = this.state.data.data.data.vars[0];
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

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back />
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
        );
    }
}

const
    styles = StyleSheet.create({
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

    });

