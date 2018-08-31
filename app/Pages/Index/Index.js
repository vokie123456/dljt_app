/**
 * Created by Rabbit on 2017/11/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SegmentedView} from 'teaset';
import RefundDetails from './RefundDetails';
import DataList from './DataList';
import DataListDetail from './DataListDetail';
import {createResponder} from "react-native-gesture-responder";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animateState: 1,
            h: px2dp(400),
            btnH: px2dp(370),
            viewIdx: 0,
        };

    }

    _onPress = () => {
        const {animateState} = this.state;
        if (animateState === 1) {
            this.openAnimation()
        } else {
            this.closeAnimation()
        }

    }
    openAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.8
            }
        });
        this.setState({h: px2dp(760), btnH: px2dp(725), animateState: 2})
    }
    closeAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.8
            }
        });
        this.setState({h: px2dp(400), btnH: px2dp(360), animateState: 1})
    }

    viewChange = (index) => {
        if (index === 0) {
            this.setState({
                viewIdx: 0
            }, () => {
                this.closeAnimation()
            })
        } else {
            this.setState({
                viewIdx: 1
            }, () => {
                LayoutAnimation.configureNext({
                    duration: 1000,   //持续时间
                    create: {
                        type: 'linear',
                        property: 'opacity'
                    },
                    update: {
                        type: 'spring',
                        springDamping: 0.9
                    }
                });
                this.setState({h: px2dp(150), animateState: 1})
            })
        }

    }
    move = 0;

    componentWillMount() {
        StatusBar.setBarStyle('light-content')
        this.gestureResponder = createResponder({
            onStartShouldSetResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetResponder: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: (evt, gestureState) => true,

            onResponderGrant: (evt, gestureState) => {
                this.move = 0
            },
            onResponderMove: (evt, gestureState) => {

                let {viewIdx} = this.state;
                if (viewIdx === 0) {
                    if (this.move < -20) {
                        this.closeAnimation()
                    } else if (this.move > 20) {
                        this.openAnimation()
                    }
                }

                this.move += (gestureState.moveY - gestureState.previousMoveY);


            },
            onResponderTerminationRequest: (evt, gestureState) => true,
            debug: false
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <LinearGradient start={{x: 0, y: 1}}
                                end={{x: 1, y: 0}} colors={['#37C3FF', '#3A93F5',]}
                                style={styles.linearGradient}>
                    <View style={{
                        height: px2dp(67), width: px2dp(67), backgroundColor: '#ccc', position: 'absolute'
                        , top: isIphoneX ? px2dp(70) : px2dp(30), left: px2dp(25), borderRadius: 30
                    }}/>

                    <SegmentedView style={{
                        height: this.state.h,
                        paddingTop: px2dp(60),
                        backgroundColor: 'transparent',
                    }}
                                   indicatorType='itemWidth'
                                   type='carousel'
                                   barStyle={{
                                       width: SCREEN_WIDTH - px2dp(200),
                                       backgroundColor: 'transparent',
                                       paddingLeft: px2dp(200)
                                   }}
                                   indicatorLineColor={'#fff'}
                                   onChange={(index) => this.viewChange(index)}
                    >
                        <SegmentedView.Sheet title='还款日历'
                                             titleStyle={{color: '#9BCAFB'}}
                                             activeTitleStyle={{color: '#fff'}}
                        >
	                        <RefundDetails/>
                        </SegmentedView.Sheet>
                        <SegmentedView.Sheet title='还款明细'
                                             titleStyle={{color: '#9BCAFB'}}
                                             activeTitleStyle={{color: '#fff'}}
                        >

                            <RefundDetails/>
                        </SegmentedView.Sheet>
                    </SegmentedView>
                </LinearGradient>

                {
                    this.state.viewIdx === 0 &&
                    <TouchableOpacity onPress={() => this._onPress()} style={{
                        position: 'absolute'
                        , top: this.state.btnH, left: SCREEN_WIDTH / 2 - px2dp(30)
                    }}>
                        <View style={styles.lineSty}/>
                        <View style={styles.lineSty}/>
                    </TouchableOpacity>
                }
                {
                    this.state.viewIdx === 0 ? <DataList/> :
                        <DataListDetail/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    linearGradient: {
        alignItems: 'center',

    },
    lineSty:
        {
            height: px2dp(3),
            width: 30,
            backgroundColor: '#ccc',
            marginTop: 3,
            borderRadius: 4
        }

});