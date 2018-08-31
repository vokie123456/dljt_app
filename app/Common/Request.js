/**
 * Created by Rabbit on 2017/12/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';
import {
    AsyncStorage
} from 'react-native';
// 处理url
const encodeQuery = (url, params = {}) => {
    let _url = url;
    if (!params || !Object.keys(params).length) {
        return _url
    }


    _url = _url.indexOf("?") === -1 ? `${_url}?` : `${_url}&`;

    const query = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join("&");

    return `${_url}${query}`;
};

// 处理错误请求
const throwError = (json) => {
    const error = new Error(json)
    error.msg = json.msg;
    error.status = json.status;
    throw error;
};


const checkStatus = (resp, json) => {
    console.log('checkStatus', resp, json);
    // if (resp.respInfo.status === 200 && json.success) {
    if (resp.respInfo.status === 200) {
        return json;
    } else {
        throwError(json);
    }

    return json;
};
const joinParamsPost = async function (params) {
    storage.load({
        key: 'loginState',

        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,

        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true,

        // 你还可以给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: {
                // 各种参数
            },
            someFlag: true,
        },
    }).then(ret => {


        console.log(ret.userid);
        this.setState({user: ret});
    }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
    let token = await  storage.load({key: 'user'}).then(ret => ret && ret.token).catch(err => console.log(err));

    if (token) {
        if (params) {
            params = 'token=' + token + "&" + params;
        } else {
            params = 'token=' + token;

        }
    }
    console.log("params==" + params);
    return params;
}

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    /**
     * 设置Header请求头
     */
    header: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
    },
    /**
     * Config参数
     */
    config: {
        // 指示器,iOS专属
        // indicator:true,
        // 超时
        // timeout:3000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },

    /**
     *
     * @param method            请求方式GET, POST, PUT, DELETE
     * @param url               请求网址
     * @param params            请求参数
     * @param config            网络配置文件
     * @param header            请求头
     * @returns {Promise.<TResult>}
     *
     */
    fetch1: async (url, msg) => {
        console.log("请求url",url);
        return fetch(url,{
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=utf-8",
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: 'data='+msg
        }).then((response) => response.json()).catch(function (error) {
            console.log('获取用户登录数据报错信息: ' + error.message);
            Toast.message("登录超时，请重新登录");
            //Actions.Login();
        })
    },

    fetch: async ({method, url, params = {}, config = {}, header = {}}) => {
        let _method;
        let _params;
        let _url = url;
        let _config = {indicator: true, timeout: 3000, ...config};

        let _header = {'Content-Type': 'application/json', ...header};


        // let userData = await AsyncStorage.getItem('USER_TOKEN');

        if (!method) _method = 'GET';
        else _method = method.toUpperCase();

        if (_method === 'GET' && params) {
            _url = encodeQuery(url, params);
        }

        if (_method === 'POST' && params) {
            _params = JSON.stringify(params);
        }

        if (__DEV__) {
            console.log('_url:', _url);
            console.log('_config:', _config);
            console.log('_method:', _method);
            console.log('_header:', _header);
            console.log('_params:', _params);
        }

        return RNFetchBlob
            .config(_config)
            .fetch(_method, _url, _header, _params)
            .then(resp => {

                return checkStatus(resp, resp.json());
            })
            .then((response) => {
                console.log('then(response)===>', response)
                return response;
            })
            .catch((error) => {
                console.log('then(error)===>', error)
                throw error
            })
    },

    /**
     *
     * @param url       请求网址
     * @param params    参数
     * @param header    请求头
     * @param config    fetchblob配置
     * @returns
     *
     */
    get: (url, params = {}, header = {}, config = {}) => {

        return RTRequest.fetch({method: 'get', url, params, header, config})
            .then((data) => {
                // console.log(data);
                return data;
            })
            .catch((error) => {
                // console.log(error.msg);
                throw error;
            })
    },

    uploadPhoto: async (url, formData) => {
        console.log("请求url",url);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json()).catch(function (error) {
            console.log('获取用户登录数据报错信息: ' + error.message);
            Toast.message("请检查网络连接");
        })
    },

    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     *
     */
upload: (url, body, uploadProgress, successCallBack, failCallBack) => {
        return RNFetchBlob
            .config(Request.config)
            .fetch('POST', url, {
                'Content-Type': 'multipart/form-data',
            }, body)
            .uploadProgress((written, total) => {
                // 搜索进度打印
                // console.log('搜索进度:'+written / total);
            })
            .progress((received, total) => {
                let perent = received / total;
                // console.log('上传进度:' + perent);
                uploadProgress(perent);
            })
            .then((response) => {
                if (response.respInfo.status === 200) {
                    return response.json();
                } else {
                    return failCallBack(response);
                }
            })
            .then((response) => {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error) => {
                failCallBack(error);
            });
    },
    //post请求
    post: function (url, data, callback) {
        console.log(`%c请求地址==> ${url} `, 'background:#000;color:#B079B9');
        console.log(`%c请求参数==> ${JSON.stringify(data)} `, 'background:#000;color:#E81784');
        let fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                console.log(`%c返回结果==> ${responseText} `, 'background:#000;color:#FDC13E');
                callback ? callback(JSON.parse(responseText)) : console.log(JSON.parse(responseText));
                //callback(JSON.parse(responseText));
                // callback(responseText);
            }).done();
    },

    //get请求
    get1: function (url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                callback ? callback(JSON.parse(responseText)) : console.log(JSON.parse(responseText));
                // callback(responseText);
            }).done();
    },

    log: function (obj) {
        let description = "";
        for (let i in obj) {
            let property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    },


};

export default Request;
