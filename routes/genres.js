﻿const authorization = require('../middleware/authorization')
const admin = require('../middleware/admin')
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre')

router.get('/', async (req, res) => {
	throw new Error('Could not get the genres');

	const genres = await Genre.find().sort('name')
	res.send(genres);
});

router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre) return res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

router.post('/', authorization, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre({ name: req.body.name });

	await genre.save();

	res.send(genre);
}); //auth method will be called before the actual route handler

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
		new: true
	})

	if (!genre) return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

router.delete('/:id', [authorization, admin], async (req, res) => {  //array of middleware functions.They will be called in sequence.

	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

module.exports = router;