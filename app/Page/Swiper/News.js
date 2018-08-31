import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Easing,
	View,
	Dimensions,
	Text,
} from 'react-native';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translateY: new Animated.Value(0),
			articleList: [{title:"1",key:"1"},{title:"2",key:"2"},{title:"3",key:"3"}]
		};
	}


	componentDidMount() {console.log('componentDidMount')
		this.showHeadBar(0, 3);         //从第0条开始，轮播5条数据
	}


	showHeadBar(index, count) {console.log('start')
		index++;
		Animated.timing(this.state.translateY, {
			toValue: -px2dp(80) * index,             //40为文本View的高度
			duration: 300,                        //动画时间
			Easing: Easing.linear,
			delay: 2500                            //文字停留时间
		}).start(() => {                          //每一个动画结束后的回调
			if(index >= count) {
				index = 0;
				this.state.translateY.setValue(0);
			}
			this.showHeadBar(index, count);  //循环动画
		})
	}

	render() {
		return(
			<View style={{marginLeft: px2dp(25), marginRight: px2dp(25), borderBottomColor: "#F6F6F8",borderBottomWidth: px2dp(2),flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 1.3,justifyContent: 'center',}}>
					<Text style={styles.newsStyle}>逾期</Text>
				</View>
				<View style={styles.container}>
					<Animated.View
						style={[styles.wrapper, {
							transform: [{
								translateY: this.state.translateY
							}]
						}
						]}
					>
						<View style={styles.bar}>
							<Text numberOfLines={1} style={styles.barText}>小喇叭</Text>
						</View>
						<View style={styles.bar}>
							<Text numberOfLines={1} style={styles.barText}>广播</Text>
						</View>
						<View style={styles.bar}>
							<Text numberOfLines={1} style={styles.barText}>小喇叭</Text>
						</View>
					</Animated.View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	newsStyle: {
		borderColor: '#3590fe',
		paddingTop: px2dp(3),
		width: px2dp(80),
		paddingBottom: px2dp(3),
		paddingLeft: px2dp(10),
		paddingRight: px2dp(10),
		textAlign: 'center',
		fontSize: px2dp(26),
		borderWidth: px2dp(1),
		borderRadius: px2dp(10),
		color: '#3590fe',
	},
	container: {
		height: px2dp(80),
		flex: 9,
		width: Dimensions.get('window').width*0.8,
		overflow: 'hidden',
	},
	wrapper: {
		marginHorizontal: px2dp(5),
	},
	bar: {
		height: px2dp(80),
		justifyContent: 'center',
	},
	barText: {
		width: Dimensions.get('window').width - 30 - 16,
		color: '#4a4a4a',
		paddingLeft: px2dp(10),
		fontSize: px2dp(26),
	},
});
