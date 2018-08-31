/**
 * Created by duansailong on 2018/3/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FirstRepayment extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("",props.data)
        // 初始状态
        this.state = {
            prodData: [],
            data: props,
            sumMoney:0
        };

    }
    componentDidMount() {
        this.setState({})
        this._seeInfo();//查询还款来源
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh) {
            this._seeInfo();//回调查询还款来源
        }
    }
    _seeInfo() {
        let url = Config.baseApi + Config.processApi.seeSlRepaymentSource  + this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询还款来源', responseText);
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
        console.log('*&*&*&*&*&*&*&*&*&*&*&*&*&*', dataBlob);
        let sumMoney = 0;
        for (let i = 0; i < dataBlob.length; i++) {
            sumMoney += dataBlob[i].value.money
        }
        this.setState({
            prodData:dataBlob,
            sumMoney:sumMoney,
        })
    }
    _deleteItem(rowID) {
        let url = Config.baseApi + Config.processApi.delSlRepaymentSource  + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除还款来源', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS (){
        Toast.message("删除成功");
        this._seeInfo();//回调查询还款来源
    }
    _renderRow = (rowData, sectionID, rowID) => {
        const this1 = this;
        let {money,remarks,repaySourceDate,sourceId,typeId,typeName} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
                    this._deleteItem(sourceId);
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
                    // right={this.state.btnsTypes}
                    right={swipeOutBtn}
                    // right={this.state.btnsTypes}
                    disabled={this1.props.inputDisabled}
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
                            onPress={ ()=>Actions.AddFirstRepayment({data:rowData.item.value,allData:this1.props.data,type1: "see",data1:this1.props})}>
                            <View style={styles.leftText}>
                                <View style={{paddingLeft: px2dp(15)}}>
                                    <Text style={{color: 'black',marginBottom: px2dp(10), fontSize:px2dp(28)}}>{typeName}</Text>
                                    <Text style={{color: '#999', fontSize:14 }}>{repaySourceDate}</Text>
                                </View>
                            </View>
                            <View style={styles.leftText1}>
                                <Text style={{fontSize: px2dp(29),color: '#ff4800',paddingRight: px2dp(15)}}>{money}元</Text>
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
                <Title name={this.props.title} rightText={this.props.inputDisabled?"":"md-add"} back onPress="AddFirstRepayment" type="add" {...this.props.data}/>
                <ImageBackground
                    resizeMode={"stretch"}
                    style={{height: px2dp(250)}} source={Images.firstPay}>
                    <View style={{justifyContent: 'center',alignItems: 'center',flex: 1}}>
                        <Text style={{ color: '#ff4800', fontSize: px2dp(30),}}>{this.state.sumMoney}</Text>
                    </View>
                </ImageBackground>
                <FlatList
                    style={styles.listStyle}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow}
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
        // paddingBottom:px2dp(30),
        backgroundColor: '#f5f5f5',
        // paddingLeft: px2dp(15),
        // paddingRight: px2dp(15),
    },
})


