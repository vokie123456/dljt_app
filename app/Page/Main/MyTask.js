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
import Loading from '../../Component/Loading';
import {Button, SearchInput} from 'teaset';

export default class MyTask extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list: [],
            prodData: [],
            userIds: '',
            page: 0,
            total: 0,
            waiting: false,
            visible: false,
            projectName: '',//名称搜索
        };

    }

    componentDidMount() {
        this.setState({})
        this._repayment();//查询代办任务
    }

    componentWillMount() {
        this._asyncAppStatus();
    }

    //有回调刷新有bug暂时不用
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.isRefresh) {
    //         console.log("回调刷新")
    //         this._repayment();//查询代办任务
    //     }
    // }

    _asyncAppStatus = () => {
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            if (ret) {
                this.setState({
                    userIds: ret.tokenStr.userIds
                })
            }
        }).catch(err => {
            console.warn(err.message);
        })
    }
    //初始化查询
    _repayment (){
        storage.load({
            key: 'isLogin',
        }).then(ret => {
            console.log("index页登录信息", ret.tokenStr);
            if (ret) {
                this.setState({
                    total:0,
                    page:0,
                    visible: true
                })
                let url = Config.baseApi + Config.taskApi.taskUrl + "?processName=ALL&start=0&limit=" + 20;
                RTRequest.fetch1(url).then((responseText) => {
                    if (responseText) {
                        console.log('代办任务', responseText);
                        responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message("请联系管理员");
                    }
                })
            } else {
                Actions.Login();
            }
        }).catch(err => {
            console.warn(err.message);
        })
    } //初始化查询
    _repayment1(projectName) {
        storage.load({
            key: 'isLogin',
        }).then(ret => {
            console.log("index页登录信息", ret.tokenStr);
            if (ret) {
                this.setState({
                    visible: true
                })
                let url = Config.baseApi + Config.taskApi.taskUrl + "?processName=ALL&start=0&limit=" + 20 + "&projectName=" + projectName;
                RTRequest.fetch1(url).then((responseText) => {
                    if (responseText) {
                        console.log('代办任务', responseText);
                        responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
                    }
                })
            } else {
                Actions.Login();
            }
        }).catch(err => {
            console.warn(err.message);
        })
    }

    //分页查询
    _reachedKill = () => {
        let offsetValue = this.state.page * 20;
        console.log('offsetValue', this.state.total);
        if (offsetValue >= this.state.total) {
            return;
        }
        storage.load({
            key: 'isLogin',
        }).then(ret => {
            console.log("index页登录信息", ret.tokenStr);
            if (ret) {
                this.setState({
                    visible: true
                })
                let url = Config.baseApi + Config.taskApi.taskUrl + '?processName=ALL&start=' + offsetValue + '&limit=' + 20;
                RTRequest.fetch1(url).then((responseText) => {
                    if (responseText) {
                        console.log('代办任务', responseText);
                        responseText.success ? this._render(responseText.result, this.state.page, responseText.totalCounts) : Toast.message(responseText.msg);
                    }
                })
            } else {
                Actions.Login();
            }
        }).catch(err => {
            console.warn(err.message);
        })
    };
    _render = (list, page, totalCounts) => {
        this.setState({
            visible: false
        })
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

    _goDetail = (value) => {
        if(this.state.waiting){
            setTimeout(()=> {
                this.setState({waiting: false})
            }, 1500);//设置的时间间隔根据实际需要
            return;
        }
        this.setState({
            waiting: true
        })
        let url = Config.baseApi + Config.taskApi.getTaskUrl + '?taskId=' + value.taskId + '&activityName=' + value.activityName;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? Actions.MyTaskForm({
                    userIds: this.state.userIds,
                    taskId: value.taskId,
                    vars: responseText.vars,
                    activityName: value.activityName,
                    trans: responseText.trans,
                    newJs: responseText.newjs,
                    _repayment:()=>this._repayment()
                }) : Toast.message(responseText.msg);
            }
        })

    }
    _subStrNo = (recode1) => {
        let a = recode1.taskName;
        let b = a.split('-', a.length);
        return b[b.length - 1];
    }
    _subStrData = (recode1) => {
        let a = recode1.createTime;
        let b = a.split(' ', a.length);
        return '(' + b[0] + ')';
    }
    _subStr1 = (recode1) => {
        let a = recode1.taskName;
        let b = a.split('-', a.length);
        let arr = b[0].split(/[0,1,2,3,4,5,6,7,8,9]/);
        let c = b[0].split('月', b[0].length);
        return arr[0] + ' - ' + c[c.length - 1];
    }

    _border = () => {
        return <View style={{
            marginLeft: px2dp(29),
            marginRight: px2dp(29),
            height: StyleSheet.hairlineWidth,
            backgroundColor: '#c8c8c8'
        }}/>;
    }
    _renderRow = ({item, index}) => {
        const this1 = this;
        let {taskName, activityName, taskId, piId, assignee, createTime, dueDate, isMultipleTask} = item.value;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this._goDetail(item.value)}
            >
                <View style={{
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: px2dp(218),
                    paddingLeft: px2dp(29)
                }}>
                    <View style={{paddingTop: px2dp(35)}}>
                        <Text style={{
                            fontSize: px2dp(29),
                            fontWeight: '500',
                            color: '#363636'
                        }}>{this1._subStr1({taskName})}</Text>
                    </View>
                    <View style={{
                        paddingBottom: px2dp(15),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: px2dp(10)
                    }}>
                        <Text style={{fontSize: px2dp(23), color: '#999999'}}>{this1._subStrNo({taskName})}</Text>
                        <Icon name='ios-arrow-forward' size={px2dp(30)} style={{marginRight: px2dp(29)}}
                              color={'#999999'}/>
                    </View>
                    <View style={{paddingBottom: px2dp(37), flexDirection: 'row'}}>
                        <Text style={{fontSize: px2dp(26), color: '#999999'}}>当前节点：</Text>
                        <Text style={{fontSize: px2dp(26), color: '#508ef1'}}>{activityName}</Text>
                        <Text style={{
                            fontSize: px2dp(26),
                            color: '#999999',
                            marginLeft: 10
                        }}>{this1._subStrData({createTime})}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    _search=()=> {
        this.setState({page: 0})
        this._repayment1(this.state.projectName);//查询代办任务
    };

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View style={styles.searchAll}>
                    <SearchInput onChangeText={(text) => this.setState({projectName: text})}
                                 style={{flex: 5, borderRadius: px2dp(15), height: px2dp(60)}}
                                 onSubmitEditing={() => this._search()}
                                 placeholder='请输入搜索内容' returnKeyLabel="搜索" clearButtonMode='while-editing'/>
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
                    renderItem={this._renderRow}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onEndReachedThreshold={0.2}
                    onEndReached={this._reachedKill}
                    onRefresh={() => this._repayment()}
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
    searchAll: {
        flexDirection: 'row',
        padding: px2dp(20),
        paddingLeft: px2dp(35),
        borderBottomWidth: hair,
        borderBottomColor: '#ddd',
        paddingRight: px2dp(35),
        justifyContent: 'space-between',
    },
    searchStyle: {
        height: px2dp(60),
        backgroundColor: '#5bb2fb',
        borderColor: '#508ef1',
        marginLeft: px2dp(20),
        flex: 1,
    },
})


