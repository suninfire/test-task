const {isObjectIdOrHexString} = require('mongoose');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');

module.exports = {
  checkIsBodyValid: (validatorType) => (req, res, next) => {
    try {
      const validate = validatorType.validate(req.body);

      if(validate.error) {
        return next(new ApiError(validate.error.message, statusCodes.BAD_REQUEST));
      }

      req.body = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsQueryValid: (validator, from = 'body') => (req,res,next) => {
    try {
      const {value} = validator.validate(req[from]);

      if(value.error) {
        return next(new ApiError(value.error.message, statusCodes.BAD_REQUEST));
      }
      req[from] = value;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsIdValid: (fieldName, from = 'params') => (req, res, next) => {
    try {
      // req.params.positionId === req[from][fieldName]
      if (!isObjectIdOrHexString(req[from][fieldName])) {
        return next(new ApiError('Not valid id', statusCodes.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
