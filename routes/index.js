const express = require("express");
const userRoute = require("../modules/user");
const genreRoute = require("../modules/genre");

const router = express.Router();
router.use("/api/users", userRoute);
router.use("/api/genres", genreRoute);

module.exports = router;
