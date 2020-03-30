const express = require("express");
const controller = require("./controllers");
const { handleError, validate } = require("../../helpers");
const policy = require("./policies");
const { authenticateAdmin, validateObjectId } = require("../../middleware");

const router = express.Router();

router.post(
  "/",
  validate(policy.create),
  handleError(validateObjectId),
  handleError(authenticateAdmin),
  handleError(controller.createMovie)
);

router.get("/", handleError(controller.getMovies));

router.get(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.getMovie)
);

router.put(
  "/:id",
  validate(policy.create),
  handleError(validateObjectId),
  handleError(controller.updateMovie)
);

router.delete(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.deleteMovie)
);
module.exports = router;
