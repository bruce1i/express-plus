/**
 * Created by lixun on 2017/2/22.
 */

/**
 * 检查中间件
 */

var UserSession = require('../classes/user-session');

var check = {
    login: function (args) {

        return function (req, res, next) {
            var user = new UserSession(req);

            if (user.get() != null) {
                next();
            }
            else if (args != null) {
                if (args.view) {
                    res.render(args.view);
                }
                else if (args.redirect) {
                    res.redirect(args.redirect);
                }
            }
            else {
                res.json({error: {code: 'NOT_LOGIN'}});
            }
        };
    }
};

module.exports = check;