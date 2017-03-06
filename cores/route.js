/**
 * 路由加载文件
 */

var fs = require('fs');
var path = require('path');
var control = require('./control');

function load(app) {

    // 载入中间件
    var middleWare = {};
    var middleList = fs.readdirSync(path.join(__dirname, '../routewares'));

    middleList.forEach(function (item) {

        var middleName = item.replace('.js', '');

        middleWare[middleName] = require('../routewares/' + item);
    });

    // 载入路由
    var routeList = fs.readdirSync(path.join(__dirname, '../routes'));

    routeList.forEach(function (item) {

        var fileName = '../routes/' + item;

        require(fileName)(app, control, middleWare);
    });

}

module.exports = load;