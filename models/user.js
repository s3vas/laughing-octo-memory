const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
		},
		isAdmin: Boolean
	}
)

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			isAdmin: this.isAdmin  //payload
		},
		config.get('jwtPrivateKey')); //this -> user
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).email(),
		password: new PasswordComplexity({
			min: 10,
			max: 30,
			lowerCase: 1,
			upperCase: 1,
			numeric: 1,
			symbol: 1,
			requirementCount: 3,
		}, (err, value) => {

		})
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;