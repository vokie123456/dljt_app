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
import Title from '../../../Component/Title2';
import Icon from "react-native-vector-icons/Ionicons";
import SmallButton  from '../../../Component/SmallButton';
import BankAccountList from "./BankAccountList";
import ContactInformation from "../Detail/ContactInformation";
import FamilyInformation from "../Detail/FamilyInformation";

const Menu = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.pageName && Actions[props.pageName](props);
            }}
            style={{
                backgroundColor: '#fff',
                height: px2dp(100),
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{width: px2dp(90), alignItems: 'center'}}>
                <Icon color={'#12b7f5'} name={'md-copy'} size={20}/>
            </View>
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
export default class IndividualClientDetail extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log('props》》》》》》》》》》》》》》》', props)
        if (!isEmpty(this.props.flag)) {
            this.state={
                data:props.data,
                id:props.id,
                flag: true,
            }
        } else {
            this.state={
                id:props.id,
                flag:false
            }
        }
    }

    componentDidMount() {
        this.setState({})
    }

    //调整页面执行的生命周期
    componentWillReceiveProps(nextProps) {
        this.setState({})
    }

    render() {
        const{flag,id}=this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Title name={this.props.title} back toPop/>
                    {this.state.flag?<Menu name={'客户基本信息'} pageName={'ConvertOfficialAccountP'} id={id} flag={flag}/>:<View/>}
                    <Menu name={'配偶信息'} pageName={'SpouseInformation'} id={id} />
                    <Menu name={'工作情况'} pageName={'UnitInformation'} id={id}/>
                    <Menu name={'联系人信息'} pageName={'ContactPersonInformation'} id={id}/>
                    <Menu name={'银行开户信息'} pageName={'BankAccountList'} id={id}/>
                    <Menu name={'家庭信息'} pageName={'FamilyInformation'} id={id}/>
                    {this.state.flag? <Menu name={'业务往来'} pageName={'BusinessContact'} id={id}/>:<View/>}
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


