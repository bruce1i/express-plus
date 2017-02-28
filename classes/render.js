/**
 * render基类
 */

var config = require('../cores/config');

class render {
    constructor(res, view, params) {
        if (params == null) {
            params = {};
        }

        // 添加全局变量到模板
        if (config.view_params) {
            for (var key in config.view_params) {
                params[key] = config.view_params[key];
            }
        }

        // 在这里设置每个模版都可以使用的全局模版变量
        // params.__global__ = 'http://xxx.xxx.cn';

        res.render(view, params);
    }
}

module.exports = render;