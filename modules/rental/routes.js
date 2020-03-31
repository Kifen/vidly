const express = require("express");
const policy = require("./policies");
const controller = require("./controllers");
const { handleError, validate } = require("../../helpers");
const { validateObjectId } = require("../../middleware");
const { authenticateAdmin } = require("../../middleware");

const router = express.Router();

router.post(
  "/",
  validate(policy._),
  handleError(validateObjectId),
  handleError(controller.createRental)
);

router.get(
  "/",
  handleError(authenticateAdmin),
  handleError(controller.getAllRentals)
);

router.get(
  "/:id",
  handleError(authenticateAdmin),
  handleError(validateObjectId),
  controller.getRental
);

router.put(
  "/",
  validate(policy.__),
  handleError(authenticateAdmin),
  handleError(controller.updateRental)
);

router.delete(
  "/:id",
  handleError(authenticateAdmin),
  handleError(controller.deleteRental)
);

module.exports = router;
