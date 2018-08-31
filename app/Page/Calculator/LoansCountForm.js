/**
 * Created by duansailong on 2018/6/8.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    WebView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';

export default class LoansCountForm extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            url: 'http://172.16.10.56:8042/erp_zj_dljt/indexerpmobilejd.html'
        };

    }

    componentDidMount() {
        this.setState({})
    }


    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


