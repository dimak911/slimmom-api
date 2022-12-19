const Joi = require('joi');

const registrationUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(15),
    token: Joi.string()
});

module.exports = { registrationUserSchema };