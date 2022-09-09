const {ApiError} = require('../errors');
const {isObjectIdOrHexString} = require('mongoose');
const {statusCodes} = require('../constants');


module.exports = {
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
}