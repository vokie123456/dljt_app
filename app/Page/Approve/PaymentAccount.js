/**
 * Created by duansailong on 2018/3/9.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';

const TopTitle = () => {
    return (
        <View style={{
            backgroundColor: '#f5f5f5',
            flexDirection: 'row',
            height: px2dp(75),
            borderBottomWidth: hair,
            alignItems: 'center',
            paddingLeft: px2dp(20),
            paddingRight: px2dp(20),
            justifyContent: 'space-between'
        }}
        >
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d',width: px2dp(360),textAlign: 'center'}}>银行名称</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d',width: px2dp(220),textAlign: 'center'}}>网点名称</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d',width: px2dp(360),textAlign: 'center'}}>开户地区</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d',width: px2dp(280),textAlign: 'center'}}>开户名称</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d',width: px2dp(260),textAlign: 'center'}}>账号</Text>
        </View>
    )
}
export default class PaymentAccount extends Component {

    // 构造
    constructor(props) {
        console.log("》》》》》", props)
        super(props);
        // 初始状态
        this.state = {
            list: [],
            prodData: [],
        };
    }

    componentDidMount() {
        this._queryList();
    }

    _queryList() {
        let isEnterpriseStr = "0";
        if (this.props.data.oppositeType === "person_customer") {
            isEnterpriseStr = "1";
        }
        let url = Config.baseApi + Config.processApi.queryListEnterpriseBank + "&isEnterpriseStr=" + isEnterpriseStr + "&id=" + this.props.data.personId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics) : Toast.message("请检查网络连接");
            }
        })
    }

    _render = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        this.setState({
            prodData: dataBlob
        })
    }

    _border = () => {
        return <View style={{marginLeft: px2dp(20),marginRight: px2dp(20),height:hair ,backgroundColor:'#c8c8c8'}}/>;
    }

    _renderRow=({item,index}) =>{
        console.log("item.value",item.value)
        const this1 = this;
        let {accountnum,accountType,name,openType,bankname,bankOutletsName,areaName,id} = item.value;
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>Actions.pop({refresh:({
                    id,
                    accountNum:accountnum,
                    NAME:name,
                    accountType,
                    bankOutletsName,
                    openType,
                    areaName,
                    bankName: bankname,
                    isRefresh:true
                })})}
            >
                <View style={{
                    // flex: 1,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: px2dp(90),
                    alignItems: 'center',
                    paddingLeft: px2dp(20),
                    paddingRight: px2dp(20),
                    justifyContent: 'space-between'
                }}
                >
                    <Text
                        style={{fontSize: px2dp(28),color: '#999',width: px2dp(360),textAlign: 'center'}}>{bankname}</Text>
                    <Text
                        style={{fontSize: px2dp(28),color: '#999',width: px2dp(220),textAlign: 'center'}}>{bankOutletsName}</Text>
                    <Text
                        style={{fontSize: px2dp(28),color: '#999',width: px2dp(360),textAlign: 'center'}}>{areaName}</Text>
                    <Text
                        style={{fontSize: px2dp(28),color: '#999',width: px2dp(280),textAlign: 'center'}}>{name}</Text>
                    <Text
                        style={{fontSize: px2dp(28),color: '#999',width: px2dp(260),textAlign: 'center'}}>{accountnum}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <ScrollView
                    horizontal={true}
                    style={{flex:1,backgroundColor:'#f5f5f5'}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}>
                    <FlatList
                        style={{flex:1,paddingBottom:px2dp(30)}}
                        horizontal={false}
                        data={this.state.prodData}
                        ItemSeparatorComponent={this._border}//底部线条
                        renderItem={this._renderRow}
                        ListHeaderComponent={<TopTitle/>}//表头
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

})


