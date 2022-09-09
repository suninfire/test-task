const {ApiError} = require("../errors");
const {statusCodes} = require("../constants");
const {userService} = require("../services");

module.exports = {
    checkIsUserBodyValid: async (req,res,next) => {
        try {
            const {name, age} = req.body;

            if (Number.isNaN(+age) || age <= 0) {
                throw new ApiError('Wrong user age',statusCodes.BAD_REQUEST);
            }

            if (name.length < 2 ) {
                throw new ApiError('Wrong user name',statusCodes.BAD_REQUEST);
            }
            next();  //перекидає до наступного обробника
        } catch (e) {
          next(e);
        }
    },

    checkIsEmailUniq: async (req,res,next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email});

            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('This email already exist',statusCodes.CONFLICT)) ;
            }

            next();  //перекидає до наступного обробника
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (from = 'params') => async (req,res,next) => {
        try {
            const {userId} = req[from];

            const user = await userService.getOneById(userId);

            if (!user) {
                return next(new ApiError('user not found, check id',statusCodes.NOT_FOUND)) ;
            }

            req.user = user;
            next();  //перекидає до наступного обробника
        } catch (e) {
            next(e);
        }
    }

}

