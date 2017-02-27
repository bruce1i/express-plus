/**
 * 控制器指向控制文件
 * @param src 控制器文件路径:控制器方法
 * @return callback
 */
module.exports = function (src) {

    var srcItems = src.split(':');

    var callback = require('../controllers/' + srcItems[0])[srcItems[1]];

    return callback;
};