const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema(
	{
		name: String,
		author: String,
		tags: [String],
		date: { type: Date, default: Date.now },
		isPublished: Boolean,
		price: Number
	}
);

const Course = mongoose.model('Course', courseSchema);

async function ex1GetCourses() {
	return courses = await Course
		.find({ tags: 'backend', isPublished: true })
		.sort({ name: 1 })
		.select({ name: 1, author: 1 })
}

async function ex2GetCourses() {
	return courses = await Course
		.find({ isPublished: true })
		.or([{ tags: 'frontend' }, { tags: 'backend' }])
		.sort('-price')
		.select('name author price')
}

async function ex3GetCourses() {
	return courses = await Course
		.find({ isPublished: true })
		.or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])
}

//ex1GetCourses().then((result) => { console.log(result) });
//ex2GetCourses().then((result) => { console.log(result) });
ex3GetCourses().then((result) => { console.log(result) });

