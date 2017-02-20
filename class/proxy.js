/**
 * api代理
 */

var httpsender = require('../httpsender');
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

        // 当没有传入formData参数时，从请求中提取
        if (args.formData == null && that.req.files && that.req.files.length > 0) {
            args.formData = {};
            // 表单提交，清空args.params参数
            args.params = {};

            for (var i = 0; i < that.req.files.length; i++) {
                var file = that.req.files[i];

                args.formData[file.fieldname] = {
                    value: file.buffer,
                    options: {
                        filename: file.originalname,
                        contentType: file.mimetype
                    }
                };
            }

            for (var key in that.req.body) {
                args.formData[key] = that.req.body[key];
            }
        }

        httpsender
            .request(args)
            .then(function (data) {
                if (args.json) {
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