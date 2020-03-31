const express = require("express");
const userRoute = require("../modules/user");
const genreRoute = require("../modules/genre");
const movieRoute = require("../modules/movie");
const rentalRoute = require("../modules/rental");

const router = express.Router();

router.use("/api/users", userRoute);
router.use("/api/genres", genreRoute);
router.use("/api/movies", movieRoute);
router.use("/api/rentals", rentalRoute);

module.exports = router;
