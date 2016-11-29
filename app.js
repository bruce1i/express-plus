var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//region express+配置项
var config = require('./config');
var session = require('./session');
var routeLoad = require('./route');
var except = require('./class/exception');
var winston = require('winston');

require('./log');

// 打印环境日志
if (config.env_output_profile_to_console) {
    console.log('> run app')
    console.log('> config');
    console.log(config);
}
//endregion

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session.getConf());
app.use(session.check());

// 载入路由
routeLoad(app);

// catch 404 and forward to 404 page
app.use(function (req, res, next) {

    // code here to record log.

    res.render('error404');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    if (err instanceof except.ApiError) {
        var metadata = {
            ip: ip,
            url: req.url,
            type: err.type,
            error: err.error,
            message: err.message,
            reqArgs: err.reqArgs
        };

        if (err.type != -1) {
            winston.error(err.name, metadata);
        }

        res.render('error404');
    }
    else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            // error: {}
            error: err //调试用
        });
    }
});


module.exports = app;
