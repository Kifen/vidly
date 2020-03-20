const express = require('express');
const {Genre, validate} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
   const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`Genre with given id ${req.params.id} not found...`)
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const found = await exist(req.body.name);
    if (found) return res.status(403).send(`Genre ${req.body.name} already exists...`);

    const genre = new Genre({name: req.body.name});
     await genre.save();
    res.status(201).send(genre)
});

router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const found = await exist(req.body.name);
    if (!found) {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
        if (!genre) return res.status(404).send(`Genre with given id ${req.params.id} not found...`);
        res.send(genre);
    }
    return res.status(403).send(`Genre ${req.body.name} already exists...`);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`Genre with id ${req.params.id} not found...`);
    res.send(genre);
});

async function exist(name) {
    const genre = await Genre.find({name: name});
    console.log(genre);
    if (genre.length === 0) return false;

    return true
}

module.exports = router;