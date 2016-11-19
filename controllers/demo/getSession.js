/**
 * 查看session
 */

module.exports = function (req, res, next) {

    res.render('demo/getSession', {session: req.session.test});

};