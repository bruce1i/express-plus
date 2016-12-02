/**
 * session设置文件
 *
 * store options:
 * ttl: Redis session TTL (expiration) in seconds
 * disableTTL: Disables setting TTL, keys will stay in redis until evicted by other means (overides ttl)
 * db: Database index to use
 * pass: Password for Redis authentication
 * prefix: Key prefix defaulting to "sess:"
 * unref: Set true to unref the Redis client. Warning: this is an experimental feature.
 * serializer: An object containing stringify and parse methods compatible with Javascript's JSON to override the serializer used
 * logErrors: Whether or not to log client errors. (default: false)
 *  > If true, a default logging function (console.error) is provided.
 *  > If a function, it is called anytime an error occurs (useful for custom logging)
 *  > If false, no logging occurs.
 */

var config = require('./config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = {
    /**
     * 设置session中间件
     * @return {Function}
     */
    getConf: function () {

        var second = 1000;

        var sessionOptions = {
            secret: 'express_plus',
            resave: true,
            rolling: true,
            saveUninitialized: true,
            cookie: {}
        };

        if (config.session_expires > 0) {

            sessionOptions.cookie.maxAge = config.env_tz + (config.session_expires * second);
        }

        if (config.session_store == 'redis') {

            var storeOptions = {
                host: config.session_redis_host,
                port: config.session_redis_port,
                db: config.session_redis_db,
                // prefix: 'bruce:',
                logErrors: true
            };

            if (config.session_redis_pass != '') {
                storeOptions.pass = config.session_redis_pass;
            }

            if (config.session_expires > 0) {
                storeOptions.ttl = config.session_expires;
            }

            sessionOptions.store = new RedisStore(storeOptions);
        }

        return session(sessionOptions);
    },

    /**
     * 检查session中间件
     * @return {Function}
     */
    check: function () {

        return function (req, res, next) {

            // console.log('check session')
            if (!req.session) {
                return next(new Error('oh no')); // handle error
            }

            next(); // otherwise continue
        };
    }
};