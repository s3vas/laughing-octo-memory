const _ = require('lodash'); //by convention naming
const authorization = require('../middleware/authorization')
const { User, validate } = require('../models/user')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//GET - getCurrentUser
router.get('/me', authorization, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user)
})

//POST - register
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);  //standard

	let user = await User.findOne({ email: req.body.email }) //unique email
	if (user)
		return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, ['name', 'email', 'password']))

	const salt = await bcrypt.genSalt(10)  //hashing
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	let token = user.generateAuthToken();

	res.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email']));
});



module.exports = router;