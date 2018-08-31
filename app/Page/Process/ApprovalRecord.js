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
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../Component/Loading'

const TopTitle1 = () => {
    return(
        <View style={{
            backgroundColor: '#f5f5f5',
            flexDirection: 'row',
            height: px2dp(75),
            borderBottomWidth: hair,
            alignItems: 'center',
        }}
        >
            <Text style={{flex:1.4,textAlign:'center',fontSize: px2dp(28),color: 'black'}}>节点名称</Text>
            <Text style={{flex:1,textAlign:'center',fontSize: px2dp(28),color: 'black'}}>执行人</Text>
            <Text style={{flex:1.4,textAlign:'center',fontSize: px2dp(28),color: 'black'}}>审批状态</Text>
            <Icon color={'#f5f5f5'} style={{flex:.08,marginRight: px2dp(20)}} name={'ios-arrow-forward'} size={23}/>
        </View>
    )
}
export default class ApprovalRecord extends Component {

    static defaultProps = {}
    // 构造
    constructor(props) {
        super(props);
        console.log("propdsafdsafas",props)
        // 初始状态
        this.state = {
            list:[],
            prodData: [],
            visible: false,
        };
    }
    componentDidMount() {
        this.setState({})
        this._dialogAppUser();
    }
    componentWillMount(){
    }
    _dialogAppUser =()=>{
        let url = Config.baseApi + Config.taskApi.runList+"?RunType=1&filterableNodeKeys=onlineJudgement,filterableNodeKeys,ExaminationArrangement,xsps,resolutionOnlineReviewMeeting&taskId="+this.props.taskId;
        this.setState({
            visible: true,
        });
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('节点名称', responseText);
                responseText.success ? this._render(responseText.result) : Toast.message(responseText.msg);
            }
        })
    }

    _render = (list) => {
        this.setState({
            visible: false,
        })
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
        })
    }

    _border = () => {
        return <View style={{marginLeft: px2dp(20),marginRight: px2dp(20),height:hair ,backgroundColor:'#c8c8c8'}}/>;
    }

    _renderRow=({item,index}) =>{
        const this1 = this;
        let {activityName,creatorName,fromTask,taskId,runId,status,createtime,endtime,comments} = item.value;
        let stateText="";
        let stateTextColor="";
        if(status==-1){
            stateText="驳回";
            stateTextColor="#ff4a41";
        }else if(status==1){
            stateText="审批通过";
            stateTextColor="#0fc71c";
        }else if(status==2){
            stateText="流程跳转";
            stateTextColor="#393939";
        }else if(status==3){
            stateText="打回重做";
            stateTextColor="#ff4a41";
        }else if(status==4){
            stateText="任务追回";
            stateTextColor="#ede830";
        }else if(status==5){
            stateText="任务换人";
            stateTextColor="#ede830";
        }else if(status==6){
            stateText="项目换人";
            stateTextColor="#ede830";
        }else if(status==7){
            stateText="项目终止";
            stateTextColor="#ff4a41";
        }
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>Actions.ApprovalRecordDetails({data:item.value,stateText:stateText})}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: px2dp(90),
                    alignItems: 'center',
                }}
                >
                    <Text style={{flex:1.4,textAlign:'center',fontSize: px2dp(28),color: '#494949'}}>{activityName}</Text>
                    <Text style={{flex:1,textAlign:'center',fontSize: px2dp(28),color: '#494949'}}>{creatorName}</Text>
                    <Text style={{flex:1.4,textAlign:'center',fontSize: px2dp(28),color: stateTextColor}}>{stateText}</Text>
                    <Icon color={'#6e6e6e'} style={{flex:.08,marginRight: px2dp(20)}} name={'ios-arrow-forward'} size={23}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <TopTitle1 />
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
                <Loading visible={this.state.visible}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


