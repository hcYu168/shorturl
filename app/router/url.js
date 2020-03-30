'use strict';
module.exports = app => {
  const { router, controller, config } = app;
  const userRouter = router.namespace(config.url_namespace);
  userRouter.get('/:murl', controller.url.getLongUrl);
};
