/**
 * Created by duansailong on 2018/3/9.
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
import Title from '../../../Component/Title';
import {SegmentedView} from 'teaset';
import LegalPerson from '../../Main/LegalPerson';
import Person from '../../Main/Person';
import BusinessTransaction from '../../Main/BusinessTransaction';
import Guarantee from '../../Main/Guarantee';
export default class BusinessContact extends Component {
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
                <Title name={this.props.title} back />
                <SegmentedView
                    indicatorLineColor={"#398ef6"}
                    style={{flex: 1,paddingTop: px2dp(0)}} >
                    <SegmentedView.Sheet title='业务往来'>
                        <BusinessTransaction id={this.props.id} judge={'person_customer'}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='作为第三方保证'>
                        <Guarantee id={this.props.id} judge={'person_customer'}/>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='作为法人'>
                        <LegalPerson id={this.props.id} judge={'person_customer'}/>
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

