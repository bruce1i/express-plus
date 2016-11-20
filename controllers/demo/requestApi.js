/**
 * api请求
 */

var httpsender = require('../../httpsender');

module.exports = function (req, res, next) {

    // httpsender
    //     .request({
    //         api: 'get:demo1',
    //         json: false
    //     })
    //     .then(function (data) {
    //
    //         res.render('demo/api', {data: data});
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //     });

    // 请求范例
    httpsender
        .request(
            {api: 'get:demo1', json: false},
            {api: 'post:demo2', params: {a: 'hello'}, json: false},
            {url: 'http://127.0.0.1:3000/api/demo1', json: false},
            {url: 'http://127.0.0.1:3000/api/demo2', method: 'post', json: false}
        )
        .then(function (data) {

            res.render('demo/api', {data: data.join(', ')});
        })
        .catch(function (error) {
            console.log(error)

            res.render('demo/api', {data: 'error'});
        });

    // 测试报错
    // httpsender.request();
};