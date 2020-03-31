const mongoose = require("mongoose");
const { logger, sendJSONResponse } = require("../helpers");

module.exports = function(req, res, next) {
  let ObjectIds = [];
  if (req.params.id) ObjectIds.push(req.params.id);

  const keys = Object.keys(req.body);
  keys.forEach(key => {
    const match = key.match(/(Id)$/);
    if (match) {
      ObjectIds.push(req.body[key]);
    }
  });
  // req.body.genreId && req.params.id
  //   ? (ObjectIds = [req.body.genreId, req.params.id])
  //   : (ObjectIds = [req.params.id || req.body.genreId]);
  ObjectIds.forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ID: <req.params.id = ${id}>`);
      return sendJSONResponse(res, 404, null, req.method, "Invalid ID");
    }
  });

  return next();
};
