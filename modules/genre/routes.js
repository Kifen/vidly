const express = require("express");
const controller = require("./controllers");
const createPolicy = require("./policies");
const { handleError, validate } = require("../../helpers");
const { validateObjectId } = require("../../middleware");

const router = express.Router();
router.post("/", validate(createPolicy), handleError(controller.createGenre));

router.get("/", handleError(controller.getAll));

router.get(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.getGenre)
);

router.put(
  "/:id",
  handleError(validateObjectId),
  validate(createPolicy),
  handleError(controller.updateGenre)
);

router.delete(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.deleteGenre)
);

module.exports = router;
