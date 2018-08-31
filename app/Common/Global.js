import React, {Component} from 'react';
import {Dimensions, AsyncStorage, PixelRatio, Platform, Alert,StyleSheet} from 'react-native';

// 项目中的图片可以通过Images.xxx 获取
import {Images} from '../Resources/index';
// 存储用户信息
import store from 'react-native-simple-store';
// 项目中的图片可以通过Menus[i].xxx 获取
import {Menus} from '../Page/Menu/index';
//判断是不是iphonex
import {isIphoneX} from 'react-native-iphone-x-helper'
// 统一管理项目中的路由
import {Actions} from "react-native-router-flux";
// 处理安卓，iOS字体不同的类，使用方法 fontSize:FONT_SIZE(20)
import FontSize from './FontSize';
// 处理安卓，iOS宽高的区别，使用方法 width:px2dp(20)
import {px2dp,isGranted} from './Tool';
// 公用的方法
import Tool from './Tool'

// teaset中提供的一些常用方法
import {Theme, Toast} from 'teaset';
//所有校验方法
import {isEmpty,encode64} from './AllCheck';
// 基于react-native-fetch-blob封装的网络请求
import RTRequest from './Request';
// 配置文件，可以放网络请求等
import Config from './Config';
// 全局存储对象
import Storage from 'react-native-storage';
//图标
import Icon from 'react-native-vector-icons/Ionicons';
let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24 * 7,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,


})
// 通过系统API获得屏幕宽高
let {height, width} = Dimensions.get('window');


// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 图标
global.Icon = Icon;
// 校验
global.isEmpty = isEmpty;
// 校验
global.encode64 = encode64;
// 最细线条
global.hair = StyleSheet.hairlineWidth;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
// 适配字体
global.FONT_SIZE = FontSize;
// 屏幕适配
global.px2dp = px2dp;
// 屏幕适配
global.isGranted = isGranted;
// 主题
global.Theme = Theme;
// 网络请求
global.RTRequest = RTRequest;
// 配置
global.Config = Config;
// router跳转的方法
global.Actions = Actions;
// 图片加载
global.Images = Images;
// 图片加载
global.Menus = Menus;
// 弹出框
global.Alert1 = Alert.alert;
// 存储
global.AsyncStorage = AsyncStorage;
// 弹框Toast
global.Toast = Toast;
// 判断是否是iphonex
global.isIphoneX = isIphoneX()
// 存储对象
global.storage = storage;
// 公用方法
global.Tool = Tool
//分页参数
global.limits = 7;
global.pages = 0;



