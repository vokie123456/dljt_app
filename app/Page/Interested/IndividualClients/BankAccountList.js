'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Image
} from 'react-native'
import Title from '../../../Component/Title';
import SwipeOut from 'react-native-swipeout';
import ListFooter from '../../../Common/ListFooter';
import ListEmpty from '../../../Common/ListEmpty';
import Icon from "react-native-vector-icons/Ionicons";
import {Button, SearchInput} from 'teaset';

const Tou = (props) => {
    return (
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
            <Text style={{fontSize: px2dp(30), color: 'blue', flex: 1, textAlign: 'center'}}>{'银行名称'}</Text>
            <Text style={{fontSize: px2dp(30), color: 'blue', flex: 1, textAlign: 'center'}}>{'网点名称'}</Text>
            <Text style={{fontSize: px2dp(30), color: 'blue', flex: 1, textAlign: 'center'}}>{'开户地区'}</Text>
        </View>
    )
};

export default class BankAccountList extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            list: [],
            propData: [],
            page: 0,
            total: 0,
        };
    }
    componentWillMount(){
        this._getContactListData();
    }

    componentDidMount() {
        this.setState({});
        this._getContactListData();
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProp777777777777", nextProps.isRefresh);
        if (nextProps.isRefresh) {
            this._getContactListData()
        }
    }

    _getContactListData = () => {
        let url = Config.baseApi + Config.publicApi.queryList + '?id=' + this.state.id + '&start=0&limit=' + 10 + '&isEnterpriseStr=' + 1 + '&isInvest=0';
        RTRequest.fetch1(url).then((responseText) => {
            console.log('银行列表+++++++++++++++++++++', responseText);
            responseText.success ? this._parsingList(responseText.topics) : Toast.message(responseText.msg)
        })
    };

    //行间分割线
    _border = () => {
        return <View style={{height: hair, backgroundColor: '#ddd'}}/>;
    };

    //解析数组
    _parsingList = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
            dataBlob.push({
                key: index,
                value: item
            });
            i++;
        });
        this.setState({
            propData: dataBlob,
        })
    };

    //编辑行样式
    _renderItem = (rowData, rowID, sectionID) => {
        let this1 = this;
        //银行名称、网点名称、开户地区
        const {bankname, bankOutletsName, areaName, id} = rowData.item.value;
        const swipeOutButton = [
            {
                text:'删除',
                type:'delete',
                onPress: () => {
                    this1._deleteItem(id)
                }
            }
        ];
        console.log('传过去的值++++++++++++++++', this.state.propData, 'fjeiwofjoweifjewifjwofjwioefewofwefijiwe', rowData.item.value)
        return (
            <View>
                <SwipeOut
                    close={!(this1.state.sectionID === sectionID && this1.state.rowID === rowID)}
                    right={swipeOutButton}
                    disabled={this1.state.disabled}
                    rowID={rowID}
                    sectionID={sectionID}
                    autoClose={true}
                    backgroundColor={rowData.backgroundColor}
                    onOpen={(rowID, sectionID) => {

                    }}
                    onClose={() => console.log('关闭了')}
                    scroll={event => console.log('滑动了')}
                >
                    <TouchableOpacity
                        // onPress={() => this1._goDetail(rowData.item.value)}
                        onPress={ ()=>Actions.BankAccountInformation({data:rowData.item.value, type1: "see",data1:this.props})}
                        activeOpacity={0.8}
                    >
                        <View style={{
                            // flex: 1,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            height: px2dp(180),
                            alignItems: 'center',
                            paddingLeft: px2dp(20),
                            paddingRight: px2dp(20),
                            justifyContent: 'space-between'
                        }}
                        >
                            <Text style={{flex: 1, textAlign: 'center', width: 100}} lineNumber={0}>{bankname}</Text>
                            <Text style={{flex: 1, textAlign: 'center'}}>{bankOutletsName}</Text>
                            <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                <Text style={{
                                    textAlign: 'center',
                                    paddingRight: 10,
                                    color: '#999',
                                    fontSize: px2dp(28),
                                    width: 100
                                }} lineNumber={0}>{areaName}</Text>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}
                                      style={{marginRight: px2dp(35)}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </SwipeOut>
            </View>
        )
    };

    //点击跳转到联系人详情表
    // _goDetail = (value) => {
    //     console.log('银行信息=============value', value);
    //     Actions.BankAccountInformation({data: value, type1: "see"});
    // };

    _deleteItem(rowID) {
        let url = Config.baseApi + Config.publicApi.deleteEnterpriseBank + '?id=' + rowID;
        console.log("————————————————————————————",url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除个人客户', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS(msg) {
        Toast.message("删除成功");
        // if (this.props.isRefresh){
        //     this._getContactListData()
        // }
        this._getContactListData()
    }


    render() {
        return (
            <View style={styles.container}>
                <Title {...this.props} name={'银行列表'} rightText={"md-add"} back onPress="BankAccountInformation"
                       type="add"/>
                <Tou/>
                <ScrollView>
                    <FlatList
                        style={{flex: 1, paddingBottom: px2dp(30)}}
                        horizontal={false}
                        data={this.state.propData}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._border}//底部线条
                        ListHeaderComponent={<View/>}//表头
                        ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                        ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                        onRefresh={() => this._getContactListData()}
                        refreshing={false}
                        numColumns={1}
                    />
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    }
});