require('express-async-errors');
const winston = require('winston');
const config = require('config');
const error = require('./middleware/error')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const register = require('./routes/register');
const login = require('./routes/login');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' }); //logging

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR ');
	process.exit(1); // exits with error 
}

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
app.use('/api/register', register);
app.use('/api/login', login);

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));