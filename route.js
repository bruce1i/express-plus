/**
 * 路由加载文件
 */

var fs = require('fs');
var path = require('path');
var control = require('./control');
var form = require('./upload');

function load(app) {

    var list = fs.readdirSync(path.join(__dirname, 'routes'));

    list.forEach(function (item) {

        var fileName = './routes/' + item;

        require(fileName)(app, control, form);
    });

}

module.exports = load;