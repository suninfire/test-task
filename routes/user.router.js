const {Router} = require('express');

const { userController } = require('../controllers');
const { commonMdlwr,userMdlwr, authMdlwr, fileMdlwr} = require('../middlewares');
const {newUserValidator, updateUserValidator} = require('../validators/user.validators');

const userRouter = Router();
//екземпляр Роутера

userRouter.get(
  '/',
  userController.getAllUsers
);

userRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newUserValidator),
  userMdlwr.checkIsEmailUniq,
  userController.createUser
);

userRouter.get(
  '/:userId',
  commonMdlwr.checkIsIdValid('userId' ),
  userMdlwr.isUserPresent(),
  userController.getUserById
);

userRouter.post(
  '/:userId/avatar',
  commonMdlwr.checkIsIdValid('userId' ),
  fileMdlwr.checkUploadedAvatar,
  userMdlwr.isUserPresent(),
  userController.uploadAvatar,
);

userRouter.put('/:userId',
  commonMdlwr.checkIsIdValid('userId' ),
  commonMdlwr.checkIsBodyValid(updateUserValidator),
  authMdlwr.checkIsAccessToken,
  userMdlwr.isUserPresent(),
  userMdlwr.checkIsEmailUniq,
  userController.updateUserById
);

userRouter.delete(
  '/:userId',
  commonMdlwr.checkIsIdValid('userId' ),
  authMdlwr.checkIsAccessToken,
  userMdlwr.isUserPresent(),
  userController.deleteUserById
);

module.exports = userRouter;
//експортувати як змінну, не як функцію
