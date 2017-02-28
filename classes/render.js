/**
 * render基类
 */

var config = require('../cores/config');

class render {
    constructor(res, view, params) {
        if (params == null) {
            params = {};
        }

        // 添加全局变量到模板参数
        if (config.view_params) {
            for (var key in config.view_params) {
                params[key] = config.view_params[key];
            }
        }

        res.render(view, params);
    }
}

module.exports = render;