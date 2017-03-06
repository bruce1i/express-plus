/**
 * 控制器指向控制文件
 * @param src 控制器文件路径:控制器方法
 * @return callback
 */

var config = require('./config');
var view = require('../classes/view');

module.exports = function (src) {

    var srcItems = src.split(':');

    var control = require('../controllers/' + srcItems[0])[srcItems[1]];

    var callback = function (req, res, next) {

        res.view = function (viewname, params) {

            new view(this, viewname, params);

            // 初始化模板参数变量
            // if (params == null) {
            //     params = {};
            // }
            //
            // // 添加全局变量到模板参数
            // if (config.view_params) {
            //     for (var key in config.view_params) {
            //         params[key] = config.view_params[key];
            //     }
            // }
            //
            // this.view(view, params);
        };

        control(req, res, next);
    };

    return callback;
};