const Joi = require("joi");

const calculateSchema = Joi.object({
  token: Joi.string(),
  callorie: Joi.string(),
  data: Joi.object(),
  notRecommendedProduct: Joi.array(),
});

module.exports = { calculateSchema };
