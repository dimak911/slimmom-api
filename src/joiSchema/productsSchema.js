const Joi = require("joi");

const productsSchema = Joi.object({
  productTitle: Joi.string().min(2),
  lang: Joi.string().length(2).valid("ua", "ru"),
  limit: Joi.number().max(100),
});

module.exports = {
  productsSchema,
};
