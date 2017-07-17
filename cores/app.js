var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

//region express+配置项
var config = require('./config');
var session = require('./session');
var routeLoad = require('./route');
var errorHandler = require('./error');
var except = require('../classes/exception');

require('./log');

// 打印环境日志
if (config.env_output_profile_to_console) {
    console.log('> run app');
    console.log('> config');
    console.log(config);
}
//endregion

var app = express();

// gzip设置
if (config.env_gzip) {
    app.use(compression());
}

// 配置robots.txt爬虫屏蔽文件，非正式环境一律禁止爬取，正式环境默认不屏蔽，可以自己在robots.txt中配置
app.get('/robots.txt', function (req, res, next) {
    if (config.env == 'www') {
        next();
    }
    else {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    }
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 1.4.x版本开始，调整app.use(bodyParser.text({type: '*/*'})) 为 app.use(bodyParser.text({type: 'text/*'}))
// 当content-type为文本类型时，返回原始字符串，使用req.body查看
// 默认没有启用，有需要自己取消注释打开使用
// 备注：在控制器中用req.headers['content-type']查看请求的内容类型
// app.use(bodyParser.text({type: 'text/*'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// session
if (config.session_switch) {
    app.use(session.getConf());
    app.use(session.check());
}

// 载入路由
routeLoad(app);

// catch 404 and forward to 404 page
app.use(function (req, res, next) {
    next(new except.Page404Error());
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
app.use(errorHandler);


module.exports = app;
