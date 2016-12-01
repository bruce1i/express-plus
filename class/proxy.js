/**
 * api代理
 */

var httpsender = require('../httpsender');
var except = require('./exception');

class proxy {
    constructor(req, res) {
        this.req = req;
        this.res = res;
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
                that.req.json({error: error});
            });
    }
}

module.exports = {
    request: proxy
};