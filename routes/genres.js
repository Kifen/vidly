const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        maxLength: 50,
    }
});

const Genre = mongoose.model('Genre', genreSchema);


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('genre');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
   const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`Genre with given id ${req.params.id} not found...`)
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const found = await exist(req.body.genre);
    if (found) return res.status(403).send(`Genre ${req.body.genre} already exists...`);

    let genre = new Genre({genre: req.body.genre});
     genre = await genre.save()
    res.status(201).send(genre)
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const found = await exist(req.body.genre);
    if (!found) {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {genre: req.body.genre}, {new: true});
        if (!genre) return res.status(404).send(`Genre with given id ${req.params.id} not found...`)
        res.send(genre);
    }
    return res.status(403).send(`Genre ${req.body.genre} already exists...`);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found...`)
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        genre: Joi.string().required()
    };

    return Joi.validate(genre, schema);
}

async function exist(name) {
    const genre = await Genre.find({genre: name});
    console.log(genre)
    if (genre.length === 0) return false;

    return true
}

module.exports = router;