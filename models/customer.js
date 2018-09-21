const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
		isGold: {
			Boolean,
			default:false
		},
		phone: {
			type: Number,
			min: 5,
			max: 10
		}
	}
));

function validateCustomer(genre) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		phone: Joi.string().min(5).max(50).required()(),
		isGold: Joi.boolean()
	};

	return Joi.validate(genre, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;