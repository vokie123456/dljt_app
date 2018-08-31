/*
 * 查看调查报告图片详情 ,SurveyReportJpg
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {AlbumView, Overlay} from 'teaset';
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
let {height, width} = Dimensions.get('window');
export default class SurveyReportJpg extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props", props);
        // 初始状态
        this.state = {
            prodData: [],
            imgList: [],
            imgList1: []

        };

    }

    componentDidMount() {
        this.setState({})
        this._seeInfo();//查询尽职调查报告
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            // this._seeInfo();//查询尽职调查报告
        }
    }

    _seeInfo() {
        // let url = Config.baseApi + Config.processApi.listsAppFile + '21111';
        let url = Config.baseApi + Config.processApi.listsAppFile + this.props.data.vars[0].projectId;
        if(this.props.businessType=='Guarantee'){
           url = Config.baseApi + Config.twoApi.listsAppFile + this.props.data.vars[0].projectId;
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
        console.log("list", this.state);
        let dataBlob = [];
        let dataBlob1 = [];
        let i = 0;
        // let url='http://172.16.10.59:8042/erp_zj_dljt/attachFiles/projFile/reportfolder/101_2018_0093/cs_document_templet.168/1530865043000_201807.jpg';
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
        this.state.prodData.map(function (item, index) {
            dataBlob1.push({
                uri: Config.baseApi + '/' + item.value.webPath,
                // uri:url ,
            });
            i++;
        });
        this.setState({
            imgList1: dataBlob1,
        })
        console.log("this,state", this.state);
    }

    onImagePress(index) {
        let pressView = this.refs['it' + index];
        pressView.measure((x, y, width, height, pageX, pageY) => {
            let overlayView = (
                <Overlay.PopView
                    style={{}}
                    containerStyle={{flex: 1}}
                    overlayOpacity={1}
                    type='custom'
                    customBounds={{x: pageX, y: pageY, width, height}}
                    ref={v => this.fullImageView = v}
                >
                    <AlbumView
                        style={{flex: 1}}
                        control={true}
                        images={this.state.imgList1}
                        // thumbs={this.state.imgList1}
                        defaultIndex={index}
                        onPress={() => this.fullImageView && this.fullImageView.close()}
                    />
                    <StatusBar animated={false} hidden={true}/>
                </Overlay.PopView>
            );
            Overlay.show(overlayView);
        });

    }

    _deleteItem(rowID) {
        let url = Config.baseApi + Config.processApi.delFile + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除还款来源', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS() {
        this._seeInfo();
        this._seeInfoDetail();
    }

    _seeInfoDetail() {
        let url = Config.baseApi + Config.processApi.getUploadedFileList + this.props.data.proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('重新查询材料份数', responseText);
                responseText.success ? this._render1(responseText.result, responseText.totals) : Toast.message("请检查网络连接");
            }
        })
    }

    _render1 = (list, size) => {
        console.log("list111111111111", list + "--------" + size)
        let url = Config.baseApi + Config.processApi.updateDataNum + "?slProcreditMaterials.datumNums=" + size + "&slProcreditMaterials.proMaterialsId=" + this.props.data.proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('修改贷款材料份数', responseText);
                responseText.success ? Toast.message("删除成功") : Toast.message("请检查网络连接");
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={'尽职调查报告'} back toPop/>
                <ScrollView
                    style={{flex: 1, backgroundColor: '#fff',}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',}}>
                        {this.state.prodData.map((item, index) => (
                            <View style={{
                                width: width / 3 - px2dp(20),
                                height: width / 3 - px2dp(20),
                                margin: px2dp(10),
                                paddingTop: px2dp(18),
                                paddingLeft: px2dp(7),
                                paddingRight: px2dp(7)
                            }} key={index}>
                                <TouchableOpacity
                                    style={{flex: 1}} ref={'it' + index}
                                    onPress={() => this.onImagePress(index)}
                                >
                                    <Image style={{borderRadius: px2dp(15), width: null, height: null, flex: 1}}
                                           source={{uri:Config.baseApi+"/"+item.value.webPath}}
                                           resizeMode='cover'/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._deleteItem(item.value.fileid)}
                                    style={{position: 'absolute', right: -px2dp(15), top: -px2dp(5)}}>
                                    {this.props.inputDisabled ? <View/> :
                                        <Icon name={'close-circle-outline'} size={28} color="#909090"/>}
                                </TouchableOpacity>
                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
})



