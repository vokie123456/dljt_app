'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Image
} from 'react-native'
import Title from '../../../Component/Title';
import SwipeOut from 'react-native-swipeout';
import ListFooter from '../../../Common/ListFooter';
import ListEmpty from '../../../Common/ListEmpty';
import Icon from "react-native-vector-icons/Ionicons";
import {Button, SearchInput} from 'teaset';

export default class ContactPersonInformation extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            list:[],
            propData: [],
            page:0,
            total:0,
        };
    }

    componentDidMount() {
        this.setState({});
        this._getContactListData();
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProp777777777777",nextProps.isRefresh);
        if(nextProps.isRefresh){
            this._getContactListData()
        }
    }

    _getContactListData = () => {
        let url = Config.baseApi + Config.publicApi.ajaxQueryPersonRelation +'?personId=' + this.state.id;
        console.log('ididididiididididi', this.state.id)
        RTRequest.fetch1(url).then((responseText) => {
            console.log('联系人信息+++++++++++++++++++++', responseText);
            responseText.success ? this._parsingList(responseText.topics) : Toast.message(responseText.msg)
        })
    };

    //行间分割线
    _border = () => {
        return <View style={{height:hair ,backgroundColor:'#ddd'}}/>;
    };

    //解析数组
    _parsingList = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
            dataBlob.push({
                key:  index,
                value: item
            });
            i ++;
        });
        this.setState({
            propData:dataBlob,
        })
    };

    //编辑行样式
    _renderItem = (rowData, rowID, sectionID) => {
        let this1 = this;
        const {relationName ,relationShipValue, relationCellPhone, id} = rowData.item.value;
        const swipeOutButton = [
            {
                text:'删除',
                type:'delete',
                onPress: () => {
                    this1._deleteItem(id)
                }
            }
        ];
        console.log('传过去的值++++++++++++++++', rowData.item.value)
        return(
            <View>
                <SwipeOut
                    close={!(this1.state.sectionID === sectionID && this1.state.rowID === rowID)}
                    right={swipeOutButton}
                    disabled={this1.state.disabled}
                    rowID={rowID}
                    sectionID={sectionID}
                    autoClose={true}
                    backgroundColor={rowData.backgroundColor}
                    onOpen={(rowID, sectionID)=> {

                    }}
                    onClose={() => console.log('关闭了')}
                    scroll={event => console.log('滑动了')}
                >
                    <TouchableOpacity
                        // onPress={() => this1._goDetail(rowData.item.value)}
                        onPress={ ()=>Actions.ContactPersonInfoDetail({data:rowData.item.value, type1: "see",data1:this.props})}
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
                            <Image style={{flex:1, width:40, height:40, borderRadius:20, marginTop:2.5, marginLeft:10}} source={require('../../../Resources/images/user-bg.png')}/>
                            <View style={{flex:2}}>
                                <Text style={{textAlign:'center'}}>{relationName}</Text>
                                <Text style={{textAlign:'center'}}>{relationShipValue}</Text>
                            </View>
                            <View style={{flex:7, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                <Text style={{textAlign:'center', paddingRight:10, color: '#999', fontSize: px2dp(28)}}>{relationCellPhone}</Text>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}
                                      style={{marginRight: px2dp(35)}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </SwipeOut>
            </View>
        )
    };

    _deleteItem(rowID) {
        let url = Config.baseApi + Config.publicApi.deleteRsPersonRelation + '?id='  + rowID;
        console.log("————————————————————————————",url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除个人客户', responseText);
                responseText.success ? this._SUCCESS({isRefresh:true}) : Toast.message("请检查网络连接");
            }
        })
    }

    _SUCCESS(msg) {
        Toast.message("删除成功");
        if (this.props.isRefresh){
            this._getContactListData()
        }
    }

    //点击跳转到联系人详情表
    _goDetail = (value) => {
        console.log('联系人详情表=============value', value);
        Actions.ContactPersonInfoDetail(value);
    };


    render() {
        console.log('%&%&%&%&%&%&%&%&%&%&%&%&%&%&%&%&',{...this.props})
        return (
            <View style={styles.container}>
                {/*<Title name={'联系人信息'} rightText={"md-add"} back onPress="ContactPersonInfoDetail"*/}
                       {/*type="add" {...this.props}/>*/}
                <Title {...this.props} name={this.props.title} rightText={"md-add"} back onPress="ContactPersonInfoDetail"
                       type="add"/>
                <ScrollView>
                    <FlatList
                        style={{flex:1, paddingBottom:px2dp(30)}}
                        horizontal={false}
                        data={this.state.propData}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._border}//底部线条
                        ListHeaderComponent={<View/>}//表头
                        ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                        ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                        onRefresh={()=>this._getContactListData()}
                        refreshing={false}
                        numColumns={1}
                    />
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    }
});