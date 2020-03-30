'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/url.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should post /api/v1/user/getShortUrl', () => {
    return app.httpRequest()
      .post('/api/v1/user/getShortUrl')
      .expect({
        code: 200,
      });
  });
});
