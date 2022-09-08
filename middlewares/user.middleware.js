const { statusCodes } = require('../constants');
const {ApiError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCode.enum");

module.exports = {
    checkIsUserBodyValid: async (req,res,next) => {
        try {
            const {name, age} = req.body;

            if (Number.isNaN(+age) || age <= 0) {
                throw new ApiError('Wrong user age',BAD_REQUEST);
            }

            if (name.length < 2 ) {
                throw new ApiError('Wrong user name',BAD_REQUEST);
            }
            next();  //перекидає до наступного обробника
        } catch (e) {
          next(e);
        }
    }
}