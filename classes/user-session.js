/**
 * 用户会话基类
 */

// mock需要的引用
var config = require('../cores/config');
var fs = require('fs');
var path = require('path');

class UserSession {
    constructor(req) {
        this.req = req;
    }

    set(userInfo) {
        //设置用户会话，内部保留字段__userSession
        this.req.session.__userSession = userInfo;
    }

    get(field) {

        //region 获取mock用户会话数据
        if (config.mock_user_session_switch) {
            var jsonFileSrc = path.join(__dirname, '../mock/user/' + config.mock_user_session_data_file);
            var result = fs.readFileSync(jsonFileSrc, 'utf8');

            this.req.session.__userSession = JSON.parse(result);
        }
        //endregion

        if (field == null) {
            return this.req.session.__userSession;
        }

        return this.req.session.__userSession[field];
    }

    clear() {
        this.req.session.__userSession = null;
    }
}

module.exports = UserSession;