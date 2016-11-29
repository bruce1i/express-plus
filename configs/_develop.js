/**
 * Created by lixun on 16/9/4.
 */

module.exports = {

    env_output_profile_to_console: true,

    session_store: 'default',
    session_redis_host: '10.211.55.16',
    session_redis_port: 6379,

    log_print_to_console: true,
    log_save_to_file: false,
    log_file_name: 'err-file.log',
    log_save_to_mongodb: false,
    log_mongodb_connection: 'mongodb://sa:sa@10.211.55.16:27017/mydb',

    mock_api_switch: 'on',
    mock_api_set: {
        demo1: 500
    }

};