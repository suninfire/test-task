const {isObjectIdOrHexString} = require('mongoose');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');


module.exports = {
  // eslint-disable-next-line require-await
  checkIsIdValid: (fieldName, from = 'params') => async (req, res, next) => {
    try {
      // req.params.positionId === req[from][fieldName]
      if (!isObjectIdOrHexString(req[from][fieldName])) {
        return next(new ApiError('Not valid id', statusCodes.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  }};
