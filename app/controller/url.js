'use strict';

const Controller = require('egg').Controller;

class UrlController extends Controller {
  async index() {
    const { ctx } = this;
    // const { url } = ctx.request.body;
    // const shortUrl = await service.url.getShortUrl(url);
    ctx.logger.info('test');
    ctx.body = {
      code: 200,
    };
  }

  async getLongUrl() {
    const { ctx, service } = this;
    const { murl } = ctx.params;
    const url = await service.url.getUrl(murl);
    if (!url) {
      await ctx.redirect('/404');
    } else {
      await ctx.redirect(url);
    }
  }
}

module.exports = UrlController;
