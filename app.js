var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//region express+配置项
var config = require('./config');
var routeLoad = require('./route');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

require('./log');
//endregion

var app = express();

//region 打印环境日志
if (config.env_output_profile_to_console) {
    console.log('> run app')
    console.log('> config');
    console.log(config);
}
//endregion

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

//region session
if (config.session_store == 'default') {

    app.use(session({
        secret: 'default_secret',
        resave: false,
        saveUninitialized: true
    }));
}
else if (config.session_store == 'redis') {

    app.use(session({
        secret: 'redis_secret',
        resave: false,
        saveUninitialized: true,
        store: new RedisStore({
            host: config.session_redis_host,
            port: config.session_redis_port
        })
    }));

    app.use(function (req, res, next) {

        if (!req.session) {
            return next(new Error('oh no')); // handle error
        }

        next(); // otherwise continue
    });
}
//endregion

//载入路由
routeLoad(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
