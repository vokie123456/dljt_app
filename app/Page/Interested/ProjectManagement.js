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
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Loading from '../../Component/Loading'
import {Button, SearchInput} from 'teaset';
export default class ProjectManagement extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:[],
            prodData: [],
            page:0,
            total:0,
            visible: false,
            customerName: '',//名称搜索
            waiting: false,//防止多次重复点击
            isGranted: false,//权限
        };
    }

    componentDidMount() {
        this._isGranted();
    }
    _isGranted (){
        let curUserInfo = '';
        storage.load({
            key: 'curUserInfo',
        }).then(ret => {
            console.log("index页登录信息", ret);
            if (ret) {
                curUserInfo = ret.tokenStr;
                if(curUserInfo.rights.indexOf('__ALL')!=-1){
                    this.setState({
                        isGranted: true
                    })
                }
                //根据传的参数判断权限
                // var rights = curUserInfo.rights;
                // var arr=rights.split(",");
                // for(var i=0;i<arr.length;i++){
                //     if(funKey.trim()==arr[i].trim()){
                //         this.setState({
                //             isGranted: true
                //         })
                //     }
                // }
            }
        }).catch(err => {
            console.warn(err.message);
        }).then(()=>{
            console.log("adsfadsfasf",this.state)
            this._dialogAppUser('');
        })
    }
    _dialogAppUser (name){
        this.setState({
            total:0,
            page:0,
            visible:true
        })
        setTimeout(()=> {
            this.setState({waiting: false})
        }, 3000);//设置的时间间隔根据实际需要
        let url = Config.baseApi + Config.taskApi.projectList+'&isGrantedShowAllProjects='+this.state.isGranted+'&start=0&limit='+8+"&Q_projectName_S_LK="+name;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result,this.state.page,responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    }
    _render = (list,page,totalCounts) => {
        console.log("----------------------------",list);
        this.setState({
            visible: false,
        })
        let keys = page * 8;
        let dataBlob = [];
        let i = 0;
        list.map(function (item,index) {
            dataBlob.push({
                key: keys+index,
                value: item,
            });
            i++;
        });
        if(page === 0){
            let offsets = this.state.page;
            offsets++;
            this.setState({
                prodData:dataBlob,
                total:totalCounts,
                page:offsets
            })
        }else{
            let arr = this.state.prodData;
            arr.push(...dataBlob);
            let offsets = this.state.page;
            offsets++;
            this.setState({
                prodData:arr,
                total:totalCounts,
                page:offsets,
            })
        }
    }

    _getName(name){
        var arr = /^\D+(?=\d)/.exec(name);
        return arr;
    }
    _getNa(subject){
        var arr=subject.split('-');
        return arr[arr.length-1];
    }
    _subStr2 = (recode1)=>{
        let b = recode1.substr(0,10);
        return b;
    }
    _border = () => {
        return <View style={{height:StyleSheet.hairlineWidth ,backgroundColor:'#ddd'}}/>;
    }
    _renderRow(rowData) {
        const this1 = this;
        let {businessType,createtime,subject,activityName} = rowData.item.value;
        return (
            <View style={{borderBottomWidth:hair, paddingTop: px2dp(30)}}>
                <View style={styles.textTop}>
                    <Text style={{fontSize: px2dp(29), color: '#363636'}}>{this1._getName(subject)+'-'+Tool.isBusinessType(businessType)}</Text>
                </View>
                <View style={styles.textCenter}>
                    <Text style={{fontSize: px2dp(23), color:'#999999'}}>{this1._getNa(subject)}</Text>
                </View>
                <View style={styles.textBottom}>
                    <Text style={{fontSize: px2dp(26), color: '#508ef1'}}>{'当前节点 : '}</Text>
                    <Text style={{fontSize: px2dp(26), color: '#999999'}}>{isEmpty(activityName)?"已完成":activityName}</Text>
                    <Text style={{fontSize: px2dp(26), color: '#508ef1',paddingLeft: px2dp(8),}}>{'('+this._subStr2(createtime)+')'}</Text>
                </View>
            </View>
        );
    }
    _reachedKillUser = (name) =>{
        let offsetValue = this.state.page * 8;
        console.log('offsetValue',this.state.total);
        if(offsetValue >= this.state.total){
            return;
        }
        let url = Config.baseApi + Config.taskApi.projectList+'&isGrantedShowAllProjects='+this.state.isGranted+"&start="+offsetValue+"&limit="+8+"&Q_projectName_S_LK="+name;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result,this.state.page,responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    };
    _search() {
        this.setState({
            page: 0,
            waiting:true
        })
        this._dialogAppUser(this.state.customerName);
    }
    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back onPress="ConvertOfficialAccountP" />
                <View style={styles.searchAll}>
                    <SearchInput
                        onChangeText={(text)=>this.setState({customerName:text})}
                        style={{flex: 5,borderRadius: px2dp(15), height: px2dp(60)}}
                        onSubmitEditing={()=>this._search()}
                        placeholder='请输入项目名称' returnKeyLabel="搜索" clearButtonMode='while-editing' />
                    <Button
                        disabled={this.state.waiting}
                        style={styles.searchStyle} title='搜索' type='primary'
                        onPress={()=>this._search()}
                    />
                </View>
                <FlatList
                    style={{flex:1,paddingBottom:px2dp(30)}}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow.bind(this)}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onEndReachedThreshold={0.2}
                    onEndReached={()=>this._reachedKillUser(this.state.customerName)}
                    onRefresh={()=>this._dialogAppUser('')}
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
        backgroundColor :'#5bb2fb',
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
    textTop: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(60), paddingLeft: px2dp(20),
        paddingBottom: px2dp(25)
    },
    textCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(60),
        paddingLeft: px2dp(20),
        paddingBottom: px2dp(25)
    },
    textBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(60),
        paddingLeft: px2dp(20),
        paddingBottom: px2dp(37),
    }
})


