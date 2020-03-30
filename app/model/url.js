'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT, BIGINT } = app.Sequelize;
  const Model = app.model.define('url', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    long_url: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '长连接',
    },
    short_url: {
      type: STRING(256),
      allowNull: false,
      defaultValue: '',
      comment: '短链接',
    },
    count: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
      comment: '点击次数',
    },
    created_at: {
      type: BIGINT(15),
      allowNull: false,
      defaultValue: 0,
      comment: '创建时间戳',
    },
  }, {
    tableName: 'url',
    comment: '链接',
  });
  return Model;
};
