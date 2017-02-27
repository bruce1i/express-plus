/**
 * render基类
 */

class render {
    constructor(res, view, params) {
        if (params == null) {
            params = {};
        }

        // 在这里设置每个模版都可以使用的全局模版变量
        // params.__global__ = 'http://xxx.xxx.cn';

        res.render(view, params);
    }
}

module.exports = render;