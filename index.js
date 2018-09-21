const genres = require('./routes/genres');
const customers = require('./routes/customers');
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));