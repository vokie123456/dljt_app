/**
 * Created by Rabbit 下午6:40
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {NavigationBar} from 'teaset';
import Icon from 'react-native-vector-icons/Ionicons';

const Title = (props) => {

    return (
    	<View>
            <NavigationBar title={
                <Text style={{fontSize: px2dp(32),paddingBottom: px2dp(30),lineHeight: px2dp(50), color: '#3c3c3c'}}>{props.name ? props.name : '没写标题'}</Text>
            }
                           leftView={
                               props.back ? <TouchableOpacity style={{
                                   paddingLeft: px2dp(20), flexDirection: 'row',
                                   alignItems: 'center'
                               }}
                                  onPress={() =>
                                      Actions.pop()

                                  }>
                                   <Icon name='ios-arrow-back' size={px2dp(50)} color={'#3c3c3c'}/>
                                   <Text style={{
                                       color: '#3c3c3c',
                                       fontSize: px2dp(26),
                                       marginLeft: px2dp(12)
                                   }}></Text>
                               </TouchableOpacity> : <View/>
                           }
                           rightView={
                               props.rightText ?
	                               <Icon name={props.rightText} style={{marginRight: px2dp(20)}} size={px2dp(45)} color={'#0ea7ff'}/> : <View/>
                           }

                           style={{height: px2dp(130), paddingBottom: px2dp(15), backgroundColor: '#fff',alignItems: 'center',}}
                           statusBarStyle='light-content'
                           // statusBarColor={"#ddd"}
                           // statusBarHidden={false}//是否隐藏系统状态栏, 为 true 时系统状态栏与导航条均不显示。
            />
		    <View style={{marginTop: px2dp(120), height:StyleSheet.hairlineWidth ,backgroundColor:'#c8c8c8'}}/>
	    </View>
    )
};

let styles = StyleSheet.create({

})
export default Title;