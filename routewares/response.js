/**
 * Created by lixun on 2017/2/22.
 */

/**
 * 响应中间件
 */

var view = require('../classes/view');

var response = {
    render: function (viewname, params) {

        return function (req, res, next) {
            res.render(viewname, params || {});
        };
    },

    view: function (viewname, params) {

        return function (req, res, next) {
            new view(res, viewname, params);
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