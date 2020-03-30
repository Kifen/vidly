const { Movie, Genre } = require("../../models");
const { sendJSONResponse } = require("../../helpers");

const createMovie = async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre)
    return sendJSONResponse(res, 404, null, req.method, "Invalid genre");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      genre: genre.genre
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();
  return sendJSONResponse(res, 200, { movie: movie }, req.method, "Success");
};

const getMovies = async (req, res) => {
  const movies = await Movie.find();
  return sendJSONResponse(res, 200, { movies }, req.method, "Success");
};

const getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Movie with id ${req.params.id} not found.`
    );

  return sendJSONResponse(res, 200, { movie }, req.method, "Success.");
};

const updateMovie = async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre)
    return sendJSONResponse(res, 400, null, req.method, "Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre.id,
        genre: genre.genre
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!movie)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Movie with id ${req.params.id} not found`
    );

  return sendJSONResponse(res, 200, { movie }, req.method, "Success.");
};

const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Movie with id ${req.params.id} not found`
    );

  return sendJSONResponse(res, 200, { movie }, req.method, "Success.");
};

module.exports = {
  createMovie,
  getMovie,
  getMovies,
  updateMovie,
  deleteMovie
};
