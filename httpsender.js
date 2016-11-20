/**
 * api请求方法（Promise调用）
 */

var request = require('request');
var apiSet = require('./api');

function send(args) {

    if (arguments.length == 1) {
        return one(args);
    }
    else if (arguments.length > 1) {
        return all(arguments);
    }
    else {
        throw new Error('httpsender:没有设置请求参数');
    }
}

/**
 * 请求一个api
 * @param args 参数支持的项 {api(string:api接口名称和请求方式), params(obj:请求参数), json(bool:转换返回结果为json格式,默认true), random(bool:添加_r随机数来避免请求缓存,默认false)}
 */
function one(args) {

    var p = new Promise(function (resolve, reject) {

        var requestOptions = {};
        var reqMethod = '';

        // 设置超时
        requestOptions.timeout = 5000;

        //region 处理请求url
        if (args.url != null) {

            if (args.method == null) {
                args.method = 'get';
            }

            requestOptions.url = args.url;

            reqMethod = args.method;
        }
        else if (args.api != null) {

            // 分解自定义api规则, 获取请求方式和api名称(0为method，1为api keyname)
            var apiItems = args.api.split(':');

            requestOptions.url = apiSet[apiItems[1]];

            reqMethod = apiItems[0];
        }
        else {
            throw new Error('httpsender:没有设置请求url');
        }
        //endregion

        // 设置请求方式
        requestOptions.method = reqMethod.toUpperCase();

        //region 处理请求参数
        if (args.params == null) {
            args.params = {};
        }

        if (args.random == true) {
            args.params._r = Math.floor(Math.random() * 100000000).toString();
        }

        if (reqMethod == 'get') {
            requestOptions.qs = args.params;
        }
        else {
            requestOptions.form = args.params;
        }
        //endregion

        // 设置数据返回格式（json默认为true）
        if (args.json == null) {
            args.json = true;
        }

        request(
            requestOptions,
            function (error, response, body) {

                if (error) {
                    reject('请求出错.');
                }
                else {

                    if (args.json == true) {
                        // json转换
                        try {
                            var jsonResult = JSON.parse(body);

                            resolve(jsonResult);
                        }
                        catch (e) {
                            /** 转换json失败，请求标示为失败 */
                            reject('解析json数据出错.');
                        }
                    }
                    else {
                        resolve(body);
                    }
                }
            }
        );
    });

    return p;
}

/**
 * 请求多个api，需要所有api都完成才执行
 * @param reqList
 */
function all(reqList) {

    var promiseList = [];

    for (var i = 0; i < reqList.length; i++) {
        promiseList.push(one(reqList[i]));
    }

    return Promise.all(promiseList);
}

module.exports = {
    request: send
};