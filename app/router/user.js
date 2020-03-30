'use strict';
module.exports = app => {
  const { router, controller, config } = app;
  const userRouter = router.namespace(config.apiPrefix + '/user');
  userRouter.post('/getShortUrl', controller.url.index);
};
