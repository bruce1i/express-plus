/**
 * 示例路由
 */

module.exports = function (app, control, upload) {

    app.get('/', control('demo/index:home'));

    app.get('/demo/set-session', control('demo/index:setSession'));

    app.get('/demo/get-session', control('demo/index:getSession'));

    app.get('/demo/log', control('demo/index:log'));

    app.get('/demo/api', control('demo/index:requestApi'));

    app.get('/demo/redis', control('demo/index:testRedisSession'));

    app.get('/demo/404', control('demo/index:test404'));

    app.get('/demo/file-upload', control('demo/index:fileUpload'));

    /** openApi (openApi用于本站自己提供的api) */
    app.get('/api/demo1', control('demo/openApi:demo1'));

    app.post('/api/demo2', control('demo/openApi:demo2'));

    /**
     *      upload.simple(200,'txt','jpg','png')
     *      upload.simple({size:300,ext:[]});
     *      upload.all()
     *      upload.single();
     */
    app.post('/api/fileUpload', upload.simple(200, 'png'), control('demo/openApi:fileUpload'));

    app.post('/api/proxyFileUpload', upload.simple(400), control('demo/openApi:proxyFileUpload'));

    // test
    app.get('/test', control('demo/index:yali'));
};