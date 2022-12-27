const Joi = require("joi");

const addUserDataSchema = Joi.object({
  calorie: Joi.string().required(),
  data: Joi.object().required(),
  notRecommendedProduct: Joi.array().required(),
});

module.exports = { addUserDataSchema };
