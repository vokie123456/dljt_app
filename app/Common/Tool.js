/**
 * Created by Rabbit on 2017/5/11.
 */

import {
    AsyncStorage,
    Platform,
} from 'react-native';
import {Toast} from "teaset";


export default {
    async isLogin() {
        let data = await AsyncStorage.getItem('TOKEN');
        // console.log(data);
        if (data === null) {
            console.log('false');
            global.TOKEN = false;
            return false;
        } else {
            console.log('true');
            global.TOKEN = true;
            return true;
        }

    },
    //验证手机号
    isMobile(mobile, tip) {
        let mobileCodeReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!mobileCodeReg.test(mobile)) {
            Toast.message(tip ? tip : '请检查手机号是否正确');
            return false
        } else {
            return true
        }
    },
    isVerifyCode(number, tip) {
        let verifyCodeReg = /^\d{6}$/;
        if (!verifyCodeReg.test(number)) {
            Toast.message(tip ? tip : '请检查验证码是否正确');
            return false
        } else {
            return true
        }
    },
    isBusinessType(value) {
        if (value == 'SmallLoan') {
            return '借款业务'
        } else if (value == 'Pawn') {
            return '典当业务'
        } else if (value == 'Factoring') {
            return '保理业务'
        } else if (value == 'Guarantee') {
            return '担保业务'
        } else if (value == 'LeaseFinance') {
            return '租赁业务'
        } else {
            return '其他业务'
        }
    },
    //验证身份证号
    isIdCard(cardNum, tip){
        let idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!idCardReg.test(cardNum)) {
            Toast.message(tip ? tip : '请检查身份证号码是否正确');
            return false;
        } else {
            return true;
        }
    },
    //验证电子邮箱
    isEmail(email, tip){
        let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emailReg.test(email)) {
            Toast.message(tip ? tip : '请检查电子邮箱格式是否正确');
            return false;
        } else {
            return true;
        }
    },
    //验证邮政编码
    isPostCoding(postCode, tip){
        let postCodingReg = /^[1-9][0-9]{5}$/;
        if (!postCodingReg.test(postCode)) {
            Toast.message(tip ? tip : '请检查邮政编码格式是否正确');
            return false;
        } else {
            return true;
        }
    },
    //金额校验
    isMoney(num, tip){
        let money = /^(0|[1-9][0-9]*)$/;
        if (!money.test(num)) {
            Toast.message(tip ? tip : '请检查金额是否正确');
            return false;
        } else {
            return true;
        }
    },
    curUserInfo1() {
        storage.load({
            key: 'curUserInfo',
        }).then(ret => {
            console.log("全局登录信息", ret);
            if (ret) {
                return ret.tokenStr;
            } else {
                return '';
            }
        }).catch(err => {
            console.warn(err.message);
        })
    },
    iGetInnerText(testStr){
        let resultStr = testStr.replace(/\ +/g, ""); //去掉空格
        resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
        // resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
        return resultStr;
    }


}

// 设计图上的比例，宽度
let basePx = Platform.OS === 'ios' ? 750 : 720;

exports.px2dp = function px2dp(px) {
    return px / basePx * SCREEN_WIDTH;
};

//检查当前用户有权访问funKey对应的功能
exports.isGranted = async function isGranted(funKey) {
    let curUserInfo = "";
    await storage.load({
        key: 'curUserInfo',
    }).then(ret => {
        console.log("全局登录信息", ret);
        if (ret) {
            curUserInfo = ret.tokenStr;
            if (curUserInfo.rights.indexOf('__ALL') != -1) {
                return true;
            }
            var rights = curUserInfo.rights;
            var arr = rights.split(",");
            for (var i = 0; i < arr.length; i++) {
                if (funKey.trim() == arr[i].trim()) {
                    return true;
                }
            }
            return false;
        }
    }).catch(err => {
        console.warn(err.message);
    })

}
