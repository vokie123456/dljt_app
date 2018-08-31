/**
 * Created by Administrator on 2018\8\6 0006.
 */
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
import Loading from '../../Component/Loading'
export default class BankContacts extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
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
            page: 0,
            visible:true
        })
        let url = Config.baseApi +  Config.twoApi.queryBankRelationPerson + "&start=0&limit=" + 21;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }

    _dialogAppUser1(customerName) {
        let url = Config.baseApi + Config.twoApi.queryBankRelationPerson + "&start=0&limit=" + 21 + "&bankname=" + customerName;
        this.setState({
            visible:true
        })
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }

    _reachedKillUser = () => {
        let offsetValue = this.state.page * 21;
        console.log('offsetValue', this.state.total);
        if (offsetValue >= this.state.total) {
            return;
        }
        this.setState({
            visible:true
        });
        let url = Config.baseApi +  Config.twoApi.queryBankRelationPerson +  "&start=" + offsetValue + "&limit=" + 21;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户列表', responseText);
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    };
    _render = (list, page, totalCounts) => {
        let keys = page * 21;
        let dataBlob = [];
        let i = 0;
        this.setState({
            visible:false
        });
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
        let {name, bankname, bankid,duty,email,blmtelephone} = rowData.item.value;
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
                    scroll={event => console.log('scroll event')}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            Actions.pop({
                                refresh: ({
                                    users:rowData.item.value,
                                    isRefresh:true
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
                            }}>{bankname}</Text>
                            <Text style={{
                                fontSize: px2dp(28),
                                color: '#999',
                                textAlign: 'center'
                            }}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    _search() {
        this.setState({page: 0})
        this._dialogAppUser1(this.state.customerName);
    }


    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back toPop/>
                <View style={styles.searchAll}>
                    <SearchInput onChangeText={(text) => this.setState({customerName: text})}
                                 style={{flex: 5, borderRadius: px2dp(15), height: px2dp(60)}}
                                 onSubmitEditing={() => this._search()}
                                 placeholder='请输入银行名称' returnKeyLabel="搜索" clearButtonMode='while-editing'/>
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
                <Loading visible={this.state.visible}/>
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



