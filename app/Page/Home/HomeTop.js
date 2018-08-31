/**
 * Created by duansailong on 2018/2/5.
 */
'use strict';
import React, {Component} from 'react'
import {
	View,
	Text,
	Image,
	Dimensions,
	Alert,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {Badge} from 'teaset'

export default class HomeTop extends Component {

	static defaultProps = {}

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};

	}

	componentDidMount() {
		this.setState({})
	}
	_message() {
		Alert.alert("消息详情");
        /*let url = Config.baseApi + Config.taskApi.myProcessRunUrl;
        console.log('消息详情', url);
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('消息详情', responseText);
                responseText.success ? this.setState({count:responseText.totalCounts}) : Toast.message(responseText.msg);
            }
        })*/
	}

	render() {
		return (
			<View style={{ backgroundColor: 'transparent'}}>
				<View style={{
					height: isIphoneX ? px2dp(143) : px2dp(85),
					width: SCREEN_WIDTH,
					flexDirection: 'row',
					marginTop:px2dp(30),
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
					<Text style={{color: '#303030',fontWeight: '500', fontSize: px2dp(36),paddingTop: px2dp(10),paddingLeft: px2dp(15)}}>借款系统</Text>

				</View>
			</View>
		)
	}
	/*<TouchableOpacity
	 onPress={()=>this._message()}
	 style={{width: px2dp(70),paddingTop: px2dp(10),}}>
	 <Icon name={'ios-text-outline'} color={'#00a2ff'}
	 style={{marginTop: 0}} size={px2dp(65)}/>
	 <View style={{position: 'absolute', paddingTop: px2dp(10), right: px2dp(10)}}>
	 <Badge countStyle={{color: '#fff'}}
	 style={{backgroundColor: '#FE546C', paddingLeft: 0, paddingRight: 0}}
	 type='capsule' count={'10'} maxCount={9}/>
	 </View>
	 </TouchableOpacity>*/
}




