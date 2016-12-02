/**
 * 异常类集合
 */

class Page404Error extends Error {
    constructor(message = '页面不存在') {
        super();

        this.name = this.constructor.name;
        this.message = message;
    }
}

class ApiError extends Error {
    constructor({type, error = '', message, reqArgs}) {
        super();

        this.name = this.constructor.name;
        this.type = type;
        this.error = error;
        this.message = message;
        this.reqArgs = reqArgs;
    }
}

class ProxyError extends ApiError {
    constructor({type, error = '', message, reqArgs}) {
        super({type: type, error: error, message: message, reqArgs: reqArgs});
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
    ProxyError: ProxyError,
    NotLoginError: NotLoginError
};