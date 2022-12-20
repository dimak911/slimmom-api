const Joi = require("joi");

const schemaDiaryInfo = Joi.object({
  callorie: Joi.string().required(),
  notRecommendedProduct: Joi.array()
});

module.exports = {
  schemaDiaryInfo,
};