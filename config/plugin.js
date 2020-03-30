'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  /* sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  }, */
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
};
