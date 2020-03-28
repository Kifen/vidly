const express = require("express");
const controller = require("./controller");
const policy = require("./policies");
const { handleError, validate } = require("../../helpers");
const {
  validateObjectId,
  authenticateUser,
  authenticateAdmin
} = require("../../middleware");

const router = express.Router();
router.post(
  "/register",
  validate(policy.register),
  handleError(controller.register)
);

router.post("/login", validate(policy.login), handleError(controller.login));

router.get(
  "/",
  handleError(authenticateAdmin),
  handleError(controller.getUsers)
);

module.exports = router;
