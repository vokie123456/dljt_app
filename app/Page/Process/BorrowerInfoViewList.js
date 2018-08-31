/**
 * Created by duansailong on 2018/3/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import Swipeout from 'react-native-swipeout';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BorrowerInfoViewList extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("props----------",props.data.data.vars[0].projectId)
        // 初始状态
        this.state = {
            prodData: [],
            data: props,
        };

    }
    componentDidMount() {
        this.setState({})
        this._seeInfo();//查询还款来源
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh) {
            this._seeInfo();//回调共同借款人
        }
    }
    _seeInfo() {
        let url = Config.baseApi + Config.processApi.listBorrowerInfo  + this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('查询共同借款人', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
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
            prodData:dataBlob,
            isShow: true
        })
    }
    _deleteItem(rowID) {
        let url = Config.baseApi + Config.processApi.deleteBorrowerInfo  + rowID;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('删除共同借款人', responseText);
                responseText.success ? this._SUCCESS() : Toast.message("请检查网络连接");
            }
        })
    }
    _SUCCESS (){
        Toast.message("删除成功");
        this._seeInfo();//回调查询还款来源
    }
    _renderRow(rowData, sectionID, rowID) {
        const this1 = this;
        let {borrowerInfoId,relation,customerName,telPhone} = rowData.item.value;
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
                    this._deleteItem(borrowerInfoId);
                },
            },
            // { text: 'Primary',    type: 'primary',   },
            // { text: 'Secondary',  type: 'secondary', },
        ];
        return (
            <View>
                <View style={{height: px2dp(15),backgroundColor: '#f5f5f5'}}></View>
                <Swipeout
                    close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
                    // left={rowData.left}
                    // right={this.state.btnsTypes}
                    right={swipeOutBtn}
                    // right={this.state.btnsTypes}
                    disabled={this1.props.inputDisabled}
                    rowID={rowID}
                    sectionID={sectionID}
                    autoClose={true}
                    backgroundColor={rowData.backgroundColor}
                    onOpen={(sectionID, rowID) => {
                    }}
                    onClose={() => console.log('onClose') }
                    scroll={event => console.log('scroll event') }
                >
                    <View style={styles.contacts}>
                        <View style={{flexDirection: 'row',height: px2dp(115)}}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={ ()=>Actions.AddBorrowerInfoViewList({data:rowData.item.value,allData:this1.props.data,type1: "see",data1:this1.props})}
                                style={styles.leftText}>
                                <Icon name="ios-contacts" size={px2dp(95)} color="#5CB5FC"/>
                                <View style={{paddingLeft: px2dp(15)}}>
                                    <Text style={{color: 'black',marginBottom: px2dp(1)}}>{customerName}</Text>
                                    <Text>{relation}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.leftText1}>
                                <Text style={{fontSize: px2dp(29),paddingRight: px2dp(15)}}>{telPhone}</Text>
                                <Icon name="ios-arrow-forward" size={px2dp(38)}/>
                            </View>
                        </View>
                    </View>
                </Swipeout>
            </View>
        );
    }
    // borrowerInfo.projectId	 *	项目id
    // borrowerInfo.type	 *	0、企业 1、 个人
    // borrowerInfo.customerId	 *	企业或个人Id
    // borrowerInfo.cardNum	 *	证件号码
    // borrowerInfo.relation	 *	关系
    // borrowerInfo.address	 *	地址
    // borrowerInfo.telPhone	 *	电话
    // borrowerInfo.remarks	 *	备注
    // borrowerInfo.businessType	 *	贷款默认：SmallLoan
    // borrowerInfo.operationType	 *	贷款默认：SmallLoanBusiness

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} rightText={this.props.inputDisabled?"":"md-add"} back onPress="AddBorrowerInfoViewList" type="add" {...this.props.data}/>
                <FlatList
                    style={styles.listStyle}
                    horizontal={false}
                    data={this.state.prodData}
                    ItemSeparatorComponent={this._border}//底部线条
                    renderItem={this._renderRow.bind(this)}
                    ListHeaderComponent={<View/>}//表头
                    ListFooterComponent={<ListFooter/>}//下拉无数据时加载页面
                    ListEmptyComponent={<ListEmpty/>}//数据为空时加载的页面
                    onEndReachedThreshold={1}
                    refreshing={true}
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
    contacts: {
        backgroundColor: '#fff',
    },
    leftText: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: px2dp(20),
        backgroundColor: '#fff'
    },
    leftText1: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        paddingRight: px2dp(20),
        backgroundColor: '#fff'
    },
    listStyle: {
        borderRadius: px2dp(10),
        // paddingBottom:px2dp(30),
        backgroundColor: '#f5f5f5',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
    },
})


