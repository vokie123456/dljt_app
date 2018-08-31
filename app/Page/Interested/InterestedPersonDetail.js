/**
 * Created by duansailong on 2018/3/21.
 */
'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Title from '../../Component/Title';
import Icon from "react-native-vector-icons/Ionicons";
import SmallButton  from '../../Component/SmallButton';

const Menu = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.pageName && Actions[props.pageName].call();
            }}
            style={{
                backgroundColor: '#fff',
                height: px2dp(100),
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#EEEEEE',
                height: px2dp(100)
            }}>
                <Text style={{fontSize: px2dp(28), color: '#333333',marginLeft: px2dp(35)}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
export default class InterestedPersonDetail extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

    }

    componentDidMount() {
        this.setState({})
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Title name={this.props.title} back/>
                    <Menu name={'配偶信息'} pageName={'SpouseInformation'}/>
                    <Menu name={'单位信息'} pageName={'UnitInformation'}/>
                    <Menu name={'联系人信息'} pageName={'ContactInformation'}/>
                    <Menu name={'银行开户信息'} pageName={'BankAccountInformation'}/>
                    <Menu name={'家庭信息'} pageName={'FamilyInformation'}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

})


