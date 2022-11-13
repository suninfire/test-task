const Joi = require('joi');

const {categoryEnum,statusCodes} = require('../constants');
const {levelValidator} = require('./common.validator');
const {ApiError} = require('../errors');

const emailValidator = Joi.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  .lowercase()
  .trim()
  .error(new ApiError('Email not valid', statusCodes.BAD_REQUEST));

const categoriesValidator = Joi.array().items(Joi.string().lowercase()
  .valid(...Object.values(categoryEnum))
  .error(new ApiError('Categories not valid', statusCodes.BAD_REQUEST)));

const newApplicantValidator = Joi.object({
  email: emailValidator.required(),
  categories: categoriesValidator.required(),
  level: levelValidator.required(),
  japaneseKnowledge: Joi.boolean().required()
});

const updateApplicantValidator = Joi.object({
  email: emailValidator,
  categories: categoriesValidator,
  level: levelValidator,
  japaneseKnowledge: Joi.boolean()
});

module.exports = {
  emailValidator,
  categoriesValidator,
  newApplicantValidator,
  updateApplicantValidator
};
