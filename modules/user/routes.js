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

router.get(
  "/:id",
  handleError(validateObjectId),
  handleError(controller.getUser)
);

router.put(
  "/:id",
  handleError(validateObjectId),
  handleError(authenticateAdmin),
  validate(policy.update),
  handleError(controller.updateUser)
);

router.delete(
  "/:id",
  handleError(validateObjectId),
  handleError(authenticateAdmin),
  handleError(controller.deleteUser)
);

module.exports = router;
