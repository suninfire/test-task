const {Router} = require('express');

const { userController } = require('../controllers');
const { commonMdlwr,userMdlwr } = require('../middlewares');

const userRouter = Router();
//екземпляр Роутера

userRouter.get(
    '/',
    userController.getAllUsers
);

userRouter.post(
    '/',
    userMdlwr.checkIsUserBodyValid,
    userMdlwr.checkIsEmailUniq,
    userController.createUser
);

userRouter.get(
    '/:userId',
    commonMdlwr.checkIsIdValid('userId' ),
    userMdlwr.isUserPresent(),
    userController.getUserById
);

userRouter.put('/:userId',
    commonMdlwr.checkIsIdValid('userId' ),
    userMdlwr.isUserPresent(),
    userMdlwr.checkIsEmailUniq,
    userController.updateUserById
);

userRouter.delete(
    '/:userId',
    commonMdlwr.checkIsIdValid('userId' ),
    userMdlwr.isUserPresent(),
    userController.deleteUserById
);

module.exports = userRouter;
//експортувати як змінну, не як функцію