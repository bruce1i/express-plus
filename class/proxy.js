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

        if (that.req.files.length > 0) {
            args.json = false;

            var currFile = that.req.files[0];

            var formData = {};
            formData[currFile.fieldname] = {
                value: currFile.buffer,
                options: {
                    filename: 'sfasf.png',
                    contentType: 'image/jpeg'
                }
            };
            formData['filename'] = 'attachment';

            args.formData = formData;
        }

        console.log(args)


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