/**
 * Created by duansailong on 2018/3/6.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {Toast} from 'teaset';
import Title from '../../Component/Title';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from "react-native-vector-icons/Ionicons";
import Swipeout from 'react-native-swipeout'
/*=====企业联系人列表=====*/
export default class EnterpriseContactInfo extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: props.data,
            prodData: [],
            page: 0,
            total: 0,
        };

    }

    componentWillMount() {
        this._firstCusList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._firstCusList();
        }
    }

    /*第一次加载数据显示的内容*/
    _firstCusList() {
        let url = Config.baseApi + "/api/queryListRelationPersonEnterpriseRelationPerson.do?start=0&limit=10&eid=" + this.state.data.id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics, 0, responseText.totalProperty) : Toast.message("请检查网络");
            }
        })
    }

    _reachedKillUser = () => {
        let offsetValue = this.state.page * 10;
        if (offsetValue >= this.state.total) {
            return;
        }
        let url = Config.baseApi + "/api/queryListRelationPersonEnterpriseRelationPerson.do?start=" + offsetValue + "&limit=10&eid=" + this.state.data.id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message("请检查网络");
            }
        })
    };

    _border = () => {
        return <View style={{height:StyleSheet.hairlineWidth ,backgroundColor:'#ddd'}}/>;
    }

    _goDetail = (value)=> {
        let url = Config.baseApi + "/api/seeRelationPersonEnterpriseRelationPerson.do?id=" + value.id;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('流程页面', responseText);
                responseText.success ? Actions.MyContactInfoDetail({data: value}) : Toast.message(responseText.msg);
            }
        })
    }

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {id,relationName,relationFixedPhone,relationFamilyAddress} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=> {
                    this._deleteItem(id);
                },
            },
        ];
        return (
            <View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    right={swipeOutBtn}
                    disabled={this1.props.disabled}
                    rowID={rowID}
                    sectionID={sectionID}
                    autoClose={true}
                    backgroundColor={rowData.backgroundColor}
                    onOpen={(sectionID, rowID) => {}}
                    onClose={() => console.log('onClose') }
                    scroll={event => console.log('scroll event') }
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this._goDetail(rowData.item.value)}
                    >
                        <View style={{
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            height: px2dp(90),
                            alignItems: 'center',
                            paddingLeft: px2dp(20),
                            paddingRight: px2dp(20),
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{flex:1,textAlign: 'center'}}>{relationName}</Text>
                            <Text style={{flex:1,textAlign: 'center'}}>{relationFixedPhone}</Text>
                            <Text style={{flex:1,textAlign: 'center'}}>{relationFamilyAddress}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    /*删除企业联系信息*/
    _deleteItem(rowID) {
        console.log("aa", rowID)
        let url = Config.baseApi + "/api/deleteRelationPersonEnterpriseRelationPerson.do?id=" + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS() {
        Toast.message("删除成功");
        this._firstCusList();
    }

    /*分页进行解析数据*/
    _render = (list, page, totalCounts) => {
        let keys = page * 10;
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
            dataBlob.push({
                key: keys + index,
                value: item,
            });
            i++;
        });
        if (page === 0) {
            let offsets = this.state.page;
            offsets++;
            this.setState({
                prodData: dataBlob,
                total: totalCounts,
                page: offsets
            })
        } else {
            let arr = this.state.prodData;
            arr.push(...dataBlob);
            let offsets = this.state.page;
            offsets++;
            this.setState({
                prodData: arr,
                total: totalCounts,
                page: offsets,
            })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Title {...this.state.data} name={this.props.title} back rightText="md-add" onPress="AddContactInfo"/>
                <ScrollView
                    style={{flex:1,backgroundColor:'white'}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}>

                    <View style={{
                            flexDirection: 'row',
                            height: px2dp(60),
                            alignItems: 'center',
                            paddingLeft: px2dp(20),
                            paddingRight: px2dp(20),
                            justifyContent: 'space-around'}}>
                        <Text style={{flex:1,textAlign: 'center',color:'blue',fontSize:18}}>姓名</Text>
                        <Text style={{flex:1,textAlign: 'center',color:'blue',fontSize:18}}>电话</Text>
                        <Text style={{flex:1,textAlign: 'center',color:'blue',fontSize:18}}>地址</Text>
                    </View>
                    <FlatList
                        style={{flex:1,paddingBottom:px2dp(30)}}
                        horizontal={false}
                        data={this.state.prodData}
                        ItemSeparatorComponent={this._border}//底部线条
                        renderItem={this._renderRow.bind(this)}
                        ListHeaderComponent={<View/>}//表头
                        ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                        ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                        onEndReachedThreshold={0.2}
                        onEndReached={this._reachedKillUser}
                        numColumns={1}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})


