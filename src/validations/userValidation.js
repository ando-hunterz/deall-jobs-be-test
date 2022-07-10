const Joi = require("joi");

module.exports = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .regex(/[a-zA-Z0-9_.-]{3,30}/)
      .required()
      .messages({
        'string.pattern.base': "\"password\" contains invalid character"
      }),
    role: Joi.string().regex(/^user$|^admin$/).required()
  }),
};
