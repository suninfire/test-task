const Joi = require('joi');


const modelValidator = Joi.string().alphanum()
  .min(2)
  .max(35)
  .trim();
const yearValidator = Joi.number().integer()
  .min(1900)
  .max(2022);


const newCarValidator = Joi.object({
  model: modelValidator.required(),
  year: yearValidator.required(),
});

const updateCarValidator = Joi.object({
  model: modelValidator,
  year: yearValidator,
});

module.exports = {
  newCarValidator,
  updateCarValidator
};
