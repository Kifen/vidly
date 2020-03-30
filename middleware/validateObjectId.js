const mongoose = require("mongoose");
const { logger, sendJSONResponse } = require("../helpers");

module.exports = function(req, res, next) {
  let ObjectIds = [];
  req.body.genreId && req.params.id
    ? (ObjectIds = [req.body.genreId, req.params.id])
    : (ObjectIds = [req.params.id || req.body.genreId]);

  console.log(ObjectIds);

  ObjectIds.forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ID: <req.params.id = ${id}>`);
      return sendJSONResponse(res, 404, null, req.method, "Invalid ID");
    }
  });

  return next();
};
