
/*
 * UploadReportFile ,UploadReportFile
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Title from '../../Component/Title';

export default class UploadReportFile extends PureComponent {
    static propTypes = {};
    //http://172.16.10.43:8080/dljt/api/makeContractMainProduceHelper.do?projId=936&businessType=SmallLoan&templateId=495&htlxdName=%E5%80%9F%E6%AC%BE%E5%90%88%E5%90%8C%E6%A8%A1%E7%89%88&htmcdName=%E5%80%9F%E6%AC%BE%E5%90%88%E5%90%8C%E4%B8%AA%E4%BA%BA&contractCategoryTypeText=%E5%80%9F%E6%AC%BE%E5%90%88%E5%90%8C%E6%A8%A1%E7%89%88&contractCategoryText=&htType=loanContract&contractId=

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back />
                <Text >
                    UploadReportFile
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white'
    }
});
