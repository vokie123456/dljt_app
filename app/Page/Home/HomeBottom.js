/**
 * Created by duansailong on 2018/2/7.
 */
'use strict';
import React, {Component} from 'react'
import {
	View,
	Text,
	Image,
	ScrollView,
	Dimensions,
	Alert,
	TouchableOpacity,
	PixelRatio,
	TouchableHighlight,
	StyleSheet,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
// import Images from '../../Resources/Images';

export default class HomeBottom extends Component {

	static defaultProps = {}

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
		}

	}

	componentDidMount() {
		this.setState({})
	}

	_goMenu(index){
		Actions[index.key]({disabled: index.disabled});
	}
	render() {
		var onThis = this;
		var BOX = Menus.map(function(elem, index) {
			return(
				<TouchableOpacity
					activeOpacity={0.8}
					key={index}
					onPress={()=>onThis._goMenu(elem)}
					style={elem.hideNav?styles.touchBoxShow:styles.touchBox} >
					<View style={styles.boxContainer}>
						<Text style={styles.boxText}>{elem.title}</Text>
						{/*<Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>*/}
						{/*<LinearGradient start={{x: 0, y: 1}}*/}
						{/*end={{x: 1, y: 0}} colors={['#F6F6F6', elem.color,]}*/}
						{/*style={styles.linearGradient}>*/}
                            <Image style={{width: px2dp(elem.size), height: px2dp(elem.size),borderRadius: iOS ? 15 : px2dp(50), margin:px2dp(20)}}
                                   source={elem.icon}
                            />
						{/*</LinearGradient>*/}
					</View>
				</TouchableOpacity>
			);
		})
		return(
			<View>
				<Text style={{color: '#313131',fontWeight: '500', fontSize: px2dp(31), paddingLeft: px2dp(25),marginTop: px2dp(25), marginBottom: px2dp(1)}}>常用应用</Text>
				<View style={styles.touchBoxContainer}>
					{BOX}
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	touchBox:{
		width: Dimensions.get('window').width/3-0.33334,
		height:Dimensions.get('window').width/3-px2dp(40),
	},
	touchBoxShow:{
		width: 0,
		height:0,
	},
	linearGradient: {
		alignItems: 'center',
		borderRadius: px2dp(100),
		shadowOffset: {width: 3, height: 4},
		shadowOpacity: 0,
		// shadowRadius: px2dp(20),
		shadowColor: '#ff162a',
		//注意：这一句是可以让安卓拥有灰色阴影
		elevation: 5,
		zIndex: iOS ? 1 : 0,
		justifyContent: 'center'
	},
	touchBoxContainer:{
		flexDirection: "row",
		flexWrap:"wrap",
		width: Dimensions.get('window').width,
	},
	boxContainer:{
		alignItems:"center",
		justifyContent:"center",
		width: Dimensions.get('window').width/3,
		height:Dimensions.get('window').width/3-px2dp(25),
	},
	boxIcon:{
		position:"relative",
		top:-10,
	},
	boxText:{
		position:"absolute",
		bottom:px2dp(10),
		width:Dimensions.get('window').width/3,
		textAlign:"center",
		left: 0,
		fontSize: px2dp(25),
		backgroundColor:"transparent"
	},
})


