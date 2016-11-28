/**
 * 异常类集合
 */

class Page404Error extends Error {
    constructor(message) {
        super();

        this.name = this.constructor.name;
        this.message = message || '页面不存在';
        this.status = 404;
    }
}

class ApiError extends Error {
    constructor(message) {
        super();

        this.name = this.constructor.name;
        this.message = message || 'API请求出错';
    }
}

class NotLoginError extends Error {
    constructor(message) {
        super();

        this.name = this.constructor.name;
        this.message = message || '没有登陆授权';
    }
}

module.exports = {
    Page404Error: Page404Error,
    ApiError: ApiError,
    NotLoginError: NotLoginError
};