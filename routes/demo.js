/**
 * 示例路由
 */

module.exports = function (app, control) {

    app.get('/', control('demo/index:home'));

    app.get('/demo/set-session', control('demo/index:setSession'));

    app.get('/demo/get-session', control('demo/index:getSession'));

    app.get('/demo/log', control('demo/index:log'));

    app.get('/demo/api', control('demo/index:requestApi'));

    app.get('/demo/redis', control('demo/index:testRedisSession'));

    app.get('/demo/404', control('demo/index:test404'));

    /** openApi (openApi用于本站自己提供的api) */
    app.get('/api/demo1', control('demo/openApi:demo1'));

    app.post('/api/demo2', control('demo/openApi:demo2'));
};