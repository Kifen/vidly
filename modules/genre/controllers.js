const { Genre } = require("../../models");
const { sendJSONResponse } = require("../../helpers");
const _ = require("lodash");

const createGenre = async (req, res) => {
  const exists = await Genre.findOne({ genre: req.body.genre });
  if (exists)
    return sendJSONResponse(
      res,
      401,
      null,
      req.method,
      `Genre ${req.body.genre} already exists`
    );

  const genre = new Genre({ genre: req.body.genre });
  await genre.save();
  return sendJSONResponse(
    res,
    200,
    { genre: req.body.genre },
    `Genre ${genre} created`
  );
};

const getAll = async (req, res) => {
  const genres = await Genre.find({});

  return sendJSONResponse(res, 200, { genres: genres }, req.method, "Success");
};

const getGenre = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Genre with id ${req.params.id} not found`
    );

  return sendJSONResponse(res, 200, { genre: genre }, req.method, "Success");
};

const updateGenre = async (req, res) => {
  const _ = await Genre.find({ genre: req.body.genre });
  console.log(_);
  if (_.length !== 0)
    return sendJSONResponse(
      res,
      403,
      null,
      req.method,
      `Genre ${req.body.genre} already exists...`
    );

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );
  if (!genre)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Genre with given id ${req.params.id} not found...`
    );

  return sendJSONResponse(res, 200, { genre: genre }, req.method, "Success");
};

const deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return sendJSONResponse(
      res,
      404,
      null,
      req.method,
      `Genre with id ${req.params.id} not found...`
    );

  return sendJSONResponse(res, 200, null, req.method, "Success");
};

module.exports = {
  createGenre,
  getAll,
  getGenre,
  updateGenre,
  deleteGenre
};
