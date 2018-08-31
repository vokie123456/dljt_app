/**
 * Created by duansailong on 2018/3/7.
 */
'use strict';
import React, {Component} from 'react'
import {
	View,
	Text,
	Image,
	WebView,
	StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import {SegmentedView} from 'teaset';
import Customer from './Customer';
import Person from './Person';

export default class AllCustomer extends Component {

	static defaultProps = {}

	// 构造
	constructor(props) {
		super(props);
		console.log("data",props.data);
		// 初始状态
		this.state = {};

	}

	componentDidMount() {
		this.setState({})
	}

	render() {
		return (
			<View style={styles.container}>
				<Title name={'选择客户'} back />
				<SegmentedView
					indicatorLineColor={"#398ef6"}
					style={{flex: 1,paddingTop: px2dp(0)}} >
					<SegmentedView.Sheet title='企业'>
						<Customer {...this.props}/>
					</SegmentedView.Sheet>
					<SegmentedView.Sheet title='个人'>
						<Person {...this.props}/>
					</SegmentedView.Sheet>
				</SegmentedView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

})


