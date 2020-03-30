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
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean().optional(),
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

const update = {
  body: {
    name: Joi.string()
      .min(2)
      .max(20)
      .optional(),
    email: Joi.string()
      .email()
      .optional(),
    password: Joi.string()
      .min(8)
      .max(20)
      .optional(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .optional(),
    isGold: Joi.boolean().optional(),
    isAdmin: Joi.boolean().optional()
  }
};

module.exports = {
  register,
  login,
  update
};
