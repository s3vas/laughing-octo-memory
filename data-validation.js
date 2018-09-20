const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => {
	console.log('Connected to mongoDb')
}).catch((err) => { console.erron(err) }); //connect to db

const courseSchema = new mongoose.Schema(  //db.schema
	{
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,

		},
		category: {
			required: true,
			type: String,
			enum: ['web', 'mobile', 'network'],
			lowercase: true ,//mongoose field.toLower(),
			//uppercase: false,
			trim :true
		},
		author: String,
		tags: {
			type: Array,
			validate: {  //custom validator
				validator: function (v) {
					return v && v.length > 0;
				},
				message: 'A course should have at least 1 tag'
			}
		},
		date: { type: Date, default: Date.now },
		isPublished: Boolean,
		price: {
			type: Number, required: function () {
				return this.isPublished;
			},
			min: 10,
			max: 200,
			get: v => Math.round(v),
			set : v=>Math.round(v)
		}
	}
);

const Course = mongoose.model('Course', courseSchema); //class -- Course is the collection courses in singular

async function createCourse() {
	const course = new Course({   //object
		name: 'Angular Course',
		author: 'Mosh',
		tags: ['angular', 'frontend'],
		isPublished: true,
		category: 'web',
		price: 15.5
	});

	try {
		const result = await course.save();
		console.log(result);
	}
	catch (ex) {
		console.log(ex.message);
	}
}

async function getCourses() {
	const pageNumber = 2;
	const pageSize = 10;
	const courses = Course
		.find({ author: 'Mosh', isPublished: true })


		.skip((pageNumber - 1) * pageSize) //pagination
		.limit(pageSize)


		.sort({ name: 1 }) //asc = 1, desc = -1 by name
		.select({ name: 1, tags: 1 })
		//.count() 
		.then((res) => {
			console.log(res)
		});
}

async function updateCourseQueryFirst(id) {
	const course = await Course.findById(id);

	if (!course) return;

	course.isPublished = true;  //option 1
	course.author = 'Mitsos2';

	const result = await course.save();
	console.log(result);
}

async function updateCourseUpdateFirst(id) {
	//Approach : Update first

	const course = await Course.update({ _id: id }, {
		$set: {
			author: 'Mosh',
			isPublished: false
		}
	});

	console.log(course);
}

async function removeCourse(id) {
	//const result = await Course.deleteOne({ _id: id });
	//const result = await Course.deleteMany({ _id: id });
	const result = await Course.findByIdAndRemove(id);

	console.log(result);
}

createCourse();

//test
