const { Rental, User, Movie } = require("../../models");
const { sendJSONResponse } = require("../../helpers");
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init(mongoose);

const createRental = async (req, res) => {
  const user = await User.findById(req.body.userId);
  console.log(user);
  if (!user)
    return sendJSONResponse(res, 400, null, req.method, "Invalid user.");

  const movie = await Movie.findById(req.body.movieId);
  console.log(movie);
  if (!movie)
    return sendJSONResponse(res, 400, null, req.method, "Invalid movie");

  if (movie.numberInStock === 0)
    return sendJSONResponse(
      res,
      400,
      null,
      req.method,
      `Movie ${movie.title} not in stock.`
    );

  const rental = new Rental({
    user: {
      _id: user._id,
      name: user.name,
      isGold: user.isGold,
      phone: user.phone,
      email: user.email
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  console.log(rental);
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    return sendJSONResponse(res, 200, { rental }, req.method, "Success.");
  } catch (ex) {
    return sendJSONResponse(res, 500, null, req.method, ex.message);
  }
};

const getAllRentals = async (req, res) => {
  const rentals = await Rental.find();
  return sendJSONResponse(res, 200, rentals, req.method, "Success.");
};

const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Rental with id ${req.params.id} not found.`
    );

  return sendJSONResponse(res, 200, rental, req.method, "Success.");
};

const updateRental = async (req, res) => {
  const rental = await Rental.findById(req.body.rentalId);
  if (!rental)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Rental with id ${req.params.id} not found.`
    );

  rental.dateReturned = Date.now();
  await rental.save();

  return sendJSONResponse(res, 200, rental, req.method, "Success.");
};

const deleteRental = async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Rental with id ${req.params.id} not found.`
    );

  return sendJSONResponse(res, 200, { rental }, req.method, "Success.");
};

module.exports = {
  createRental,
  getAllRentals,
  getRental,
  updateRental,
  deleteRental
};
