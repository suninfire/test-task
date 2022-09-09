const {Router} = require('express');
const {authController} = require("../controllers");
const {userMdlwr} = require("../middlewares");

const authRouter = Router();

authRouter.post(
    '/login',
    userMdlwr.getUserDynamicly('body','email','email'),
    authController.login
);

module.exports = authRouter;