/**
 * 配置文件
 */

module.exports = {

    env: 'develop',
    env_output_profile_to_console: false,

    /**
     * session 配置
     *
     * session_expires:
     * 过期时间，单位：秒. 0为不设置
     *
     * session_store:
     * session存储模式(default/redis),default使用默认储存,不推荐使用在生产环境,会有内存泄漏问题。
     *
     * session_redis_pass:
     * redis密码
     */
    session_expires: 30 * 60,
    session_store: 'default',
    session_redis_host: '10.211.55.16',
    session_redis_port: 6379,
    session_redis_pass: 'admin',

    /**
     * log 日志配置
     *
     * 备注：
     * log文件储存在bin目录下
     * mongodb连接字符串(需要验证）：'mongodb://name:pwd@localhost:port/db'
     * mongodb连接字符串(不需要验证）：'mongodb://localhost:port/db'
     */
    log_print_to_console: true,
    log_save_to_file: false,
    log_file_name: 'err-file.log',
    log_save_to_mongodb: false,
    log_mongodb_connection: 'mongodb://10.211.55.16:27017/mydb',

    /**
     * api mock 配置
     *
     * mock_api_switch：
     * 关闭 'off'
     * 打开 'on'
     *
     * mock_api_set：
     * {apiName: http状态(200,500)} 例如：{'testApi1':200, 'testApi2':500} 目前只支持：200请求成功；500请求api服务器失败
     */
    mock_api_switch: 'off',
    mock_api_set: {}

};