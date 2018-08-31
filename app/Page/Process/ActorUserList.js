/*
 * 处理人 ,ActorUserList
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
import Swipeout from 'react-native-swipeout';
import {Button, SearchInput} from 'teaset';
import {NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';

export default class ActorUserList extends Component {

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
            refreshing: false,
            customerName: '',//名称搜索
        };
    }

    componentDidMount() {
        this.setState({});
        this._dialogAppUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._dialogAppUser();
        }
    }

    _dialogAppUser() {
        this.setState({
            total: 0,
            page: 0
        })
        let url = Config.baseApi +  Config.applyApi.dialogAppUser + "?start=0&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    }

    _dialogAppUser1(customerName) {
        let url = Config.baseApi + Config.applyApi.dialogAppUser + "?start=0&limit=" + 20 + "&Q_fullname_S_LK=" + customerName;
        console.log("aaaa---------------", url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    }

    _reachedKillUser = () => {
        let offsetValue = this.state.page * 20;
        console.log('offsetValue', this.state.total);
        if (offsetValue >= this.state.total) {
            return;
        }
        let url = Config.baseApi + Config.applyApi.dialogAppUser + "?start=" + offsetValue + "&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户列表', responseText);
                responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
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

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {fullname, userNumber, userId,} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    // this._deleteItem(perId);
                },
            },
            // { text: 'Primary',    type: 'primary',   },
            // { text: 'Secondary',  type: 'secondary', },
        ];
        return (
            <View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    // left={rowData.left}
                    right={swipeOutBtn}
                    disabled={this1.props.disabled}
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
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            Actions.pop({
                                refresh: ({
                                    key1: fullname,//"超管"
                                    key2: userId,//"1"
                                    key3: userNumber,//"1"
                                    isRefresh2:true
                                })
                            })
                        }}
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
                                textAlign: 'center'
                            }}>{fullname}</Text>
                            <Text style={{
                                fontSize: px2dp(28),
                                color: '#999',
                                textAlign: 'center'
                            }}>{userNumber}</Text>
                        </View>

                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    _deleteItem(rowID) {
        return;
        let url = Config.baseApi + Config.processApi.delSlRepaymentSource + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除还款来源', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }

    _search() {
        this.setState({page: 0})
        this._dialogAppUser1(this.state.customerName);
    }


    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} toPop/>
                <View style={styles.searchAll}>
                    <SearchInput onChangeText={(text) => this.setState({customerName: text})}
                                 style={{flex: 5, borderRadius: px2dp(15), height: px2dp(60)}}
                                 onSubmitEditing={() => this._search()}
                                 placeholder='请输入客户名称' returnKeyLabel="搜索" clearButtonMode='while-editing'/>
                    <Button
                        style={styles.searchStyle} title='搜索' type='primary'
                        onPress={() => this._search()}
                    />
                </View>
                <FlatList
                    style={{flex: 1, paddingBottom: px2dp(30)}}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow.bind(this)}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onEndReachedThreshold={0.2}
                    // onEndReached={()=>this._reachedKillUser()}
                    onEndReached={this._reachedKillUser}
                    onRefresh={() => this._dialogAppUser()}
                    refreshing={false}
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
    searchStyle: {
        height: px2dp(60),
        backgroundColor: '#5bb2fb',
        borderColor: '#539af4',
        marginLeft: px2dp(20),
        flex: 1,
    },
    searchAll: {
        flexDirection: 'row',
        padding: px2dp(20),
        paddingLeft: px2dp(35),
        borderBottomWidth: hair,
        borderBottomColor: '#ddd',
        paddingRight: px2dp(35),
        justifyContent: 'space-between',
    },
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),
    },
})



