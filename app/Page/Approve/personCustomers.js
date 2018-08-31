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
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(120), textAlign: 'center'}}>姓名</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(80), textAlign: 'center'}}>性别</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(80), textAlign: 'center'}}>年龄</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(180), textAlign: 'center'}}>出生日期</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(180), textAlign: 'center'}}>职务</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(180), textAlign: 'center'}}>证件类型</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(300), textAlign: 'center'}}>证件号码</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(200), textAlign: 'center'}}>手机号码</Text>
            <Text style={{fontSize: px2dp(28), color: '#0d0d0d', width: px2dp(200), textAlign: 'center'}}>家庭电话</Text>
        </View>
    )
}
export default class personCustomers extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list: [],
            prodData: [],
            page: 0,
            total: 0,
            disabled:false,
        };
    }

    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }

    _dialogAppUser() {
        this.setState({
            page: 0,
            total: 0
        })
        let url = Config.baseApi + Config.applyApi.queryPerson + "1&start=0&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('人员列表', responseText);
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }

    _reachedKillUser = () => {
        let offsetValue = this.state.page * 20;
        console.log('offsetValue', this.state.total);
        if (offsetValue >= this.state.total) {
            return;
        }
        let url = Config.baseApi + Config.applyApi.queryPerson + "1&start=" + offsetValue + "&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('人员列表', responseText);
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    };
    _render = (list, page, totalCounts) => {
        let keys = page * 20;
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

    _border = () => {
        return <View
            style={{marginLeft: px2dp(20), marginRight: px2dp(20), height: hair, backgroundColor: '#c8c8c8'}}/>;
    }

    _renderRow = ({item, index}) => {
        const this1 = this;
        let {id, marry, selfemail, postcode, postaddress, name, sexvalue, age, birthday, cardtypevalue, jobvalue, cardnumber, cardtype, cellphone, telphone, sex} = item.value;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.state.disabled ? '' : this.setState({disabled: true}, () => {
                    //公共页面！！！勿改
                    Actions.pop({
                        refresh: ({
                            id,
                            name1: name,
                            sex,
                            sexValue: sexvalue,
                            marry,
                            cardtype,
                            cardtypevalue,
                            cardNumber: cardnumber,
                            cellphone,
                            selfEmail: selfemail,
                            postcode,
                            postAddress: postaddress,
                            isRefresh1: true
                        })
                    })
                })}
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
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(120),
                        textAlign: 'center'
                    }}>{name}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(80),
                        textAlign: 'center'
                    }}>{sexvalue}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(80),
                        textAlign: 'center'
                    }}>{age}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(180),
                        textAlign: 'center'
                    }}>{birthday}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(180),
                        textAlign: 'center'
                    }}>{jobvalue}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(180),
                        textAlign: 'center'
                    }}>{cardtypevalue}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(300),
                        textAlign: 'center'
                    }}>{cardnumber}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(200),
                        textAlign: 'center'
                    }}>{cellphone}</Text>
                    <Text style={{
                        fontSize: px2dp(28),
                        color: '#999',
                        width: px2dp(200),
                        textAlign: 'center'
                    }}>{telphone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <ScrollView
                    horizontal = {true}
                    style={{flex:1,backgroundColor:'#f5f5f5'}}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={false}
                    scrollEventThrottle={20}
                >
                    <FlatList
                        style={{flex:1,paddingBottom:px2dp(30)}}
                        horizontal={false}
                        data={this.state.prodData}
                        ItemSeparatorComponent={this._border}//底部线条
                        renderItem={this._renderRow}
                        ListHeaderComponent={<TopTitle/>}//表头
                        ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                        ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                        onEndReachedThreshold={0.2}
                        onEndReached={this._reachedKillUser}
                        onRefresh={this._dialogAppUser}
                        refreshing={false}
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


