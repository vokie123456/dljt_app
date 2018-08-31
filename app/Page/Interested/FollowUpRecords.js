/**
 * Created by duansailong on 2018/3/6.
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
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';

export default class FollowUpRecords extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        console.log('------------------', props);
        // 初始状态
        this.state = {
            data1: props,
            data: props.data.prodData.perId,
            list: [],
            prodData: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._dialogAppUser();
        }
    }

    _dialogAppUser() {
        let url = Config.baseApi + Config.publicApi.listByPerId + "perId=" +this.state.data+'' ;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('跟进记录', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }

    _render = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
            dataBlob.push({
                key: index,
                value: item,
            });
            i++;
        });
        this.setState({
            prodData: dataBlob,
        });
    }

    _border = () => {
        return <View
            style={{marginLeft: px2dp(20), marginRight: px2dp(20), height: hair, backgroundColor: '#c8c8c8'}}/>;
    }

    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {followTitle, name, customerSystematics, followDate, followId, followInfo, followType,} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    this._deleteItem(followId);
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
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this._goDetail(rowData.item.value)}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            height: px2dp(90)
                        }}>
                            <View style={{marginLeft: px2dp(35)}}>
                                <Text style={{fontSize: px2dp(26), color: '#363636'}}>{name}</Text>
                                <Text style={{fontSize: px2dp(25), color: '#aaaaaa'}}>{followDate}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    fontSize: px2dp(26),
                                    marginRight: px2dp(20)
                                }}>{followType === 919 ? "电话跟进" : (followType === 920 ? "走访跟进" : followType === 921 ? "邮件跟进" : (followType === 922 ? "短信跟进" : ""))}</Text>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}
                                      style={{marginRight: px2dp(35)}}/>
                            </View>
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

    _goDetail(data) {
        Actions.FollowUpRecordsDetail({data: data});
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back type="add"/>
                <FlatList
                    style={{flex: 1, paddingBottom: px2dp(30)}}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow.bind(this)}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onRefresh={()=>this._dialogAppUser()}
                    refreshing={this.state.refreshing}
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
    }
})


