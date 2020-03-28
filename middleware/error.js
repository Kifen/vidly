const { logger, sendJSONResponse } = require("../helpers");

module.exports = function(err, req, res, next) {
  //log the exception
  logger.error(err.message, err);
  return sendJSONResponse(res, 500, null, req.method, err.message);
};
