const express = require("express");
const controller = require("./controller");
const policy = require("./policies");
const { handleError, validate } = require("../../helpers");

const router = express.Router();
router.post(
  "/register",
  validate(policy.register),
  handleError(controller.register)
);

router.post("/login", validate(policy.login), handleError(controller.login));

module.exports = router;
