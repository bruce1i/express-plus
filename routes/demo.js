/**
 * 示例路由
 */

var multer = require('multer');
var upload = multer({
    limits: {
        fileSize: 200 * 1024
    },
    fileFilter: function (req, file, cb) {
        console.log('> fileFilter')
        console.log(req.body)
        console.log(file)
        console.log(cb)

        if (file.mimetype != 'image/png') {
            cb(null, false);
        }
        else {
            cb(null, true)
        }
    }
});

module.exports = function (app, control, form) {

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

    // app.post('/api/fileUpload', upload.single('ff1'), control('demo/openApi:fileUpload'));
    // app.post('/api/fileUpload', upload.any(), control('demo/openApi:fileUpload'));
    // app.post('/api/fileUpload', function (req, res, next) {
    //     upload.any()(req, res, function (err) {
    //         console.log('> upload error');
    //         console.log(err)
    //         if (err) {
    //             // 发生错误
    //             res.send('upload error');
    //             return
    //         }
    //
    //         // 一切都好
    //         next();
    //     })
    // }, control('demo/openApi:fileUpload'));
    app.post('/api/fileUpload', form.simple(500), control('demo/openApi:fileUpload'));

    app.post('/api/proxyFileUpload', form.simple(400), control('demo/openApi:proxyFileUpload'));

    // upload.upload() upload.imgUpload() upload.multerSingle() upload.multerAll()
    // upload.files upload.imgFiles
    /**
     *      upload.simple(200,'txt','jpg','png')
     *      upload.simple({size:300,ext:[]});
     *      upload.all()
     *      upload.single();
     */

    // test
    app.get('/test', control('demo/index:yali'));
};