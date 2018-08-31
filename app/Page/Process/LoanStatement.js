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

const TopTitle = (props) => {
    return(
        <View>
            <View>
                <View style={{flexDirection: 'row', height: px2dp(50), alignItems: 'center'}}>
                    <Text style={{paddingLeft: px2dp(20)}}>金额： </Text><Text style={{color: 'red'}}>{props.data1.incomeMoney1}元</Text>
                    <Text style={{paddingLeft: px2dp(100)}}>期数： </Text><Text style={{color: 'red'}}>{props.data1.payintentPeriod1}期</Text>
                </View>
            </View>
            <View style={{
                backgroundColor: '#f5f5f5',
                flexDirection: 'row',
                height: px2dp(75),
                borderBottomWidth: hair,
                alignItems: 'center',
                paddingLeft: px2dp(20),
                paddingRight: px2dp(40),}}
            >
                <Text style={{flex: 1,fontSize: px2dp(28),textAlign: 'left',color: '#0d0d0d'}}>期数</Text>
                <Text style={{flex: 2,fontSize: px2dp(28),textAlign: 'center',color: '#0d0d0d'}}>账单金额（元）</Text>
                <Text style={{flex: 2,fontSize: px2dp(28),textAlign: 'right',color: '#0d0d0d'}}>计划到账日</Text>
            </View>
        </View>
    )
}

export default class LoanStatement extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            list:[],
            prodData: [],
            incomeMoney1: 0,
            payintentPeriod1: 0,
        };
    }

    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }
    _dialogAppUser (){
        let url = Config.baseApi + Config.processApi.getListLoanTrial+"?businessType=SmallLoan&projectId="+this.props.data.data.vars[0].projectId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('放款收息表', responseText);
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
        let incomeMoney=0;
        dataBlob.map(function (item) {
            incomeMoney += item.value.incomeMoney;
        })
        this.setState({
            prodData:dataBlob,
            incomeMoney1: incomeMoney.toFixed(2),
            payintentPeriod1: dataBlob[dataBlob.length-1].value.payintentPeriod
        })
    }

    _border = () => {
        return <View style={{marginLeft: px2dp(20),marginRight: px2dp(20),height:hair ,backgroundColor:'#c8c8c8'}}/>;
    }

    _renderRow=({item,index}) =>{
        let {payintentPeriod,incomeMoney,intentDate} = item.value;
        return(
            <TouchableOpacity
                activeOpacity={0.8}
            >
                <View style={{flex: 1,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: px2dp(90),
                    alignItems: 'center',
                    paddingLeft: px2dp(40),
                    paddingRight: px2dp(40),
                }}
                >
                    <Text style={{flex: 1,fontSize: px2dp(28),textAlign: 'left',color: '#0d0d0d'}}>{payintentPeriod}</Text>
                    <Text style={{flex: 2,fontSize: px2dp(28),textAlign: 'center',color: '#0d0d0d'}}>{incomeMoney}</Text>
                    <Text style={{flex: 2,fontSize: px2dp(28),textAlign: 'right',color: '#0d0d0d'}}>{intentDate}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.log("thissateat4ew",this.state)
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <TopTitle data1={this.state}/>
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


