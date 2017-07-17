#express-plus

##版本
express+: 1.7.0

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
* 提供了常用路由中间件（请求转发，文件上传，登录检测等）

##更新日志
* **1.7.0**增加robots.txt，可以配置在正式环境下爬虫的规则，测试环境下默认屏蔽爬虫
* **1.7.0**修改configs/_product.js为configs/_www.js (注意，非覆盖升级，请手动修改该文件名)

##历史日志
* **1.6.0**修改配置文件中的模板变量view_params为global全局变量
* **1.6.0**修改view基类，支持global全局变量
* **1.6.0**新增head.ejs和html.ejs前端include标准模版，支持前端global全局变量
* **1.6.0**修改css文件夹为style文件夹
* **1.6.0**新增js/lib文件夹，内置基础js类库
* **1.5.3**修复forward中间件导致缓存假象bug
* **1.5.2**当session使用redis时，可以设置prefix
* **1.5.1**增加user-session类，方便管理用户登录会话信息和检测
* **1.5.1**增加检查路由中间件，通过login方法来拦截未登录用户
* **1.5.1**提供mock用户会话配置项
* **1.5.0**重构项目文件夹结构，核心代码移入cores文件夹，class更名classes文件夹，api文件移入api文件夹下set.js文件
* **1.5.0**增加请求响应中间件
* **1.5.0**重构render类，并更名为view类（支持在配置文件配置全局模板参数变量）
* **1.5.0**重构control方法，提供res.view()方法渲染模板（支持在配置文件配置全局模板参数变量）
* **1.4.0**取消了1.3.1开始，当bodyParser无法解析为json对象时，直接返回原始body字符串的功能
* **1.4.0**提供了路由中间件的分层结构
* **1.4.0**提供了表单上传（文件上传）中间件
* **1.4.0**提供了请求转发中间件
* **1.4.0**封装multer来提供文件上传支持
* **1.4.0**从1.3.x升级到1.4.x需要npm install
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



