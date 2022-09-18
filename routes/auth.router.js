const {Router} = require('express');
const {authController} = require('../controllers');
const {userMdlwr, authMdlwr, commonMdlwr} = require('../middlewares');
const {loginUserValidator} = require('../validators/user.validators');
const {tokenTypeEnum} = require('../constants');

const authRouter = Router();

authRouter.post(
  '/login',
  commonMdlwr.checkIsBodyValid(loginUserValidator),
  userMdlwr.getUserDynamicly('body','email','email'),
  authController.login
);

authRouter.post(
  '/logout',
  authMdlwr.checkIsAccessToken,
  authController.logout
);

authRouter.post(
  '/refresh',
  authMdlwr.checkIsRefreshToken,
  authController.refresh,
);

authRouter.post(
  '/password/forgot',
  userMdlwr.getUserDynamicly('body','email','email'),
  authController.forgotPassword,
);

authRouter.put(
  '/password/forgot',
  authMdlwr.checkIsActionToken(tokenTypeEnum.FORGOT_PASSWORD),
  authController.setNewPasswordForgot,
);

module.exports = authRouter;
