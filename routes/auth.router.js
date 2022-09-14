const {Router} = require('express');
const {authController} = require("../controllers");
const {userMdlwr, authMdlwr} = require("../middlewares");

const authRouter = Router();

authRouter.post(
    '/login',
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

module.exports = authRouter;