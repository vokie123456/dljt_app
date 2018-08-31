/**
 * Created by Administrator on 2018\8\9 0009.
 */
/**
 * Created by duansailong on 2018/3/8.
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
import { AlbumView, Overlay} from 'teaset';
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
let {height, width} = Dimensions.get('window');
import Loading from '../../Component/Loading'
export default class GuaranteeMaterial2 extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props",props)
        // 初始状态
        this.state = {
            prodData: [],
            imgList: [],
            imgList1 : [],
            visible: false,

        };

    }
    componentDidMount() {
        this.setState({})
        this._seeInfo();//查询还款来源
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh) {
            // this._seeInfo();//回调查询还款来源
        }
    }
    _seeInfo() {
        this.setState({
            visible: true
        })
        let url = Config.baseApi + Config.processApi.getFileListExt+this.props.data.proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询担保材料清单详情', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }
    _render = (list) => {
        console.log("list",list);
        console.log("list",this.state);
        let dataBlob = [];
        let dataBlob1 = [];
        let i = 0;
        list.map(function (item,index) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        this.setState({
            prodData:dataBlob,
        })
        this.state.prodData.map(function (item,index) {
            dataBlob1.push({
                uri: Config.baseApi+'/'+item.value.filepath,
            });
            i++;
        });
        this.setState({
            visible: false,
            imgList1:dataBlob1,
        })
        console.log("this,state",this.state);
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
                    <StatusBar animated={false} hidden={true} />
                </Overlay.PopView>
            );
            Overlay.show(overlayView);
        });

    }
    _deleteItem(rowID) {
        let url = Config.baseApi + Config.processApi.delFile  + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除还款来源', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS (){
        this._seeInfo();
        this._seeInfoDetail();
    }
    _seeInfoDetail() {
        let url = Config.baseApi + Config.processApi.getUploadedFileList + this.props.data.proMaterialsId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('重新查询材料份数', responseText);
                responseText.success ? this._render1(responseText.result,responseText.totals) : Toast.message("请检查网络连接");
            }
        })
    }
    _render1 = (list,size) => {
        console.log("list111111111111",list+"--------"+size)
        let url = Config.baseApi + Config.processApi.updateDataNum + "?slProcreditMaterials.datumNums="+size+"&slProcreditMaterials.proMaterialsId=" + this.props.data.proMaterialsId;
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
                <Title name={this.props.title} back toPop/>
                <ScrollView
                    style={{flex:1,backgroundColor:'#fff',}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}>
                    <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start',}}>
                        {this.state.prodData.map((item, index) => (
                            <View style={{width: width/3-px2dp(20), height: width/3-px2dp(20), margin: px2dp(10),paddingTop: px2dp(18),paddingLeft:px2dp(7),paddingRight:px2dp(7)}} key={index}>
                                <TouchableOpacity
                                    style={{flex: 1}} ref={'it' + index}
                                    onPress={() => this.onImagePress(index)}
                                >
                                    <Image style={{borderRadius: px2dp(15),width: null, height: null, flex: 1}} source={{uri:Config.baseApi+"/"+item.value.compressionFilePath}} resizeMode='cover' />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this._deleteItem(item.value.fileid)}
                                    style={{position: 'absolute',right: -px2dp(15),top: -px2dp(5)}} >
                                    {this.props.inputDisabled?<View/>:<Icon name={'close-circle-outline'} size={28} color="#909090"/>}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <Loading visible={this.state.visible}/>
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



