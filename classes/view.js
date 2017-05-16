/**
 * view基类
 */

var config = require('../cores/config');

class view {
    constructor(res, view, params) {
        if (params == null) {
            params = {};
        }

        // 添加全局变量到模板参数
        if (config.global) {

            params._config = {
                global: config.global
            };
        }

        res.render(view, params);
    }
}

module.exports = view;