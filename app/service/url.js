'use strict';
const Service = require('egg').Service;
const crypto = require('crypto');
const moment = require('moment');
class UrlService extends Service {
  // 获取短链接
  async getShortUrl(url) {
    const { ctx, app, config } = this;
    const { Url } = ctx.model;
    let short_url = await app.redis.hget(config.redisCache.url, url);
    if (!short_url) {
      const count = await app.redis.incr(config.redisCache.urlCount);
      const shortCode = await this.string10to62(count);
      // 生成一段随机数，跟shortCode连接在一起，进行md5加密再取固定长度
      const random = Math.floor(Math.random() * 10000);
      const str = await this.string10to62(random);
      const md5_str = await this.md5(`${shortCode}${str}`);
      short_url = md5_str.substring(2, 8);
      await Url.create({
        long_url: url,
        short_url,
        created_at: moment().unix(),
      });
      await app.redis.hset(config.redisCache.longUrl, url, short_url);
      await app.redis.hset(config.redisCache.shortUrl, short_url, url);
    }
    short_url = `${config.urlPrefix.startPrefix}/${short_url}`;
    return short_url;
  }

  // 10进制转成62进制
  async string10to62(number) {
    const chars = 'V34012qrsxytuvC9abDGKLO67wzAB8MhigkPQXYSTNcdefg5lmEFGRHInopUWZ';
    const charsArr = chars.split('');
    const radix = chars.length;
    let qutient = +number;
    const arr = [];
    do {
      const mod = qutient % radix;
      qutient = (qutient - mod) / radix;
      arr.unshift(charsArr[mod]);
    } while (qutient);
    return arr.join('');
  }

  // 获取url
  async getUrl(url) {
    const { ctx, app, config } = this;
    const { Url } = ctx.model;
    let long_url = await app.redis.hget(config.redisCache.shortUrl, url);
    if (!long_url) {
      const existUrl = await Url.findOne({
        where: {
          short_url: url,
        },
        attributes: [ 'long_url' ],
        raw: true,
      });
      if (!existUrl) {
        return false;
      }
      long_url = existUrl.long_url;
      await app.redis.hset(config.redisCache.shortUrl, url, long_url);
    }
    const result = await ctx.model.query('update `url` set count=count+:count where short_url=:short_url', {
      replacements: {
        count: 1,
        short_url: url,
      },
    }).then(([ result ]) => {
      return result;
    });
    if (!result.affectedRows > 0) {
      ctx.logger.error({
        request: ctx.request.url,
        url,
      });
    }
    return long_url;
  }

  // MD5
  async md5(str) {
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
  }
}
module.exports = UrlService;
