/**
 * Created by duansailong on 2018/5/25.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import Icon from "react-native-vector-icons/Ionicons";
const TopTitle = (props) => {
    return (
        <View style={{
            height: px2dp(100),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#6e6e6e',
            borderBottomWidth: px2dp(1),
        }}>
            <Text style={{paddingLeft: px2dp(20),color: '#494949',flex: 1.6, fontSize: px2dp(28)}}>{props.name}：</Text>
            <Text style={{flex: 3, color: '#494949', fontSize: px2dp(28)}}>{props.valOne}</Text>
        </View>
    )
}
export default class ApprovalRecordDetails extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        console.log("propsdsafadsfasf",props)
        super(props);
        // 初始状态
        this.state = {};

    }

    componentDidMount() {
        this.setState({})
    }


    render() {
        const {activityName,creatorName,createtime,endtime,comments,} = this.props.data;
        const {stateText} = this.props;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <TopTitle name={"节点名称"} valOne={activityName} />
                <TopTitle name={"执行人"} valOne={creatorName} />
                <TopTitle name={"开始时间"} valOne={createtime} />
                <TopTitle name={"结束时间"} valOne={endtime} />
                <TopTitle name={"审批状态"} valOne={stateText} />
                <TopTitle name={"意见与说明"} valOne={comments} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


