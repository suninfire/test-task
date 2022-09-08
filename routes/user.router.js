const {Router} = require('express');

const { userController } = require('../controllers');
const { userMdlwr } = require('../middlewares');

const userRouter = Router();
//екземпляр Роутера

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMdlwr.checkIsUserBodyValid, userController.createUser);

userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUserById);
userRouter.delete('/:userId', userController.deleteUserById);

module.exports = userRouter;
//експортувати як змінну, не як функцію