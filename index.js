﻿const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(function () {
		console.log('Connected to MongoDb...');
	})
	.catch(function () {
		console.log('Failed to connect to MongoDb...');
	});

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));