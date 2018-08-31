/**
 * 项目跟进
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Title from '../../Component/Title';
export default class ProjectTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodData: [],
            items: {},
            stateData: true,
            stateList: 0,
        };
    }

    componentDidMount() {
        this.setState({});
        this._userList();
    }

    _userList() {
        let url = Config.baseApi + Config.publicApi.interestedBuyers + "start=0&limit=" + 20;
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                responseText.success ? this._render(responseText.result, responseText.totalCounts) : Toast.message(responseText.msg);
            }
        })
    }

    _render = (list) => {
        let dataBlob = [];
        let i = 0;
        list.map(function (item, index) {
            dataBlob.push({
                key: index,
                value: item,

            });
            i++;
        });
        this.setState({
            prodData: dataBlob,
        });
        console.log('---prodData--', this.state.prodData);
    };


    render() {
        return (
            <View style={styles.container}>
                <Title name={'跟进提醒'} back/>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}

                    //标记日期显示

                    // monthFormat={'yyyy'}

                    //日期主题
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            </View>
        );
    }

    loadItems(day) {
        this.setState({
            stateList: (this.state.stateList + 1)
        });
        if (this.state.stateData || this.state.stateList > 2) {

            this.state.items = {};
            let items_temp = {};

            const time = day.timestamp;
            const strTime = this.timeToString(time);
            if (!items_temp[strTime]) {
                items_temp[strTime] = [];
                for (let j = 0; j < this.state.prodData.length; j++) {

                    if (this._subStrData1(this.state.prodData[j].value.createDate) == strTime) {
                        items_temp[strTime].push({
                            name: this.state.prodData[j].value.customerName + '-' + this.state.prodData[j].value.department,
                            data: strTime,
                            followUpType: this.state.prodData[j].value.followUpType = 933 ? '已完成' : '待跟进',
                            lastFollowUpDate: this._subStrData(isEmpty(this.state.prodData[j].value.lastFollowUpDate) ? '' : this.state.prodData[j].value.lastFollowUpDate),
                        });
                    }
                    console.log(this.state.prodData[j].value.createDate + '-------item--------' + strTime);

                }
                console.log('-------item--------' + items_temp);
            }
            this.setState({
                stateData: false,
                items: items_temp,
            });

            setTimeout(() => {

                console.log(this.state.items);
                console.log(items_temp);
                const newItems = {};
                Object.keys(this.state.items).forEach(key => {
                    newItems[key] = this.state.items[key];
                });
                this.setState({
                    items: newItems,
                });
            }, 500);
            console.log(`Load Items for ${day.year}-${day.month}`);
        }
        if (this.state.stateList == 2) {
            this.setState({
                stateList: (this.state.stateList + 1)
            });
        }

        console.log('-------item1111111--------' + this.state.stateList);
    }

    _subStrData = (recode1, value) => {
        let b = recode1.split(' ', recode1.length);
        return b[b.length - 1];
    };
    _subStrData1 = (recode1, value) => {
        let b = recode1.split(' ', recode1.length);
        return b[0];
    };

    renderItem(item) {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                height: px2dp(100),
                backgroundColor: '#ffffff',
                marginTop: px2dp(30),
                borderRadius: px2dp(20),
                marginRight: px2dp(30), paddingLeft: px2dp(30), paddingTop: px2dp(30)
            }}>
                <Text style={{fontSize: px2dp(27), color: '#333333'}}>{item.name}</Text>

            </View>
        );
    }

// <Icon name={'ios-arrow-forward'} color={'#757575'} size={20} style={{marginRight: px2dp(35)}}/>
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>暂无提醒!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: px2dp(5),
        padding: px2dp(10),
        marginRight: px2dp(10),
        marginTop: px2dp(17),
        width: Dimensions.get('window').width,
    },
    emptyDate: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        height: px2dp(100),
        backgroundColor: '#ffffff',
        marginTop: px2dp(30),
        borderRadius: px2dp(20),
        marginRight: px2dp(30), paddingLeft: px2dp(30), paddingTop: px2dp(30)

    }
});


