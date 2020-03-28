const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  }
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
