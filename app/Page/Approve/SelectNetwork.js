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
    return(
        <View style={{
            backgroundColor: '#f5f5f5',
            flexDirection: 'row',
            height: px2dp(75),
            borderBottomWidth: hair,
            alignItems: 'center',
            paddingLeft: px2dp(20),
            paddingRight: px2dp(20),
            justifyContent: 'space-between'}}
        >
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d'}}>网点编号</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d'}}>网点名称</Text>
            <Text style={{fontSize: px2dp(28),color: '#0d0d0d'}}>负责人</Text>
        </View>
    )
}
export default class SelectNetwork extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:[],
            prodData: [],
            disabled: false,
        };
    }

    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }
    componentWillMount(){
    }
    _dialogAppUser (){
        let url = Config.baseApi + Config.applyApi.networkName;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('客户经理', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message(responseText.msg);
            }
        })
    }
    _render = (list) => {
        console.log("list",list);
        let dataBlob = [];
        let i = 0;
        list.map(function (item,index) {
            dataBlob.push({
                key: i,
                value: item,
            });
            i++;
        });
        this.setState({
            prodData:dataBlob
        })
    }

    _border = () => {
        return <View style={{marginLeft: px2dp(20),marginRight: px2dp(20),height:hair ,backgroundColor:'#c8c8c8'}}/>;
    }

    _renderRow=({item,index}) =>{
        const this1 = this;
        let {branchNO,linkman,orgName,orgId,orgSupId,orgType} = item.value;
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.state.disabled?'':this.setState({disabled: true},()=>{
                    Actions.pop({refresh:({
                        key1: orgName,//"key"
                        key2: orgId,//"value"
                        isRefresh1:true
                    })})
                })
                }
            >
                <View style={{flex: 1,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: px2dp(90),
                    alignItems: 'center',
                    paddingLeft: px2dp(20),
                    paddingRight: px2dp(20),
                    justifyContent: 'space-between'}}
                >
                    <Text style={{fontSize: px2dp(28),color: '#999'}}>{branchNO}</Text>
                    <Text style={{fontSize: px2dp(28),color: '#999'}}>{orgName}</Text>
                    <Text style={{fontSize: px2dp(28),color: '#999'}}>{linkman}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    _pop() {
        Actions.pop({refresh:({
            key1: orgName,//"key"
            key2: orgId,//"value"
            isRefresh1:true
        })})
    }
    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <TopTitle />
                <ScrollView
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
                        ListHeaderComponent={<View/>}//表头
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


