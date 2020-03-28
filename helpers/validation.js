const { badRequest } = require("@hapi/boom");
const Joi = require("joi");

const sendJSONResponse = (res, status, data, method, message) => {
  res.status(status);
  res.json({
    status,
    method,
    message,
    data
  });
};

//const handleError = fn => (req, res, next) => fn(req, res, next).catch(next);
const handleError = function(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
};

const validate = (schema, options) => {
  const requestOptions = options || {};

  return function(req, res, next) {
    const dataToValidate = {};
    if (!schema) {
      return next();
    }

    ["params", "body", "query"].forEach(key => {
      if (schema[key]) {
        dataToValidate[key] = req[key];
      }
    });

    function onValidationComplete(err, validated) {
      if (err) {
        return next(badRequest(err.message, err.details));
      }

      // copy the validated data to the req object
      Object.assign(req, validated);
      return next();
    }
    return Joi.validate(
      dataToValidate.body,
      schema.body,
      requestOptions,
      onValidationComplete
    );
  };
};

module.exports = {
  handleError,
  validate,
  sendJSONResponse
};
