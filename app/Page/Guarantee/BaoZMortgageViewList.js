
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

export default class BaoZMortgageViewListGuarantee extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            prodData: [],
            data: props,
        };

    }
    componentDidMount() {
        this._seeInfo();//保证担保列表
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh) {
            this._seeInfo();//查询担保列表
        }
    }
    _seeInfo() {
        let url = Config.baseApi + Config.twoApi.findBZList  + this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }
    _render = (list) => {
        let dataBlob = [];
        let i = 0;
        if(!isEmpty(list)&&list.length>0){
            list.map(function (item) {
                dataBlob.push({
                    key: i,
                    value: item,
                });
                i++;
            });
        }
        this.setState({
            prodData:dataBlob,
        })
    }
    _deleteItem(rowID) {
        let url = Config.baseApi + Config.twoApi.deleteMortgage  + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS (){
        Toast.message("删除成功");
        this._seeInfo();
    }

    _goDetail = (value,data,aa)=> {
        if(value.personTypeId == 602){
            Actions.CustomerMortgageDetailGuarantee({data: data,personstype:value,props:aa});
        }else if(value.personTypeId == 603){
            Actions.PersonMortgageDetailGuarantee({data: data,personstype:value,props:aa})
        }
    }
    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {id,assuremodeidValue,personTypeValue,assureofnameEnterOrPerson,} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
                    //Toast.message("暂不支持")
                    this._deleteItem(id);
                },
            },
        ];
        return (
            <View>
                <View style={{height: px2dp(15),backgroundColor: '#f5f5f5'}}></View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    right={swipeOutBtn}
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
                            onPress={()=>this._goDetail(rowData.item.value,this.props.data,this.props)}
                        >
                            <View
                                style={styles.leftText}>
                                <View style={{paddingLeft: px2dp(15)}}>
                                    <Text style={{color: 'black',marginBottom: px2dp(1)}}>{assureofnameEnterOrPerson}</Text>
                                    <Text>{personTypeValue}</Text>
                                </View>
                            </View>
                            <View style={styles.leftText1}>
                                <Text style={{fontSize: px2dp(29),color: '#ff4800',paddingRight: px2dp(15)}}>{assuremodeidValue}</Text>
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
                <Title name={this.props.title} rightText={this.props.inputDisabled?"":"md-add"} back onPress="BaoZMortgageViewDetailGuarantee" type="add" {...this.props.data}/>
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


