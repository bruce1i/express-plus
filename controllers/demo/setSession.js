/**
 * req.session.xxx 来设置session
 */

module.exports = function (req, res, next) {

    if (req.query.test != undefined) {
        req.session.test = req.query.test;
    }

    res.render('demo/setSession', {session: req.session.test});

};