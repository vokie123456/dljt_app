import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
const loading = require('./img/loading.gif')


const Slide = props => {
	return (<View style={styles.slide}>
		<Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}} />
		{
			!props.loaded && <View style={styles.loadingView}>
				<Image style={styles.loadingImage} source={loading} />
			</View>
		}
	</View>)
}

export default class BannerList extends Component {
	constructor (props) {
		super(props)
		this.state = {
			imgList: [
				'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
				'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
			],
			loadQueue: [0, 0, 0, 0]
		}
		this.loadHandle = this.loadHandle.bind(this)
	}
	loadHandle (i) {
		let loadQueue = this.state.loadQueue
		loadQueue[i] = 1
		this.setState({
			loadQueue
		})
	}
	render () {
		return (
			<View style={{height:px2dp(300)}}>
				<Image style={{width:width, height: px2dp(300)}} source={require('../../Resources/images/banner/banner01.jpg')}/>
				{/*<Swiper style={styles.wrapper}  horizontal={true} autoplay>*/}
					{/*{*/}
						{/*this.state.imgList.map((item, i) => <Slide*/}
							{/*loadHandle={this.loadHandle}*/}
							{/*loaded={!!this.state.loadQueue[i]}*/}
							{/*uri={item}*/}
							{/*i={i}*/}
							{/*key={i} />)*/}
					{/*}*/}
				{/*</Swiper>*/}
			</View>
		)
	}
}

const styles = {
	wrapper: {
	},

	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	image: {
		width,
		flex: 1,
		backgroundColor: 'transparent'
	},

	loadingView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.5)'
	},

	loadingImage: {
		width: px2dp(100),
		height: px2dp(100)
	}
}