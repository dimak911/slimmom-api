const Joi = require("joi");

const pattern = /(?=.*[A-Za-z])(?=.*[0-9])/;
const registrationUserSchema = Joi.object({
  name: Joi.string().min(3).max(254).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .min(3)
    .max(254),
  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .alphanum()
    .pattern(new RegExp(pattern)),
  token: Joi.string(),
  callorie: Joi.string(),
  data: Joi.object(),
  notRecommendedProduct: Joi.array(),
});

module.exports = { registrationUserSchema };
