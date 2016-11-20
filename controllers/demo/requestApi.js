/**
 * req.session.xxx 来设置session
 */

var httpReq = require('../../api-request');

module.exports = function (req, res, next) {

    // httpReq
    //     .one({
    //         api: 'get:demo1',
    //         json: false
    //     })
    //     .then(function (data) {
    //
    //         res.render('demo/api', {data: data});
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //     });

    // httpReq
    //     .one({
    //         api: 'post:demo2',
    //         json: false
    //     })
    //     .then(function (data) {
    //
    //         res.render('demo/api', {data: data});
    //     })
    //     .catch(function (error) {
    //         console.log(error)
    //     });

    httpReq
        .all([
            {api: 'get:demo1', json: false},
            {api: 'post:demo2', json: false}
        ])
        .then(function (data) {

            res.render('demo/api', {data: data[0] + ', ' + data[1]});
        })
        .catch(function (error) {
            console.log(error)
        });
};