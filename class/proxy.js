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