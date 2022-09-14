const Joi = require('joi');

const {regexEnum} = require('../constants');

const IdValidator = Joi.string().regex(regexEnum.MONGO_ID);

module.exports = {
    IdValidator
}