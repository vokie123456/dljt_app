import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native' ;
import Title from '../../Component/Title'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker';

export default class UserSettings extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 状态
    state = {
        avatarSource: null
    };


    // 修改头像
    selectAvatar = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    // 渲染
    render() {
        const {avatarSource} = this.state;
        return (
            <View style={styles.defaultView}>
                <Title name={'账户设置'} back/>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.selectAvatar()}
                                      style={[styles.itemSty, {marginTop: px2dp(30)}]}>
                        <View style={styles.itemInsideSty}>
                            <Text style={{fontSize: px2dp(28), color: '#333'}}>sunshine</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    marginRight: px2dp(22),
                                    width: px2dp(88),
                                    height: px2dp(88),
                                    borderRadius: px2dp(44)
                                }}>
                                    <Image source={avatarSource ? avatarSource : Images.userBg}
                                           style={{width: px2dp(88), height: px2dp(88)}}/>
                                </View>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemSty, {height: px2dp(90)}]}>
                        <View style={styles.itemInsideSty}>
                            <Text style={{fontSize: px2dp(28), color: '#666'}}>手机号</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    marginRight: px2dp(22),
                                    borderRadius: px2dp(44)
                                }}>
                                    <Text style={{color: '#333', fontSize: px2dp(28)}}>18717788999</Text>
                                </View>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemSty, {height: px2dp(90)}]}>
                        <View style={[styles.itemInsideSty, {borderBottomWidth: 0}]}>
                            <Text style={{fontSize: px2dp(28), color: '#666'}}>身份证号</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    marginRight: px2dp(22),
                                    borderRadius: px2dp(44)
                                }}>
                                    <Text style={{color: '#333', fontSize: px2dp(28)}}>110*******213123123</Text>

                                </View>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemSty, {height: px2dp(90), marginTop: px2dp(30)}]}>
                        <View style={styles.itemInsideSty}>
                            <Text style={{fontSize: px2dp(28), color: '#666'}}>手势解锁设置</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    marginRight: px2dp(22),
                                    borderRadius: px2dp(44)
                                }}>
                                    <Text style={{color: '#333', fontSize: px2dp(28)}}>已开</Text>

                                </View>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemSty, {height: px2dp(90)}]}>
                        <View style={[styles.itemInsideSty, {borderBottomWidth: 0}]}>
                            <Text style={{fontSize: px2dp(28), color: '#666'}}>指纹解锁设置</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    marginRight: px2dp(22),
                                    borderRadius: px2dp(44)
                                }}>
                                    <Text style={{color: '#333', fontSize: px2dp(28)}}>已开</Text>

                                </View>
                                <Icon name={'ios-arrow-forward'} color={'#666666'} size={20}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.itemSty, {
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: px2dp(90),
                            marginTop: px2dp(30)
                        }]}>

                        <Text style={{fontSize: px2dp(30), color: '#666'}}>退出当前账户</Text>


                    </TouchableOpacity>
                </ScrollView>

            </View>
        );
    }

}

let styles = StyleSheet.create({
    defaultView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    itemSty: {
        backgroundColor: '#fff',
        height: px2dp(120),
        paddingLeft: px2dp(30),
        width: SCREEN_WIDTH
    },
    itemInsideSty: {
        paddingRight: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd'
    }
})
