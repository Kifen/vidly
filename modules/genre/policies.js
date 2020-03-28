const Joi = require("joi");

const _ = {
  body: {
    genre: Joi.string()
      .min(5)
      .max(50)
      .required()
  }
};

module.exports = _;
