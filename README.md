#express-plus

##版本
express+: 1.2.0

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

##更新日志
* 控制器重构，一个控制器下支持多个方法：control('控制器文件:控制器方法')
* session重构，支持过期时间，redis连接密码和db index设置
* 增加api mock数据操作
* demo示例调整
* 增加了自定义异常和处理
* 增加proxy代理类，方便快速构建代理一个外部api
* httpsender增加了队列控制

##上次日志
* httpsender 替代 api-request



