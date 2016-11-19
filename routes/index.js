/**
 * 示例路由
 */

module.exports = function (app, control) {

    app.get('/', control('index'));

    app.get('/home', control('index'));
};