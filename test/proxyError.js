/**
 * Created by lixun on 2016/12/2.
 */

var except = require('../class/exception');

try {
    throw new except.ProxyError({});
} catch (e) {
    if (e instanceof except.ApiError) {
        console.log('api error')

        if (e instanceof except.ProxyError) {
            console.log('proxy error');
        }
    }
}
