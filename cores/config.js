/**
 * 配置文件控制器
 */

var defConfig = require('../configs/default');

if (defConfig.env != '') {

    var rewriteConfigSrc = '../configs/_' + defConfig.env;
    var rewriteConfig = require(rewriteConfigSrc);

    for (var name in rewriteConfig) {
        defConfig[name] = rewriteConfig[name];
    }
}

module.exports = defConfig;