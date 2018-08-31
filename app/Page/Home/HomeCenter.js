/**
 * Created by duansailong on 2018/2/6.
 */

'use strict';
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default class HomeCenter extends Component {

    static defaultProps = {}

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            count:null,
        };

    }

    componentDidMount() {
        storage.load({
            key: 'isLogin',
        }).then(ret => {
            if(!ret){
                Actions.Login();
            }else{
                this._repayment();//查询代办任务
            }
        }).catch(err => {
            Actions.Login();
            console.warn(err.message);
        })
    }

    _repayment (){
        let url = Config.baseApi + Config.taskApi.taskUrl + "?processName=ALL";
        RTRequest.fetch1(url).then((responseText) => {
            if (responseText) {
                console.log('代办任务数量', responseText.totalCounts);
                responseText.success ? this.setState({count:responseText.totalCounts}) : Toast.message(responseText.msg);
            }
        })
    }

    render() {
        const {count}=this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.centerLeft}
                    onPress={() => Actions.ProjectTracking()}
                >
                    {/*<LinearGradient start={{x: 0, y: 1}}*/}
                    {/*end={{x: 1, y: 0}} colors={['#F6F6F6', '#c8c8c8',]}*/}
                    {/*style={styles.linearGradient}>*/}
                    <ImageBackground style={styles.linearGradient}
                                     source={Images.billBG}>
                        <View style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                            <Text style={styles.topFont}>项目跟进</Text>
                            <Text style={styles.bottomFont}> </Text>
                        </View>
                    </ImageBackground>
                    {/*</LinearGradient>*/}
                </TouchableOpacity>
                <View style={{flex: .36}}/>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.centerRight}
                    onPress={() => Actions.MyTask()}
                >
                    {/*<LinearGradient start={{x: 0, y: 1}}*/}
                    {/*end={{x: 1, y: 0}} colors={['#F6F6F6', '#c8c8c8',]}*/}
                    {/*style={styles.linearGradient}>*/}
                    <ImageBackground style={styles.linearGradient}
                                     source={Images.billBG}>
                        <View style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                            <Text style={styles.topFont}>我的待办</Text>
                            <Text style={styles.bottomFont}>{count}</Text>
                        </View>
                    </ImageBackground>
                    {/*</LinearGradient>*/}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        flexDirection: 'row',
        marginTop: px2dp(25)
    },
    centerLeft: {
        flex: 5,
    },
    centerRight: {
        flex: 5,
    },
    topFont: {
        fontSize: px2dp(26),
        color: '#333',
        paddingTop: px2dp(7),
        paddingBottom: px2dp(7),
        paddingLeft: px2dp(23),
    },
    bottomFont: {
        fontSize: px2dp(36),
        color: '#3399fd',
        paddingLeft: px2dp(23),
    },
    linearGradient: {
        height: px2dp(140),
        justifyContent: 'center',
    }
})


