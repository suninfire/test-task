const Joi = require('joi');

const {levelEnum,categoryEnum} = require('../constants');
const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');

const queryParamsValidator = Joi.object({
  category: Joi.string().valid(...Object.values(categoryEnum)),
  level: Joi.string().valid(...Object.values(levelEnum)),
  tag: Joi.string(),

}).error(new ApiError('query not valid', statusCodes.BAD_REQUEST));

module.exports = {
  queryParamsValidator
};
