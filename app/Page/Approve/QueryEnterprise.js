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
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from "react-native-vector-icons/Ionicons";
import Swipeout from 'react-native-swipeout'
import {SearchInput, Button} from 'teaset'
/*企业客户信息里列表*/
export default class QueryEnterprise extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list: [],
            prodData: [],
            isShow: '',
            page: 0,
            total: 0,
            enterpriseName: '',//名称搜索

            disabled:false,
        };

    }

    componentDidMount() {
        this.setState({})
        this._interestedCusList("");
    }

    componentWillMount() {

    }

    _interestedCusList(enterpriseName) {
        this.setState({page: 0, total: 0});
        let url = Config.baseApi + Config.processApi.queryEnterpriseInfoList + "?&isAll=true&start=0&limit=" + 20 + "&enterprisename=" + enterpriseName;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('企业客户列表', responseText);
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }

    _reachedKillUser = () => {
        //this.setState({page:0,total:0});
        let offsetValue = this.state.page * 20;
        console.log('offsetValue', this.state.total);
        if (offsetValue >= this.state.total) {
            return;
        }
        let url = Config.baseApi + Config.processApi.queryEnterpriseInfoList + "?&isAll=true&start=" + offsetValue + "&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('企业客户列表', responseText);
                responseText.success ? this._render(responseText.topics, this.state.page, responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    };
    _goDetail = (value) => {
        //console.log("value",value);
        //Actions.InterestedBuyersDetail(value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            console.log("zoule");
        }
    }

    _border = () => {
        return <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>;
    }

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {enterprisename, id} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    this._deleteItem(id);
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
                    disabled={false}
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

                        onPress={() => this.state.disabled ? '' : this.setState({disabled: true}, () => {
                            Actions.pop({
                                refresh: ({
                                    isRefresh: true,
                                    popData: rowData.item.value
                                })
                            })
                        })}
                    >
                        < View style={{
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
                                style={{fontSize: px2dp(28), color: '#999', width: px2dp(600)}}>{enterprisename}</Text>
                            <Icon name={'ios-arrow-forward'} color={'#757575'} size={20}
                                  style={{marginRight: px2dp(35)}}/>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    _deleteItem(rowID) {
        console.log(rowID, 11111);
        let url = Config.baseApi + "/api/ajaxDeleteEnterpriseWithIdEnterprise.do?listId=" + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除还款来源', responseText);
                responseText.success ? Toast.message("删除成功") : Toast.message("请检查网络连接");
            }
        })
    }

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

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back />
                {/*<Title name={this.props.title} back rightText="md-add" onPress="EnterpriseLegalInfo"/>*/}
                <View style={styles.searchAll}>
                    <SearchInput onChangeText={(text) => this.setState({enterpriseName: text})}
                                 style={{flex: 5, borderRadius: px2dp(15), height: px2dp(60)}}
                                 onSubmitEditing={() => this._search()}
                                 placeholder="请输入企业名称" returnKeyLabel="搜索" clearButtonMode='while-editing'/>
                    <Button
                        style={styles.searchStyle} title='搜索' type='primary'
                        onPress={() => this._search()}
                    />
                </View>
                {/*下拉刷新与ScrollView冲突*/}
                {/*   <ScrollView
                 //    style={{flex:1,backgroundColor:'#f5f5f5'}}
                 //    showsVerticalScrollIndicator={false}
                 //    scrollsToTop={false}
                 //    scrollEventThrottle={20}> */}
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
                    onEndReached={this._reachedKillUser}
                    onRefresh={() => this._interestedCusList('')}
                    refreshing={false}
                    numColumns={1}
                />
                {/*  </ScrollView>*/}
            </View>
        )
    }

    _search = () => {
        this.setState({page: 0});
        this._interestedCusList(this.state.enterpriseName)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }

})


