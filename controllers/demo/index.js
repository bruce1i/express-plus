/**
 * 示例控制器
 */

var httpsender = require('../../httpsender');
var winston = require('winston');

module.exports = {

    testRedisSession: function (req, res, next) {

        if (req.session.test == null) {
            req.session.test = 1;
        }
        else {
            req.session.test = req.session.test + 1;
        }

        req.session.abc = 'world';

        res.send(req.session.test.toString());
    },

    home: function (req, res, next) {

        res.render('demo/index');

    },

    getSession: function (req, res, next) {

        res.render('demo/getSession', {session: req.session.test});

    },

    setSession: function (req, res, next) {
        // req.session.xxx 来设置session

        if (req.query.test != undefined) {
            req.session.test = req.query.test;
        }

        res.render('demo/setSession', {session: req.session.test});

    },

    // 请求api
    requestApi: function (req, res, next) {

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
    },

    log: function (req, res, next) {

        winston.profile('test profile');

        // winston.log('info', 'hello, test log.', function (err, level, msg, meta) {
        //     console.log('call back');
        // });

        winston.info('another way to log info level');

        winston.error('test error level');

        winston.warn('test warn level');

        winston.info('test info level');

        winston.verbose('test verbose level');

        winston.debug('test debug level');

        winston.silly('test silly level');

        winston.info('test metadata', {anything: 'This is metadata', two: 'heool,sdfs'});

        winston.profile('test profile');

        //region 查询日志
        // var queryOptions = {
        //     from: new Date - 24 * 60 * 60 * 1000,
        //     until: new Date,
        //     limit: 20,
        //     start: 0,
        //     order: 'desc',
        //     fields: ['anything']
        // };
        //
        // winston.query(queryOptions, function (err, results) {
        //
        //     console.log(results)
        // });
        //endregion

        // winston.stream({ start: -1 }).on('log', function(log) {
        //     console.log(log);
        // });

        // throw new Error('test exception');

        res.render('demo/log');

    }
};