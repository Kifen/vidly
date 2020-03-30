const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 255, trim: true },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0 },
  dailyRentalRate: { type: Number, required: true, min: 0 }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
