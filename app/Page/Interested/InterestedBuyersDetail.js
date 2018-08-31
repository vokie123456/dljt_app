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
import {NavigationBar} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SmallButton from '../../Component/SmallButton';


const Menu1 = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.pageName && Actions[props.pageName]({
                    data: props.data,
                    selectDisabled: props.selectDisabled,//选择框
                    inputDisabled: props.inputDisabled,//输入框
                    chooseDisabled: props.chooseDisabled,//选择回填
                    datePickerDisabled: props.datePickerDisabled,//日期选择框
                    defaultChecked: props.defaultChecked,//checkbox
                    type1: (isEmpty(props.type) ? "" : props.type),


                });
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
                <Text style={{fontSize: px2dp(27), color: '#333333'}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#757575'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
export default class InterestedBuyersDetail extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            prodData: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRefresh) {
            this._seeInterestedBuyers();
        }
    }


    componentDidMount() {
        this.setState({});
        this._seeInterestedBuyers();//查询意向客户 this._seeInterestedBuyers();//查询意向客户
    }

    _seeInterestedBuyers() {
        let url = Config.baseApi + Config.publicApi.seeInterestedBuyers + this.props.perId;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('意向客户列表', responseText);
                responseText.success ? this._render(responseText.data.bpCustProsperctive) : Toast.message(responseText.msg);
            }
        })
    }

    _render = (list) => {
        console.log("list", list);
        this.setState({
            prodData: list,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Title name={this.props.title} back toPop/>
                    <Menu1 name={'客户基本信息'} pageName={'AddPerson'} data={this.state} type={''} inputDisabled={false}
                           selectDisabled={false}/>
                    <Menu1 name={'借款意向信息'} pageName={'LoanIntention'} data={this.state} type={'lookAt'} perId={''}
                           inputDisabled={false} selectDisabled={false}/>
                    <Menu1 name={'跟进记录'} pageName={'FollowUpRecords'} data={this.state} inputDisabled={false}
                           selectDisabled={false}/>
                </View>
                <View style={{
                    borderBottomRightRadius: px2dp(30),
                    marginBottom: px2dp(50),
                    borderBottomLeftRadius: px2dp(30),
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>

                    <SmallButton style={{flex: 1}} name="客户跟进" height={70} width={240}
                                 onPress={() =>this._goDetail(this.state)}/>
                </View>
            </View>
        )
    }
    _goDetail(data) {
        Actions.FollowUpClient({data: data});
    }
}
//{/*  <SmallButton style={{flex: 1}} name="转为正式客户" height={70} width={240}
 //onPress={() => Actions.ConvertOfficialAccountP()}/>
 //<SmallButton style={{flex: 1}} name="转为正式客户" height={70} width={240}
// onPress={() => Actions.ConvertOfficialAccountC()}/>*/}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-between'
        },

    })


