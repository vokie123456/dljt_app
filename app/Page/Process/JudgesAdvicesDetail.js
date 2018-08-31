/**
 * Created by duansailong on 2018/6/29.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
const Menu2 = (props) => {
    return (
        <View style={styles.titleStyle}>
            <Text style={{fontSize: px2dp(28),color: '#6f6f6f'}}>{props.title}:</Text>
            <Text style={{fontSize: px2dp(28),color: '#6f6f6f'}}>{props.value}</Text>
        </View>
    )
}
export default class JudgesAdvicesDetail extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        console.log("propsdfasdfasfdea",props)
        // 初始状态
        const {activityName,sbhTimes,isAgree,voteName,voteTime,comments,position} = props.data;
        let advice = "";
        if (isAgree == -1) {
            advice =  '尚未投票';
        } else if (isAgree == 1) {
            advice =  '同意';
        } else if (isAgree == 2) {
            advice =  '否决';
        } else if (isAgree == 3) {
            advice =  '打回';
        } else if (isAgree == 4) {
            advice =  '有条件通过';
        } else {
            advice =  '尚未投票';
        }
        this.state = {
            propData: [
                {name: "人员", value: voteName},
                {name: "职务", value: position },
                {name: "投票意见", value: advice },
                {name: "处理时间", value: voteTime },
                {name: "会签任务", value: activityName },
                {name: "会签情况", value: "第"+sbhTimes+"次会签" },
                {name: "总体意见", value: comments },
            ]
        };

    }

    componentDidMount() {
        this.setState({})
    }

    render() {
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                {this.state.propData.map((item, i) =>
                    <Menu2
                        title={item.name}
                        value={item.value}
                        key={i} />
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: px2dp(90),
        alignItems: 'center',
        marginLeft: px2dp(25),
        marginRight: px2dp(25),
        borderBottomWidth: hair,
        borderBottomColor: '#8f8f8f'
    },

})


