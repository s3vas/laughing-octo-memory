const _ = require('lodash'); //by convention naming
const { User } = require('../models/user')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config');


//POST - login
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);  //standard

	let user = await User.findOne({ email: req.body.email }) //unique email
	if (!user)
		return res.status(400).send('Invalid email or password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		return res.status(400).send('Invalid email or password');

	//JWT
	let token = user.generateAuthToken();
	res.send(token);

	//To logout simply delete the token from client-side
});


function validate(user) {
	const schema = {
		email: Joi.string().min(5).max(255).email(),
		password: Joi.string()
	};

	return Joi.validate(user, schema);
}

module.exports = router;