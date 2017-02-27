/**
 * api代理
 */

var httpsender = require('../cores/httpsender');
var except = require('./exception');

class proxy {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    request(args) {
        var that = this;

        // 当没有传入params参数时，从请求中提取
        if (args.params == null) {
            args.params = {};

            for (var key in that.req.query) {
                args.params[key] = that.req.query[key];
            }

            for (var key in that.req.body) {
                args.params[key] = that.req.body[key];
            }
        }

        if (that.req.headers['content-type'] && that.req.headers['content-type'].indexOf('multipart/form-data') > -1) {
            // 有上传文件
            if (that.req.files && that.req.files.length > 0) {
                for (var i = 0; i < that.req.files.length; i++) {
                    var file = that.req.files[i];

                    args.params[file.fieldname] = {
                        value: file.buffer,
                        options: {
                            filename: file.originalname,
                            contentType: file.mimetype
                        }
                    };
                }
            }

            args.type = 'form';
        }

        httpsender
            .request(args)
            .then(function (data) {
                if (typeof data == 'object') {
                    that.res.json(data);
                }
                else {
                    that.res.send(data);
                }
            })
            .catch(function (error) {
                that.next(new except.ProxyError(error));
            });
    }
}

module.exports = proxy;