/**
 *  error handler
 */

var winston = require('winston');
var config = require('./config');
var except = require('../classes/exception');

module.exports = function (err, req, res, next) {

    // 获取用户ip
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // 获取当前日期
    var currDate = new Date(Date.now() + config.env_tz);

    // 设置默认元数据
    var metadata = {
        ip: ip,
        url: req.url,
        time: currDate,
        time_ms: currDate.getTime()
    };

    if (err instanceof except.Page404Error) {
        metadata.message = err.message;

        winston.error(err.name, metadata);
        res.render('error404');
    }
    else if (err instanceof except.ApiError) {
        metadata.type = err.type;
        metadata.error = err.error;
        metadata.message = err.message;
        metadata.reqArgs = err.reqArgs;

        winston.error(err.name, metadata);

        if (err instanceof except.ProxyError) {
            res.json({error: 500});
        }
        else {
            res.render('error404');
        }
    }
    else {
        winston.error('Error', metadata);

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
            // error: err //调试用
        });
    }
};