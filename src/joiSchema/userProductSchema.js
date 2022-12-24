const Joi = require("joi");

const userProductSchema = Joi.object({
  productName: Joi.string().required(),
  productWeight: Joi.string().required(),
  productCalories: Joi.string().required(),
  date: Joi.string().required(),
});

module.exports = {
  userProductSchema,
};
