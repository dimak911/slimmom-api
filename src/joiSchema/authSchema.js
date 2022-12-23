const Joi = require("joi");

const pattern = /(?=.*[A-Za-z])(?=.*[0-9])/;
const schemaAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().min(3).max(254),
  password: Joi.string().required().min(8).max(100).alphanum().pattern(new RegExp(pattern)),
});

module.exports = {
  schemaAuth,
};
