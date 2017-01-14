/**
 * 测试api
 *
 * req.headers['content-type'] 查看请求的内容类型
 */

module.exports = {
    demo1: function (req, res, next) {

        // req.query.xxx 获取get参数

        res.send('from demo1');

    },

    demo2: function (req, res, next) {

        // req.body.xxx; 获取post参数

        res.send('from demo2');

    }
};