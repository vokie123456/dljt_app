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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

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
                                   paddingLeft: px2dp(27), flexDirection: 'row',
                                   alignItems: 'center'
                               }}
                                  onPress={() =>
                                      Actions.pop({refresh:({isRefresh:isEmpty(props.toPop)?false:true})})
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

let styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        height: px2dp(130),
    },
})
export default Title;