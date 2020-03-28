const mongoose = require("mongoose");
const { logger, sendJSONResponse } = require("../helpers");

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`Invalid ID: <req.params.id = ${req.params.id}>`);
    return sendJSONResponse(res, 404, null, req.method, "Invalid ID");
  }

  return next();
};
