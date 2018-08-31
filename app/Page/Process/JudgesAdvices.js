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
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/Ionicons';

export default class JudgesAdvices extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props----------",props)
        // 初始状态
        this.state = {
            prodData: [],
            data: props,
        };

    }
    componentDidMount() {
        this.setState({})
        this._seeInfo();//查询还款来源
    }
    _seeInfo() {
        let url = Config.baseApi + Config.processApi.findListByRunId + this.props.data.data.vars[0].runId ;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('评审会意见', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }
    _render = (list) => {
        console.log("list",list);
        let dataBlob = [];
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
    }
    _renderRow(rowData, sectionID, rowID) {
        console.log('props++++++--------++++++++++',this.props)
        const this1 = this;
        let businessType1='其他业务';
        let {voteName,voteTime,activityName} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
                    this._deleteItem(actualChargeId);
                },
            },
            // { text: 'Primary',    type: 'primary',   },
            // { text: 'Secondary',  type: 'secondary', },
        ];
        return (
            <View>
                <View style={{height: px2dp(15),backgroundColor: '#f5f5f5'}}></View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    // left={rowData.left}
                    right={swipeOutBtn}
                    // right={this.state.btnsTypes}
                    disabled={true}
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
                        <TouchableOpacity
                            style={{flexDirection: 'row',height: px2dp(100)}}
                            activeOpacity={.8}
                            onPress={()=>Actions.JudgesAdvicesDetail({data: rowData.item.value})}
                        >
                            <View
                                style={styles.leftText}>
                                <View style={{paddingLeft: px2dp(15)}}>
                                    <Text style={{color: 'black',marginBottom: px2dp(1)}}>{voteName}</Text>
                                    <Text>{voteTime}</Text>
                                </View>
                            </View>
                            <View style={styles.leftText1}>
                                <Text style={{fontSize: px2dp(28),color: '#ff4800',paddingRight: px2dp(15)}}>{activityName}</Text>
                                <Icon name="ios-arrow-forward" size={px2dp(38)}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Swipeout>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} rightText={this.props.inputDisabled?"":"md-add"} back onPress="AddCommissionList" type="add" {...this.props.data}/>
                <ScrollView
                    style={{flex:1,backgroundColor:'#f5f5f5',}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}>
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
                </ScrollView>
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
})



