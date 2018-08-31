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
import CustomerMortgageGuarantee from './CustomerMortgage';
import PersonMortgageGuarantee from './PersonMortgage';

export default class BaoZMortgageViewDetailGuarantee extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back />
                <SegmentedView
                    indicatorLineColor={"#398ef6"}
                    style={{flex: 1,paddingTop: px2dp(0)}} >
                    <SegmentedView.Sheet title='企业'>
                        <CustomerMortgageGuarantee {...this.props}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='个人'>
                        <PersonMortgageGuarantee {...this.props}/>
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