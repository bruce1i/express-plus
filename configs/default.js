/**
 * 配置文件
 */

module.exports = {

    env: 'develop',
    env_output_profile_to_console: false,
    env_tz: 8 * 60 * 60 * 1000, // 转换为北京时间时差
    env_gzip: false, // gzip压缩

    /**
     * session 配置
     *
     * session_switch：session开关
     * 关闭 false
     * 打开 true
     *
     * session_expires: 过期时间，单位：秒. 0为不设置
     *
     * session_store: session存储模式
     *  default 使用MemoryStore,不推荐使用在生产环境,会有内存泄漏问题
     *  redis 使用redis数据库
     *
     * session_redis_pass: redis密码
     *
     * session_redis_db: Database index to use
     */
    session_switch: false,
    session_expires: 10 * 60,
    session_store: 'default',
    session_redis_host: '10.211.55.16',
    session_redis_port: 6379,
    session_redis_pass: 'admin',
    session_redis_db: 0,

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
     * http sender 配置
     *
     * http_sender_max_queue: 同时请求最大连接数（队列）
     * 0，没有队列大小限制
     * 推荐，200；也可以根据实际情况调整
     *
     * http_sender_queue_timeout: 队列排队超时时间（毫秒）
     * 0, 没有超时限制
     */
    http_sender_max_queue: 200,
    http_sender_queue_timeout: 20 * 1000,

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