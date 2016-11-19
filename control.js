/**
 * 控制器指向控制文件
 * @param src 控制器路径
 * @return func 回调方法
 */

module.exports = function (src) {

    var callback = require('./controllers/' + src);

    return callback;
};