const Joi = require('joi');
const {regexEnum, statusCodes} = require('../constants');
const {ApiError} = require('../errors');


const nameValidator = Joi.string().alphanum()
  .min(2)
  .max(35)
  .trim();
const ageValidator = Joi.number().integer()
  .min(1)
  .max(100);
const emailValidator = Joi.string().regex(regexEnum.EMAIL)
  .lowercase()
  .trim()
  .error(new ApiError('Email not valid', statusCodes.BAD_REQUEST));
const passwordValidator = Joi.string().regex(regexEnum.PASSWORD)
  .error(new ApiError('Password not valid',statusCodes.BAD_REQUEST));


// const phoneSubSchema = Joi.object();


const newUserValidator = Joi.object({
  name: nameValidator.required(),
  // name: Joi.string().alphanum().min(2).max(35).trim().required(), // the same with ^
  age: ageValidator,
  email: emailValidator.required(),
  password: passwordValidator.required() ,


  // cars: Joi.array().items(IdValidator),    // if field no required it is optional() (default method)
  // phones: Joi.array().items(phoneSubSchema)
  // girls: Joi.array().items(Joi.string()).when('age',{is: 26, then: Joi.required()})
  // якщо вік юзера буде 26 тоді поле гірлс для нього буде обовязковим,в інших випадках ні
});

const updateUserValidator = Joi.object({
  name: nameValidator,
  age: ageValidator,
  email: emailValidator,
});

const loginUserValidator = Joi.object({
  email: emailValidator.required().error(new ApiError('Wrong email or password', statusCodes.BAD_REQUEST)),
  password: passwordValidator.required().error(new ApiError('Wrong email or password', statusCodes.BAD_REQUEST)) ,
});


module.exports = {
  newUserValidator,
  updateUserValidator,
  loginUserValidator
};
