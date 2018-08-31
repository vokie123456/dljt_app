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
import {NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Loading from '../../Component/Loading'

const Title1 = (props) => {
    return (
        <LinearGradient start={{x: 0, y: 1}}
                        end={{x: 1, y: 0}} colors={[props.transparent ? 'transparent' : '#5fbfff',
            props.transparent ? 'transparent' : '#4f8ff1',]}
                        style={styles.linearGradient}>
            <NavigationBar title={
                <Text style={{fontSize: px2dp(34), color: '#fff'}}>{props.name ? props.name : '没写标题'}</Text>
            }
                           leftView={
                               props.back ? <TouchableOpacity style={{
                                   paddingLeft: px2dp(27), flexDirection: 'row',
                                   alignItems: 'center'
                               }}
                                      onPress={() =>
                                          Actions.pop({
                                              refresh: ({
                                                  isRefresh: isEmpty(props.toPop) ? false : true,
                                                  date1: new Date()
                                              })
                                          })
                                      }>
                                   <Icon name='ios-arrow-back' size={px2dp(50)} color={'#fff'}/>
                                   <Text style={{color: 'transparent',fontSize: px2dp(28),marginLeft: px2dp(12)}}>返回</Text>
                               </TouchableOpacity> : <View/>
                           }
                           rightView={
                               props.rightText ?
                                   <TouchableOpacity
                                       onPress={() => {
                                           props.onPress && Actions[props.onPress]({
                                               type1:(isEmpty(props.type)?"":props.type),
                                               allData:props,
                                               data1: ''});
                                       }}>
                                       {/*<Text style={{color: '#fff', fontSize: px2dp(28)}}>{props.rightText}</Text>*/}
                                       <Icon name={props.rightText} style={{marginRight: px2dp(27)}} size={px2dp(45)} color={'#ffffff'}/>
                                   </TouchableOpacity> : <View/>
                           }

                           style={{height: px2dp(130), backgroundColor: 'transparent'}}
                           statusBarStyle='light-content'
            />
        </LinearGradient>
    )
};

export default class InterestedBuyers extends Component {

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
    _dialogAppUser (){
        this.setState({
            total:0,
            page:0,
            visible:true
        })
        let url = Config.baseApi + Config.publicApi.interestedBuyers + "start=0&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    }
    _dialogAppUser1 (customerName){
        this.setState({
            visible:true
        })
        let url = Config.baseApi + Config.publicApi.interestedBuyers + "start=0&limit=" + 20 + "&customerName=" + customerName;
        console.log("aaaa---------------",url);
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
        this.setState({
            visible:true
        });
        let url = Config.baseApi + Config.publicApi.interestedBuyers + "start=" + offsetValue + "&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户列表', responseText);
                responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    };
    _render = (list, page, totalCounts) => {
        this.setState({
            visible:false
        });
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
        let {customerName, customerType, perId,} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    this._deleteItem(perId);
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
                            Actions.InterestedBuyersDetail({perId: perId})
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
                            }}>{customerName}</Text>
                            <Text style={{
                                fontSize: px2dp(28),
                                color: '#999',
                                width: px2dp(80),
                                textAlign: 'center'
                            }}>{customerType == 1 ? "企业" : "个人"}</Text>
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
                <Title1 name={this.props.title} back rightText="md-add" onPress="AddPerson"
                       type="add" {...this.props.prodData}/>
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


