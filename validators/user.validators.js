const Joi = require('joi');
const {regexEnum, statusCodes} = require("../constants");
const { IdValidator } = require("./common.validators");
const {ApiError} = require("../errors");


// const phoneSubSchema = Joi.object();


const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(35).trim().required(),
    age: Joi.number().integer().min(1).max(100),
    email: Joi.string().regex(regexEnum.EMAIL).lowercase().trim().required().error(new ApiError('Email not valid', statusCodes.BAD_REQUEST)),
    password: Joi.string().regex(regexEnum.PASSWORD).required().error(new ApiError('Password not valid',statusCodes.BAD_REQUEST)),
    cars: Joi.array().items(IdValidator),    // if field no required it is optional() (default method)
    // phones: Joi.array().items(phoneSubSchema)
    // girls: Joi.array().items(Joi.string()).when('age',{is: 26, then: Joi.required()})   //якщо вік юзера буде 26 тоді поле гірлс для нього буде обовязковим,в інших випадках ні
});

module.exports = {
    newUserValidator
}