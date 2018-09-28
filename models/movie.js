const mongoose = require('mongoose');
const { genreSchema } = require('./genre')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Movie = mongoose.model('Movie', new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255
		},
		genre: {
			type: genreSchema,
			required: true
		},
		numberInStock: Number,
		dailyRentalRate: Number
	}
));

function validateMovie(movie) {
	const schema = {
		title: Joi.string().min(3).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().required(),
		dailyRentalRate: Joi.number().required(),
	};

	return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;