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
import Title from '../../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../../Common/ListFooter';
import ListEmpty from '../../../Common/ListEmpty';
import Icon from "react-native-vector-icons/Ionicons";
import Loading from '../../../Component/Loading';
import {Button, SearchInput} from 'teaset';
const Tou = (props) => {
    return(
        <View style={{
            // flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
            height: px2dp(90),
            alignItems: 'center',
            paddingLeft: px2dp(20),
            paddingRight: px2dp(20),
        }}
        >
            <Text style={{fontSize: px2dp(30),color: '#508ef1',flex:1,textAlign: 'center'}}>{'姓名'}</Text>
            <Text style={{fontSize: px2dp(30),color: '#508ef1',flex:1,textAlign: 'center'}}>{'ID'}</Text>
            <Text style={{fontSize: px2dp(30),color: '#508ef1',flex:1,textAlign: 'center'}}>{'电话'}</Text>
        </View>
    )
}
export default class IndividualClient extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible: false,
            list:[],
            prodData: [],
            page:0,
            total:0,
            customerName: '',//名称搜索
            waiting: false,//防止多次重复点击
        };

    }

    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh){
            this._dialogAppUser();
        }
    }
    _dialogAppUser (){
        this.setState({
            total:0,
            page:0,
            visible:true
        })
        let url = Config.baseApi + Config.applyApi.queryPerson+"1&start=0&limit="+20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics,this.state.page,responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }
    _dialogAppUser1 (name){
        this.setState({
            visible:true
        })
        let url = Config.baseApi + Config.applyApi.queryPerson+"1&start=0&limit="+20+"&name="+name;
        console.log("aaaa---------------",url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics,this.state.page,responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    }
    _render = (list,page,totalProperty) => {
        this.setState({
            visible:false
        })
        setTimeout(()=> {
            this.setState({waiting: false})
        }, 2000);//设置的时间间隔根据实际需要
        console.log("----------------------------",list);
        let keys = page * 20;
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
                total:totalProperty,
                page:offsets
            })
        }else{
            let arr = this.state.prodData;
            arr.push(...dataBlob);
            let offsets = this.state.page;
            offsets++;
            this.setState({
                prodData:arr,
                total:totalProperty,
                page:offsets,
            })
        }
    }


    _border = () => {
        return <View style={{height:StyleSheet.hairlineWidth ,backgroundColor:'#ddd'}}/>;
    }
    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {name,cellphone,id} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
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
                        onPress={()=>this._goDetail(rowData.item.value)}
                        activeOpacity={0.8}
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
                            <Text style={{fontSize: px2dp(28),color: '#999', flex: 1,textAlign: 'center'}}>{name}</Text>
                            <Text style={{fontSize: px2dp(28),color: '#999' ,flex: 1,textAlign: 'center'}}>{id}</Text>
                            <View style={{justifyContent: 'center', flexDirection: 'row', flex: 1}}>
                                <Text style={{fontSize: px2dp(28),color: '#999',width: px2dp(200),textAlign: 'center'}}>{cellphone}</Text>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20} style={{marginRight: px2dp(35)}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    _goDetail = (value)=>{
        console.log("value",value);
        Actions.IndividualClientDetail({id:value.id,flag:true});
    }

    _deleteItem(rowID) {
        let url = Config.baseApi + Config.publicApi.deleteSpouse  + rowID;
        console.log("————————————————————————————",url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除个人客户', responseText);
                responseText.success ? this._SUCCESS(responseText.msg) : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS(msg) {
        Toast.message(isEmpty(msg)?"删除成功":msg);
        this.setState({
            page:0
        })
        this._dialogAppUser();
    }

    _reachedKillUser = () =>{
        let offsetValue = this.state.page * 20;
        console.log('offsetValue',this.state.total);
        if(offsetValue >= this.state.total){
            return;
        }
        let url = Config.baseApi + Config.applyApi.queryPerson+"1&start="+offsetValue+"&limit="+20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.topics,this.state.page,responseText.totalProperty) : Toast.message(responseText.msg);
            }
        })
    };
    _search() {
        this.setState({
            waiting: true,
            page: 0
        });
        this._dialogAppUser1(this.state.customerName);
    }
    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back rightText="md-add" onPress="ConvertOfficialAccountP" falg='false'/>
                <View style={styles.searchAll}>
                    <SearchInput
                                 onChangeText={(text)=>this.setState({customerName:text})}
                                 style={{flex: 5,borderRadius: px2dp(15), height: px2dp(60)}}
                                 placeholder='请输入客户姓名' returnKeyLabel="搜索" clearButtonMode='while-editing' />
                    <Button
                        style={styles.searchStyle} title='搜索' type='primary'
                        onPress={()=>this._search()}  disabled={this.state.waiting}
                    />
                </View>
                <Tou />
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
                    onEndReached={()=>this._reachedKillUser()}
                    onRefresh={()=>this._dialogAppUser()}
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
    }
})


