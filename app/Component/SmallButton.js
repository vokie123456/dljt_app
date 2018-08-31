/**
 * Created by Rabbit 下午6:40
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SmallButtom = (props) => {
	return (

		<TouchableOpacity activeOpacity={.8} onPress={props.onPress ? props.onPress : Alert.alert('没有写点击事件哦~', null)}
		                  style={{
			                  height: px2dp(120),
			                  justifyContent: 'center', width: SCREEN_WIDTH, alignItems: 'center',
			                  ...props.style
		                  }}>
			<LinearGradient start={{x: 0, y: 1}}
			                end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
			                // style=[{styles.linearGradient}]>
			                style={[styles.linearGradient,{width: props.width ? px2dp(props.width) : px2dp(580),height: props.height ? px2dp(props.height) : px2dp(90)}]}>
				<Text
					style={{backgroundColor: 'transparent', color: '#fff', fontSize: px2dp(25)}}
				>
					{props.name ? props.name : 'Default Button Text'}
				</Text>
			</LinearGradient>
		</TouchableOpacity>

	)
};

let styles = StyleSheet.create({
	linearGradient: {
		alignItems: 'center',
		borderRadius: px2dp(50),
		shadowOffset: {width: 3, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 25,
		shadowColor: '#000',
		//注意：这一句是可以让安卓拥有灰色阴影
		elevation: 4,
		zIndex: iOS ? 1 : 0,
		justifyContent: 'center'
	},
})
export default SmallButtom;