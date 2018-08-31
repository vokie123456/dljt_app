import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, ImageBackground, Image} from 'react-native' ;

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationBar} from 'teaset';
import Button from '../../Component/BigButton'

export default class ChooseCompany extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {};


    // 自定义方法
    handle = () => {

    }
    ENTRIES1 = [
        {
            title: 'Beautiful and dramatic Antelope Canyon',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'http://i.imgur.com/UYiroysl.jpg'
        },
        {
            title: 'Earlier this morning, NYC',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
        },
        {
            title: 'White Pocket Sunset',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
            illustration: 'http://i.imgur.com/MABUbpDl.jpg'
        },
        {
            title: 'Acrocorinth, Greece',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
        },
        {
            title: 'The lone tree, majestic landscape of New Zealand',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
        },
        {
            title: 'Middle Earth, Germany',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'http://i.imgur.com/lceHsT6l.jpg'
        }
    ];

    _renderItem({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ImageBackground style={styles.image} source={Images.companyBg}>
                    <View style={{
                        position: 'absolute',
                        width: px2dp(180),
                        height: px2dp(180),
                        top: px2dp(-60),
                        borderRadius: px2dp(90),
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowOffset: {width: 5, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        shadowColor: '#2CA4F3',
                        //注意：这一句是可以让安卓拥有灰色阴影
                        elevation: 10,
                        zIndex: iOS ? 1 : 0,
                        borderWidth: px2dp(8),
                        borderColor: 'rgba(44,164,243,.5)',
                        backgroundColor: '#fff'
                    }}>
                        <Image
                            style={{
                                width: px2dp(120),
                                height: px2dp(70),
                                resizeMode: Image.resizeMode.stretch
                            }}
                            source={require('../../Resources/images/logo.png')}
                        />
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            width: px2dp(80),
                            height: px2dp(80),
                            bottom: px2dp(-30),
                            borderRadius: px2dp(90),
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowOffset: {width: 5, height: 4},
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            shadowColor: '#2CA4F3',
                            //注意：这一句是可以让安卓拥有灰色阴影
                            elevation: 5,
                            zIndex: iOS ? 1 : 0,

                            borderColor: 'rgba(44,164,243,.5)',
                            backgroundColor: '#2CA4F3'
                        }}
                    >
                        <Text style={{color: '#fff', fontSize: px2dp(40)}}>√</Text>
                    </View>
                </ImageBackground>
                <Text style={{position: 'absolute', fontSize: px2dp(36), color: '#333333'}}>北京互融时代软件有限公司</Text>
            </View>
        );
    }

    // 渲染
    render() {
        return (
            <View style={styles.defaultView}>
                <ImageBackground

                    source={Images.companyTitleBG}
                    style={{height: px2dp(422), width: SCREEN_WIDTH, position: 'absolute'}}
                />
                <NavigationBar
                    style={{backgroundColor: 'transparent', height: px2dp(130)}}
                    title={
                        <TouchableOpacity>
                            <Text style={{fontSize: px2dp(34), color: '#fff'}}>选择金融公司</Text>
                        </TouchableOpacity>
                    }
                    statusBarStyle='default'

                />
                <Carousel
                    ref={(c) => {
                        if (!this.state.slider1Ref) {
                            this.setState({slider1Ref: c});
                        }
                    }}
                    data={this.ENTRIES1}
                    renderItem={this._renderItem}
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={px2dp(575)}
                    firstItem={1}
                    inactiveSlideScale={0.75}
                    inactiveSlideOpacity={0.7}
                    enableMomentum={false}
                    loopClonesPerSide={1}
                    onSnapToItem={(index) => this.setState({slider1ActiveSlide: index}, () => console.log(this.state.slider1ActiveSlide))}
                    slideStyle={{marginTop: px2dp(137)}}
                />
                <Button name='进入' onPress={() => Actions.CompanyInvitationCode()} style={{marginTop: px2dp(200)}}/>

            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {},
    image: {
        height: px2dp(340),
        width: px2dp(590),
        alignItems: 'center',
        marginTop: px2dp(30),
        ...Platform.select({
            ios: {
                shadowOffset: {width: 5, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowColor: '#2CA4F3',
                //注意：这一句是可以让安卓拥有灰色阴影
                elevation: 5,
                zIndex: iOS ? 0 : 1,
                borderColor: 'rgba(44,164,243,.5)',
                backgroundColor: '#2CA4F3'
            }
        }),


    },
    item: {
        height: px2dp(441),
        width: px2dp(575),
        alignItems: 'center',
        justifyContent: 'center',

    },
    linearGradient: {
        alignItems: 'center',
        borderRadius: px2dp(45),
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
        zIndex: iOS ? 1 : 0,
        width: px2dp(580),
        height: px2dp(90),
        justifyContent: 'center',

    },
})
