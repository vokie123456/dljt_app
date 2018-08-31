/*
 尽职调查报告
 */

'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Dimensions

} from 'react-native';
import Title from '../../Component/Title';
import RNFS from 'react-native-fs';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay,} from 'teaset';
let {height, width} = Dimensions.get('window');
import {Modal} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';


export default class SurveyReportFile extends PureComponent {
    constructor(props) {
        super(props);
        console.log("props----------", props);
        this.state = {
            progressNum: 0,
            readTxtResult: '',
            prodData: [],
            data: props,
            formUrl: ''
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
        let url = Config.baseApi + Config.processApi.listsAppFile + this.props.data.data.vars[0].projectId;
        if(this.props.data.allData.businessType=='Guarantee'){
            url = Config.baseApi + Config.twoApi.listsAppFile + this.props.data.data.vars[0].projectId;
        }
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询尽职调查报告', responseText);
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
        })
    };

    /*下载文件*/
    downloadFile = (url) => {
        this.overlayPopView.close();
        const url1 = url;
        console.log('---------------', url1.split('.', url1.length));
        let array = url1.split('.', url1.length);
        let arrayName = array[array.length - 2].split('/', array.length);

        // const downloadDest = `${RNFS.DocumentDirectoryPath
        // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';
        // const formUrl = 'http://139.224.199.31:8182/erp_test/attachFiles/projFile/reportfolder/101_2018_0062/cs_document_templet.168/URR7IBTJ56D1AAZI98H7%JD_201807.jpg';

        let downloadDest = '';
        // 文件
        if (array[array.length - 1] === 'doc') {
            downloadDest = `${RNFS.ExternalDirectoryPath  }/` + arrayName[arrayName.length - 1] + '.zip';
            this.saveFile(url1, downloadDest);
            // 图片
        } else if (array[array.length - 1] === 'jpg' || array[array.length - 1] === 'png') {
            downloadDest = `${RNFS.ExternalDirectoryPath  }/` + arrayName[arrayName.length - 1] + '.' + array[array.length - 1];
            this.saveFile(url1, downloadDest);
        }else{
            downloadDest = `${RNFS.ExternalDirectoryPath  }/` + arrayName[arrayName.length - 1] + '.zip';
            this.saveFile(url1, downloadDest);

        }

    };


    saveFile(url1, downloadDest) {

        const options = {
            fromUrl: url1,
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
                console.log('successsss', res);
                console.log('file://' + downloadDest);
                Toast.message("保存成功");

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }

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

//查看图片
    _openImage = (formurl) => {

        console.log('formurl11-----------', formurl);
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={'zoomOut'}
                modal={false}
                ref={v => this.overlayPopView = v}
            >

                <View style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={{uri: formurl}}
                        indicator={Progress}
                        indicatorProps={{
                            size: 80,
                            borderWidth: 0,
                            color: 'rgba(150, 150, 150, 1)',
                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                        }}
                        style={{
                            width: SCREEN_WIDTH/1.5,
                            height: SCREEN_HEIGHT/1.5,
                        }}

                    />

                </View>

            </Overlay.PopView>
        );
        Overlay.show(overlayView);

    };


    closeDialog() {
        this.overlayPopView && this.overlayPopView.close();
    }

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {filename, webPath} = rowData.item.value;
        console.log('rowData.item.value-----------', rowData.item.value);
        let formurl = Config.baseApi + '/' + webPath;

        let array = formurl.split('.', formurl.length);
        let typeShou = false;
        if (array[array.length - 1]==='jpg' || array[array.length - 1]==='png' ){
            typeShou=true;
        }else{
            typeShou=false;
        }

        return (
            <View>
                <View style={{height: px2dp(15), backgroundColor: '#f5f5f5'}}></View>

                <View style={styles.contacts}>
                    <View style={{flexDirection: 'row', height: px2dp(80)}}>
                        <TouchableOpacity
                            activeOpacity={.8}
                            // onPress={ ()=>Actions.AddFirstRepayment({data:rowData.item.value,allData:this1.props.data,type1: "see",data1:this1.props})}
                            style={styles.leftText}>
                            <View style={{paddingLeft: px2dp(15)}}>
                                <Text style={{color: 'black', marginBottom: px2dp(1)}}>{filename}</Text>
                            </View>
                        </TouchableOpacity>


                            {typeShou? <View style={styles.leftText1}>
                                <Icon onPress={() => this1._openImage(formurl)} name="image-area"
                                      size={px2dp(38)} style={{marginRight: px2dp(25)}}/>
                                <Icon onPress={() => this1._openDelog(formurl)} name="arrow-down-bold-circle"
                                      size={px2dp(38)} style={{color: "#5cb4fc"}}/>
                            </View>: <View style={styles.leftText1}>
                                <Icon onPress={() => this1._openDelog(formurl)} name="arrow-down-bold-circle"
                                      size={px2dp(38)} style={{color: "#5cb4fc"}}/>
                            </View>}
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={'尽职调查报告'} back/>
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


});

