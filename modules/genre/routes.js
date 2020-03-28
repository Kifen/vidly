const express = require("express");
const controller = require("./controllers");
const policy = require("./policies");
const { handleError, validate } = require("../../helpers");
const { validateObjectId } = require("../../middleware");

const router = express.Router();
router.post("/", validate(policy._), handleError(controller.createGenre));

router.get("/", handleError(controller.getAll));

router.get(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.getGenre)
);

router.put(
  "/:id",
  handleError(validateObjectId),
  validate(policy._),
  handleError(controller.updateGenre)
);

router.delete(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.deleteGenre)
);

module.exports = router;
