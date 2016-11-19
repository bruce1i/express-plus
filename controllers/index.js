/**
 * 示例控制器
 */

module.exports = function (req, res, next) {

    res.render('index', {desc: 'This is demo page.'});
};