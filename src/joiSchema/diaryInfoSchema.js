const Joi = require("joi");

const schemaDiaryInfo = Joi.object({
  calorie: Joi.string().required(),
  notRecommendedProduct: Joi.array(),
});

module.exports = {
  schemaDiaryInfo,
};
