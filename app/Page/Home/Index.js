/**
 * Created by duansailong on 2018/2/5.
 */
'use strict';
import React, {Component} from 'react'
import {
	View,
	Text,
	Platform,
	Image,
	ScrollView,
    ToastAndroid,
	Animated,
	Easing,
    BackHandler,
    NativeModules,
    Dimensions,
	StatusBar,
	Alert,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'

import HomeTop from '../Home/HomeTop';
import BannerList from '../Swiper/BannerList';
import News from '../Swiper/News'
import HomeCenter from '../Home/HomeCenter'
import HomeBottom from '../Home/HomeBottom'

const {width, height} = Dimensions.get('window');

export default class Index extends Component {
	static defaultProps = {}

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			scrollY: new Animated.Value(0),
			opacityAnmValue: new Animated.Value(1),
		};
	}
    componentWillMount(){
        BackHandler.addEventListener('hardwarePress', () => this._onBackAndroid());
    }
	componentDidMount() {
		this.setState({})
		/**
		 * 沉浸式代码
		 */

		StatusBar.setBarStyle('light-content');
		Platform.OS == 'android' ? StatusBar.setBackgroundColor('transparent') : '';
		Platform.OS == 'android' ? StatusBar.setTranslucent(true) : '';
		// 0 -1  显示 默认不显示
		this._animateHandlerIn = Animated.timing(this.state.opacityAnmValue, {
			toValue: 1,  //透明度动画最终值
			duration: 500,   //动画时长500毫秒
			easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
		})
		// 1 -0  不显示 默认显示
		this._animateHandlerOut = Animated.timing(this.state.opacityAnmValue, {
			toValue: 0,  //透明度动画最终值
			duration: 800,   //动画时长500毫秒
			easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
		})

		this.state.scrollY.addListener((ev) => {

			if (ev.value < 0) {
				this._animateHandlerOut.start && this._animateHandlerOut.start()
			} else {
				this._animateHandlerIn.start && this._animateHandlerIn.start()
			}

			if (ev.value < width*.3) {
				Platform.OS == 'android' && StatusBar.setBackgroundColor('rgba(0,0,0,0)');
				StatusBar.setBarStyle('dark-content');
			} else {
				Platform.OS == 'android' && StatusBar.setBackgroundColor('rgba(0,0,0,0)');
				StatusBar.setBarStyle('dark-content');

			}

		})
	}
    _onBackAndroid = () => {
        if(Actions._state.routes[1].routes.length > 1){
            Actions.pop();
            return true;
        }else{
            if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
                NativeModules.ExitApp.Exit();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
	render() {
		const {scrollY} = this.state;
		return (
			<View style={styles.container}>
				<HomeTop />
				<ScrollView
					style={{flex:1}}
					showsVerticalScrollIndicator={false}
					scrollsToTop={true}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
					scrollEventThrottle={20}>
					<BannerList height={width*.5}/>
					<HomeCenter {...this.props} />
					{/*<News />*/}
					<HomeBottom />

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


