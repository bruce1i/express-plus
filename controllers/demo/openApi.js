/**
 * 测试api
 *
 * req.headers['content-type'] 查看请求的内容类型
 */

var proxy = require('../../class/proxy');
var httpsender = require('../../httpsender');
var request = require('request');

module.exports = {
    demo1: function (req, res, next) {

        // req.query.xxx 获取get参数

        res.send('from demo1');

    },

    demo2: function (req, res, next) {

        // req.body.xxx; 获取post参数

        res.send('from demo2');

    },

    fileUpload: function (req, res, next) {
        console.log('> in control');
        console.log(req.file);
        console.log(req.files);
        console.log(req.body);
        console.log(req.body.t1);
        console.log(req.body.t2);
        console.log(req.headers['content-type']);

        res.send('from upload');
    },

    proxyFileUpload: function (req, res, next) {
        new proxy(req, res, next).request({api: 'post:uploadFileToServer'});
        console.log('proxyFileUpload')
        console.log(req.files[0].buffer)
        console.log(new Buffer(req.files[0].buffer))

        // httpsender
        //     .request({
        //         api: 'post:uploadFileToServer',
        //         formData: {
        //             file: {
        //                 value: req.files[0].buffer,
        //                 options: {
        //                     filename: 'test.jpg',
        //                     contentType: 'image/png'
        //                 }
        //             },
        //             filename: 'attachment'
        //         }
        //     })
        //     .then(function (data) {
        //         res.send(data);
        //     })
        //     .catch(function (error) {
        //         res.send(error)
        //     });


        // request({
        //         url: 'http://www.ckjapi.com/api/Common/upload',
        //         method: 'post',
        //         formData: {
        //             file: {
        //                 value: req.files[0].buffer,
        //                 options: {
        //                     filename: 'test.jpg',
        //                     contentType: 'image/png'
        //                 }
        //             },
        //             // file: req.files[0].buffer,
        //             filename: 'attachment'
        //         }
        //     },
        //     function (err, httpResponse, body) {
        //         // console.log(body)
        //         res.send(body)
        //     });
    }
};