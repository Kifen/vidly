const Joi = require("joi");

const createPolicy = {
  body: {
    genre: Joi.string()
      .min(5)
      .max(50)
      .required()
  }
};

module.exports = createPolicy;
