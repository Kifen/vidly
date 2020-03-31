const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minLength: 3,
        maxLenght: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLenght: 50
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLenght: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
