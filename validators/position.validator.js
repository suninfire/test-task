const Joi = require('joi');

const {levelValidator} = require('./common.validator');
const {categoryEnum} = require('../constants');
const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');


const categoryValidator = Joi.string().valid(...Object.values(categoryEnum))
  .lowercase()
  .error(new ApiError('Category not valid', statusCodes.BAD_REQUEST));

const newPositionValidator = Joi.object({
  category: categoryValidator.required(),
  level: levelValidator.required(),
  company: Joi.string().required(),
  description: Joi.string(),
  japaneseRequired: Joi.boolean().required(),
});

const updatePositionValidator = Joi.object({
  japaneseRequired: Joi.boolean(),
  description: Joi.string(),
});

module.exports = {
  categoryValidator,
  newPositionValidator,
  updatePositionValidator
};

