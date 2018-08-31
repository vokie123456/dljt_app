/**
 * Created by duansailong on 2018/5/29.
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
import {Input, Select, SearchInput, Wheel} from 'teaset';

const DefaultInput = (props) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomWidth: props.border?0:StyleSheet.hairlineWidth,
            borderBottomColor: '#ddd', alignItems: 'center', height: px2dp(100),paddingLeft: px2dp(10)
        }}>
            <Text style={{width: px2dp(200), color: '#FF1737'}}>{props.require ? '*' : '  '}<Text
                style={{fontSize: px2dp(28), color: '#333'}}>{props.name}</Text></Text>
            <Input
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                style={{
                    backgroundColor: "#fffdcc",
                    borderColor: 'transparent',
                    marginRight: px2dp(38),
                    textAlign: 'left',
                    flex: 1,
                    paddingLeft: 0
                }}
                value={!isEmpty(props.valOne)?props.valOne+"":'尚未填写'}
                placeholder={props.placeholder}
                editable={false}
                // onChangeText={(text)=>{
                //     props.that.setState({[props.parms]: text});
                // }}
            />
        </View>
    )
}
export default class ReviewTheContentDetails extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("propdsadsfdsafas",props)
        // 初始状态
        this.state = {};

    }

    componentDidMount() {
        this.setState({})
    }


    render() {
        let {subject,projectNumber,projectMoney,notMoney} = this.props.data;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <DefaultInput placeholder={'尚未填写'} name={'项目名称：'} valOne={subject}/>
                <DefaultInput placeholder={'尚未填写'} name={'项目编号：'} valOne={projectNumber}/>
                <DefaultInput placeholder={'尚未填写'} name={'业务类型：'} valOne={this.props.type}/>
                <DefaultInput placeholder={'尚未填写'} name={'业务总金额：'} valOne={projectMoney}/>
                <DefaultInput placeholder={'尚未填写'} name={'欠收金额：'} valOne={notMoney}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


