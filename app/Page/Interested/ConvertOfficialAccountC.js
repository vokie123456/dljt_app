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
import Title from '../../Component/Title';
import {Button, SearchInput, SegmentedView, Select, ListRow, Overlay, Label,} from 'teaset';
import LegalPerson from '../Main/LegalPerson';
import BusinessTransaction from '../Main/BusinessTransaction';
import Guarantee from '../Main/Guarantee';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const DefaultSelect = (props) => {
    return (
        <Select
            style={{flex:.8, paddingLeft: px2dp(15), height: px2dp(60),borderColor: '#539af4'}}
            pickerType='popover'
            value={props.value}
            items={props.items}
            placeholder={props.placeholder}
            pickerTitle={`请选择 ${props.name}`}
            getItemValue={(item, index) => item.value}
            getItemText={(item, index) => item.text}
            onSelected={props.onSelected ? props.onSelected : () => console.log('没回调')}
        />

    )
}
export default class ConvertOfficialAccountC extends Component {
    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id: '',
            uid: '',
            customerValue: 'person_customer',
            customerKey: '个人',
            black: true,
            shadow: false,
            showArrow: true,
            // waiting: false,//防止多次重复点击
        };

    }

    componentDidMount() {
        this.setState({})
    }
    _search() {
        if(!isEmpty(this.state.uid)){
            this.setState({
                id: this.state.uid,
                // waiting: true,
            })
        }
        // setTimeout(()=> {
        //     this.setState({waiting: false})
        // }, 5000);//设置的时间间隔根据实际需要
    }
    _checkNum(text){
        if(!Tool.isMoney(text,"请输入客户编码")){
            this.setState({uid: ""});
            return;
        }else{
            this.setState({uid: text})
        }
    }
    showPop(type, modal, text) {
        let overlayView = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}
                ref={v => this.overlayPopView = v}
            >
                <View style={{
                    backgroundColor: Theme.defaultColor,
                    minWidth: 220,
                    minHeight: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Label type='title' size='x3' text={text}/>
                    {modal ? <View style={{height: 60}}/> : null}
                    {modal ? <Button title='Close'
                                     onPress={() => this.overlayPopView && this.overlayPopView.close()}/> : null}
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    customer = [{text: '个人', value: 'person_customer'}, {text: '企业', value: 'company_customer'}];

    render() {
        const {id}=this.state;
        return (
            <View style={styles.container}>
                <Title name={this.props.title} back/>
                <View style={styles.searchAll}>

                    <Icon name={'alert-circle-outline'} color={'red'} size={20}
                          style={{flex: .5,marginRight: px2dp(20), marginTop: px2dp(10)}}
                          onPress={() => this.showPop('zoomIn', false, '编号请到个人或企业页面查找')}
                    />
                    <SearchInput
                        onChangeText={(text) => this._checkNum(text)}
                        keyboardType="numeric"
                        value={this.state.uid}
                        style={{flex: 4, borderRadius: px2dp(15), height: px2dp(60)}}
                        // onSubmitEditing={()=>this._search()}
                        placeholder='请输入客户编号' returnKeyLabel="搜索" clearButtonMode='while-editing'/>
                    <Button
                        // disabled={this.state.waiting}
                        style={styles.searchStyle} title='搜索' type='primary'
                        onPress={() => this._search()}
                    />

                    <DefaultSelect placeholder={'请选择'} name={'职务'}
                                   value={(isEmpty(this.state.customerValue) ? this.state.customerValue : this.state.customerValue + "")}
                                   items={this.customer}
                                   onSelected={(item, index) => {
                                       this.setState({
                                           customerValue: item.value,
                                           customerKey: item.key
                                       })
                                   }}/>
                </View>
                <SegmentedView
                    indicatorLineColor={"#398ef6"}
                    style={{flex: 1, paddingTop: px2dp(0)}}>
                    <SegmentedView.Sheet title='业务往来'>
                        <BusinessTransaction id={id} judge={this.state.customerValue} />
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='作为第三方保证'>
                        <Guarantee id={id} judge={this.state.customerValue} />
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='作为法人'>
                        <LegalPerson id={id} judge={this.state.customerValue} />
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
    searchStyle: {
        flex: .8,
        height: px2dp(60),
        backgroundColor: '#5bb2fb',
        borderColor: '#539af4',
        marginLeft: px2dp(20),
    },
    searchAll: {
        flexDirection: 'row',
        padding: px2dp(20),
        paddingLeft: px2dp(15),
        borderBottomWidth: hair,
        borderBottomColor: '#ddd',
        paddingRight: px2dp(15),
        justifyContent: 'space-between',
    }
})

