const mongoose = require("mongoose");
const { logger, sendJSONResponse } = require("../helpers");

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    logger.error(`Invalid ID: <req.params.id = ${req.params.id}>`);
  return sendJSONResponse(res, 404, null, req.method, "Invalid ID");
  next();
};
