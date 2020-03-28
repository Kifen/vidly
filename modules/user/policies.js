const Joi = require("joi");

const register = {
  body: {
    name: Joi.string()
      .min(2)
      .max(20)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required(),
    isAdmin: Joi.boolean().required()
  }
};

const login = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
};

module.exports = {
  register,
  login
};
