const express = require('express');
const router = express.Router();
const Joi = require('joi');

let genres = [];

// GET request
router.get('/', (req, res) => {
    res.send(genres);
});

// POST request
router.post('/', (req, res) => {
    const g = genres.find(g => g.genre === req.body.genre);
    if (g) return res.status(403).send(`Genre ${g.genre} already exists...`);

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(genre)
    res.status(201).send(genre)
});

// UPDATE request
router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`Genre with given id ${req.params.id} not found...`)

    const exists = genres.find(g => g.genre === req.body.genre)
    if (exists) return res.status(403).send(`Genre ${req.body.genre} already exists...`);

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});

// DELETE request
router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found...`)

    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        genre: Joi.string().required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;