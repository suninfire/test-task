const {ApiError} = require('../errors');
const {isObjectIdOrHexString} = require('mongoose');
const {statusCodes} = require('../constants');


module.exports = {
  // eslint-disable-next-line require-await
  checkIsBodyValid: (validatorType) => async (req,res,next) => {
    try {

      const validate = validatorType.validate(req.body);

      if(validate.error) {
        return next(new ApiError(validate.error.message, statusCodes.BAD_REQUEST));
      }

      req.body = validate.value; // переприсвоюю вхідне баді на баді яке мені вертає джоі

      next(); //перекидає до наступного обробника
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line require-await
  checkIsIdValid: (fieldName,from='params') => async (req, res, next) => {
    try {
      // req.params.userId === req[from][fieldName]
      if (!isObjectIdOrHexString(req[from][fieldName])) {
        return next(new ApiError('Not valid id', statusCodes.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
