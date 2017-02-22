#express-plus

##版本
express+: 1.4.0

base express: ~4.13.4

##说明
express+是在express的基础上提供了辅助方法，让express用起来更方便（虽然express已经很方便了），MVC文件组织结构更清晰。

##辅助扩展
* 集成了session（使用redis存储）
* 集成了log系统（使用mongodb存储）
* 提供了自定义不同开发环境的配置文件
* 提供了Promise的api调用
* 提供api mock数据系统
* 提供自定义异常和处理
* 提供了gzip压缩控制
* 提供render基类，为模版提供全局变量
* 提供proxy基类，简单快速代理api接口
* 提供了常用路由中间件（请求转发，文件上传）

##更新日志
* **1.4.0**取消了1.3.1开始，当bodyParser无法解析为json对象时，直接返回原始body字符串的功能
* **1.4.0**提供了路由中间件的分层结构
* **1.4.0**提供了表单上传（文件上传）中间件
* **1.4.0**提供了请求转发中间件
* **1.4.0**封装multer来提供文件上传支持
* **1.4.0**从1.3.x升级到1.4.x需要npm install

##历史日志
* **1.3.3**升级httpsender支持路由参数
* **1.3.2**提供render基类，为模版提供全局变量
* **1.3.1**当bodyParser无法解析为json对象时，直接返回原始body字符串
* **1.3.0**增加gzip压缩开关
* **1.2.1**增加session控制开关
* 控制器重构，一个控制器下支持多个方法：control('控制器文件:控制器方法')
* session重构，支持过期时间，redis连接密码和db index设置
* 增加api mock数据操作
* demo示例调整
* 增加了自定义异常和处理
* 增加proxy代理类，方便快速构建代理一个外部api
* httpsender增加了队列控制
* httpsender 替代 api-request

##帮助
###请求参数
获取get参数 req.query.xxx;

获取post参数 req.body.xxx; 

获取路由参数 req.params.xxx;

###session
设置session req.session.xxx = xxx;

获取session req.session.xxx;

###日志
var winston = require('winston');

winston.info('another way to log info level');

winston.error('test error level');

winston.warn('test warn level');

winston.info('test info level');

winston.verbose('test verbose level');

winston.debug('test debug level');

winston.silly('test silly level');

winston.info('test metadata', {anything: 'This is metadata', two: 'heool,sdfs'});

winston.profile('test profile');



