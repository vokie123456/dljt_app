/**
 * Created by hurong_pc111 on 2018/6/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import SmallButton from '../../Component/SmallButton';
import {Input, Select,ListRow,NavigationBar} from 'teaset';
import Icon from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Swipeout from 'react-native-swipeout'

/*企业客户信息*/
export default class EnterpriseCustomerInfo extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {
              data:props.data,
              sectionID: null,
              rowID: null,
          };
      }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        //this.setState({});
    }
    render(){
        const swipeOutBtn = [
            {
                text: '删除',
                type: 'delete',
                onPress: ()=>{
                    this._deleteItem(perId);
                },
            },
            // { text: 'Primary',    type: 'primary',   },
            // { text: 'Secondary',  type: 'secondary', },
        ];
        return(
            <View style={styles.container}>
                <Title name={this.props.title} back  onPress={()=>Actions.EnterpriseCustomerInfo}/>
                {this.props.newId?<View/>: <Menu name={'企业法人信息'} pageName={'EnterpriseLegalInfo'} data={this.state.data}/>}
                {this.props.newId?<Menu name={'银行开户信息'} pageName={'AddBanks'} id={this.props.newId}/>:<Menu name={'银行开户信息'} pageName={'BankAccountInfo'} data={this.state.data}/>}
                {this.props.newId?<Menu name={'企业联系人信息'} pageName={'AddContactInfo'} id={this.props.newId}/>:<Menu name={'企业联系人信息'} pageName={'EnterpriseContactInfo'} data={this.state.data}/>}
            </View>
        );
    }
}
const Title = (props) => {
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
                                   marginLeft: px2dp(27), flexDirection: 'row',
                                   alignItems: 'center'
                               }}
                                  onPress={() =>
                                      Actions.pop({refresh:({isRefresh:true,date:new Date()})})
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
const Menu = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                 if(!isEmpty(props.id))
                   props.pageName && Actions[props.pageName]({newId:props.id});
                   else
                    props.pageName && Actions[props.pageName]({data:props.data,title:props.name});
            }}
            style={{
                backgroundColor: '#fff',
                height: px2dp(100),
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{width: px2dp(90), alignItems: 'center'}}>
                <Icon color={'#12b7f5'} name={'md-copy'} size={20}/>
            </View>
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#EEEEEE',
                height: px2dp(100)
            }}>
                <Text style={{fontSize: px2dp(28), color: '#333333',marginLeft: px2dp(35)}}>{props.name}</Text>
                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),
    },
});