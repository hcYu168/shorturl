/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570954395805_8333';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // api版本
  config.apiVersion = 'v1';
  // api前缀
  config.apiPrefix = '/api/' + config.apiVersion;

  // redis前缀
  config.redisPrefix = 'shorturl_';

  /* // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'shorturl',
    port: '3306',
    charset: 'utf8mb4', // 微信默认编码类型，支持表情字符
    collate: 'utf8mb4_general_ci',
    define: {
      timestamps: false, // 时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
      underscored: true, // 使用下划线，自动添加的字段会在数据段中使用“蛇型命名”规则，如：createdAt在数据库中的字段名会是created_at
      paranoid: false, // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    },
    host: '127.0.0.1',
    username: 'root',
    password: '',
    pool: { // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000,
    },
    timezone: '+08:00',
  }; */

  config.redisCache = {
    longUrl: `${config.redisPrefix}longUrl`,
    shortUrl: `${config.redisPrefix}shortUrl`,
    urlCount: `${config.redisPrefix}urlCount`,
  };

  /* // redis配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  }; */

  // 安全配置
  config.security = {
    domainWhiteList: [],
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  config.url_namespace = '/m'; // 短链接的路由前缀

  config.urlPrefix = {
    startPrefix: `http://localhost:7001${config.url_namespace}`, // 你的域名
  };
  return {
    ...config,
    ...userConfig,
  };
};
