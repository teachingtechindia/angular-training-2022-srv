const Joi = require("joi");

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
});

module.exports = { userLoginSchema };
