const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(() => {
	console.log('Connected to mongoDb')
}).catch((err) => { console.erron(err) }); //connect to db

const courseSchema = new mongoose.Schema(  //db.schema
	{
		name: String,
		author: String,
		tags: [String],
		date: { type: Date, default: Date.now },
		isPublished: Boolean
	}
);

const Course = mongoose.model('Course', courseSchema); //class -- Course is the collection courses in singular

async function createCourse() {
	const course = new Course({   //object
		name: 'Angular Course',
		author: 'Mosh',
		tags: ['angular', 'frontend'],
		isPublished: true
	});

	const result = await course.save();

	console.log(result);
}
   
async function getCourses() {

	//Query Operators
	//----------------------------------------
	// eq (equal)    
	//ne(not equal)
	//gt	(greater than) 
	//gte	(greater than or equal)
	//lt (less than)
	//lte (less than or equal)
	//in 
	//nin (not in)

	//======================================

	//Logical Operators
	//--------------------------
	//or
	//and


	const pageNumber = 2;
	const pageSize = 10;
	//.find({ author: 'Mosh', isPublished: true })

	//QUERY
	//.find({ price: { $gt: 10, $lte: 20 } })    // .net -> where(x=>x.price > 10 && x.price < 20)
	//.find({ price: { $in: [10, 15, 20] } })    // .net -> where(x=>x.price == 10 || x.price == 15 || x.price == 20)


	//LOGICAL
	//.find()
	//.or([{ author: 'Mosh' }, { isPublished: true }])
	//.and([{}])

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
	//Approach : Query first
	//findById
	//modify ,save

	const course = await Course.findById(id);

	if (!course) return;

	course.isPublished = true;  //option 1
	course.author = 'Mitsos2';

	//course.set({							//option 2
	//	isPublished: true,
	//	author: 'Mitsos'
	//});

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
	const result = await  Course.findByIdAndRemove(id);

	console.log(result);
}

