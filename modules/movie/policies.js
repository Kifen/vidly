const Joi = require("joi");

const create = {
  body: {
    title: Joi.string()
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  }
};

module.exports = create;
