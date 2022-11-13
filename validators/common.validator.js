const Joi = require('joi');

const {levelEnum} = require('../constants');
const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');

const levelValidator = Joi.string().lowercase()
  .trim()
  .valid(...Object.values(levelEnum))
  .error(new ApiError('Level not valid', statusCodes.BAD_REQUEST));

module.exports = {
  levelValidator
};
