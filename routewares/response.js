/**
 * Created by lixun on 2017/2/22.
 */

/**
 * 响应中间件
 */

var response = {
    render: function (viewname, params) {

        return function (req, res, next) {
            res.render(viewname, params || {});
        };
    },

    json: function (params) {

        return function (req, res, next) {
            res.json(params);
        };
    },

    send: function (params) {

        return function (req, res, next) {
            res.send(params);
        };
    }
};

module.exports = response;