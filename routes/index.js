const express = require("express");
const userRoute = require("../modules/user");

const router = express.Router();
router.use("/api/users", userRoute);

module.exports = router;
