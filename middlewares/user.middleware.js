const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');
const {userService} = require('../services');
const {User} = require('../dataBase');

module.exports = {
  checkIsEmailUniq: async (req,res,next) => {
    try {
      const {email} = req.body;
      const {userId} = req.params;

      const userByEmail = await userService.getOneByParams({email, _id: { $ne: userId}});
      // _id: { $ne: userId } - search all except THIS userId

      if (userByEmail && userByEmail._id.toString() !== userId) {
        return next(new ApiError('This email already exist',statusCodes.CONFLICT)) ;
      }

      next(); //перекидає до наступного обробника
    } catch (e) {
      next(e);
    }
  },

  isUserPresent: (from = 'params') => async (req,res,next) => {
    try {
      const {userId} = req[from];

      const user = await userService.getOneById(userId);

      if (!user) {
        return next(new ApiError('user not found',statusCodes.NOT_FOUND)) ;
      }

      req.user = user;
      next(); //перекидає до наступного обробника
    } catch (e) {
      next(e);
    }
  },

  getUserDynamicly: (from = 'body', fieldName = 'userId',dbField = fieldName) => async (req,res,next) => {
    try {
      const fieldToSearch = req[from][fieldName];

      const user = await User.findOne({[dbField]: fieldToSearch});

      if (!user) {
        return next(new ApiError('user not found',statusCodes.NOT_FOUND)) ;
      }

      req.user = user;
      next(); //перекидає до наступного обробника
    } catch (e) {
      next(e);
    }
  }

};

