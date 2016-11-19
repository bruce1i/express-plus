/**
 * 示例路由
 */

module.exports = function (app, control) {

    app.get('/', control('demo/index'));

    app.get('/demo/set-session', control('demo/setSession'));

    app.get('/demo/get-session', control('demo/getSession'));

    app.get('/demo/log', control('demo/log'));

    app.get('/demo/api',control('demo/requestApi'));
};