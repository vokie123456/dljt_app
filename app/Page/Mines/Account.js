import React, {Component} from 'react';
import {View, Text,NativeModules, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from 'react-native' ;
import Icon from 'react-native-vector-icons/Ionicons'
import {Badge} from 'teaset';

const Menu = (props) => {
    let that=props.this;
    return (
        <TouchableOpacity
            onPress={() => {
                isEmpty(props.onPress)?props.pageName && Actions[props.pageName]({props:props}):that._exit();
            }}
            style={{
                backgroundColor: '#fff',
                height: px2dp(100),
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <View style={{width: px2dp(90), alignItems: 'center'}}>
                <Icon name={'logo-twitter'} size={20}/>
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
                <Text style={{fontSize: px2dp(28), color: '#333333'}}>{props.name}</Text>

                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20} style={{marginRight: px2dp(35)}}/>
            </View>
        </TouchableOpacity>
    )
}
export default class Account extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            fullname: '',
            mobile: '',
        };
    }
    componentDidMount() {
        storage.load({
            key: 'curUserInfo'
        }).then(ret => {
            console.log("????????", ret);
            this.setState({
                fullname: ret.tokenStr.fullname,
                mobile: ret.tokenStr.mobile
            })
        }).catch(err => {
            console.warn(err.message);
        })
        // this._cache();//获取缓存大小
    }
    _exit=()=>{
        storage.save({
            key: 'curUserInfo',
            data: {
            }
        });
        storage.save({
            key: 'isLogin',
            data: false
        });
        storage.clearMap();
        Actions.Login();
    }
    _cache(){
        NativeModules.HttpCache.getHttpCacheSize().then((value)=> {
            /**
             对应原生模块中的代码：promise.resolve(((double)(size1+size2)));
             */
            let size=Math.round((value / 1024 / 1024) * 100) / 100 + 'M';
            Toast.message(size)
        }, (erro)=> {
            /**
             对应原生中的代码：
             try（）｛｝catch (Exception e){
                promise.reject(e);
                return;
            }
             */
        })
    }
    // 渲染
    render() {
        const {fullname,mobile} =this.state;
        return (
            <View style={styles.defaultView}>
                <ImageBackground
                    source={Images.accountBG}
                    style={{height: px2dp(328), width: SCREEN_WIDTH, position: 'absolute'}}
                >
                    <View style={{position: 'absolute', backgroundColor: 'transparent'}}>
                        <View style={{
                            height: isIphoneX ? px2dp(143) : px2dp(113),
                            width: SCREEN_WIDTH,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',

                        }}>

                        </View>

                    </View>
                    <View style={{
                        position: 'absolute', backgroundColor: 'transparent', top: isIphoneX ? px2dp(143) : px2dp(113),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: 'rgba(121,220,250,.5)', height: px2dp(108),
                            width: px2dp(108), alignItems: 'center', borderRadius: px2dp(54), marginLeft: px2dp(30)
                        }}>
                            <Icon name={'md-person'} color={'#BFEEFD'}
                                  size={px2dp(100)}/>
                        </View>
                        <View style={{marginLeft: px2dp(22)}}>
                            <Text style={{fontSize: px2dp(34), color: '#fff'}}>{fullname}</Text>
                            <Text style={{fontSize: px2dp(30), marginTop: px2dp(15), color: '#c2e3ff'}}>{mobile}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, marginTop: px2dp(328)}}>
                    <Menu name={'个人资料'} pageName={'Mine'} inputDisabled={true} selectDisabled={true} this={this}/>
                    <Menu name={'编辑资料'} pageName={'Mine'} inputDisabled={false} selectDisabled={false} this={this}/>
                    <View style={{height: px2dp(20)}} />
                    <Menu name={'修改密码'} pageName={'ChangePassword'} this={this}/>
                    <Menu name={'退出登录'} pageName={'Mine'} onPress this={this}/>
                </ScrollView>

                <View style={{
                    zIndex: -1,
                    position: 'absolute',
                    bottom: px2dp(22),
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SCREEN_WIDTH
                }}>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    }
})