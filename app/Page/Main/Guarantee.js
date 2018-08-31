/**
 * Created by duansailong on 2018/3/9.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    FlatList,
} from 'react-native'
import Title1 from '../../Component/Title1';
import {Input, Select} from 'teaset';
import SmallButton  from '../../Component/SmallButton'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ListFooter from '../../Common/ListFooter';
import ListEmpty from '../../Common/ListEmpty';
const DefaultInput = (props) => {
    return (
        <View style={{
            borderBottomWidth: props.border ? 0 : StyleSheet.hairlineWidth, paddingTop: px2dp(30)
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: px2dp(40), paddingLeft: px2dp(20),
                paddingRight: px2dp(20), justifyContent: 'space-between', paddingBottom: px2dp(20)
            }}>
                <Text style={{fontSize: px2dp(27), color: '#333'}}>{props.name}</Text>
                {/* <Text style={{fontSize: px2dp(23), color: '#333'}}>{'最终估价 : '+props.projectMoney}</Text>*/}
                <Text style={{fontSize: px2dp(23), color: '#333'}}>登记时间
                    : {+isEmpty(props.duedate) ? props.duedate : ''}</Text>
            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center', height: px2dp(40), paddingLeft: px2dp(20),
                paddingRight: px2dp(20), justifyContent: 'space-between', paddingBottom: px2dp(20)
            }}>
                <Text style={{fontSize: px2dp(23), color: '#918597'}}>{props.uname}</Text>
            </View>
        </View>
    )
}
export default class Guarantee extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("上个页面参数", props.id);
        // 初始状态
        this.state = {
            id: props.id,
            prodData: [],
            judge: props.judge,
        }
        ;

    }

    componentWillReceiveProps(nextProps) {
        console.log("上个页面参数---------------------LegalPerson2222222222222", nextProps);
        this.setState({
            id: nextProps.id,
            judge: nextProps.judge,
        })
        this._getByIdPerson(nextProps.id, nextProps.judge);
    }

    componentDidMount() {
        this._getByIdPerson(this.state.id, this.state.judge);
    }

    _getByIdPerson = (id, judge) => {
        let url = Config.baseApi + Config.processApi.getAllFlowById + id + '&threePartiesEnsure=threePartiesEnsure&type=' +judge;
        console.log("-----------------------------", url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log("-----------------------------", responseText);
                responseText.success ? this._render(responseText.result) : Toast.message("请检查网络连接");
            }
        })
    }
    _render = (list) => {
        if (isEmpty(list)) {
            return;
        }
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

    _renderRow(rowData,) {
        const this1 = this;
        const {businessType, runStatus, subject, duedate, projectMoney, projectNumber}=rowData.item.value;
        return (
            <View>
                <DefaultInput name={Tool.isBusinessType(businessType)} uname={this1._subStr1(subject) + projectNumber}
                              duedate={this1._subStr2(duedate + '')} projectMoney={projectMoney + '元'}/>
            </View>
        );
    }

    _subStr1 = (recode1) => {
        var arr = recode1.split(/[0,1,2,3,4,5,6,7,8,9]/);
        return arr[0];
    }

    _subStr2 = (recode1) => {
        let b = recode1.substr(0, 10);
        return b;
    }

    render() {
        const {name, postcode, selfEmail, postAddress, cellphone, cardNumber, sexType, sexTypeValue, marriageType, marriageTypeValue, certificateType, certificateTypeValue} = this.state;
        return (
            <View style={styles.container}>
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
                    //onEndReached={() => this._reachedKillUser()}
                    //onRefresh={() => this._dialogAppUser()}
                    refreshing={false}
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
        paddingRight: px2dp(35),
        borderBottomWidth: hair,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
    }
})

