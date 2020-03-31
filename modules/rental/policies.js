const Joi = require("joi");

const _ = {
  body: {
    userId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  }
};

const __ = {
  body: {
    rentalId: Joi.objectId().required()
  }
};

module.exports = {
  _,
  __
};
