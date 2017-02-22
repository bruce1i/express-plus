/**
 * 文件上传中间件
 */

var multer = require('multer');

var upload = {
    simple: function () {
        // 参数:([size,[fileType...]])
        // size单位为KB，默认大小为1M
        var fileSize = 1024 * 1024;  // 1024 * KB = 1M
        var acceptAnyFiles = true;
        var acceptMimeType = {};
        var fileExtMap = {
            png: 'image/png',
            jpg: 'image/jpeg',
            gif: 'image/gif',
            txt: 'text/plain',
            mp4: 'video/mpeg4',
            avi: 'video/avi',
            wmv: 'video/x-ms-wmv',
            mp3: 'audio/mp3'
        };
        var multerOpts = null;
        var multerAny = null;

        //region 获取参数，设置文件大小和文件类型
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') {
                fileSize = arguments[i] * 1024; // size * KB
            }
            else {
                acceptAnyFiles = false;
                acceptMimeType[fileExtMap[arguments[i]]] = true;
            }
        }
        //endregion

        multerOpts = {
            limits: {
                fileSize: fileSize
            },
            fileFilter: function (req, file, cb) {

                if (acceptAnyFiles) {
                    cb(null, true)
                }
                else if (acceptMimeType[file.mimetype]) {
                    cb(null, true)
                }
                else {
                    // 不是指定类型，过滤掉
                    // cb(null, false)

                    // 不是指定类型，抛出异常
                    var uploadError = new Error('File type error');
                    uploadError.code = 'LIMIT_FILE_TYPE';
                    cb(uploadError);
                }
            }
        };
        multerAny = multer(multerOpts).any();

        return function (req, res, next) {
            multerAny(req, res, function (err) {

                if (err) {
                    // An error occurred when uploading
                    if (err.code == 'LIMIT_FILE_TYPE') {
                        res.json({error: {code: 'LIMIT_FILE_TYPE'}});
                    }
                    else if (err.code == 'LIMIT_FILE_SIZE') {
                        res.json({error: {code: 'LIMIT_FILE_SIZE'}});
                    }
                    else {
                        res.json({error: {code: 'OTHERS'}});
                    }

                    return;
                }

                // Everything went fine
                next();
            })
        };
    }
};

module.exports = upload;