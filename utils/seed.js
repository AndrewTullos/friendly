const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

mongoose.connect("mongodb://localhost:27017/friendlySocialDB", {
	// Update with your MongoDB connection string
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const seedUsers = [
	{
		username: "Drewww",
		email: "drew@gmail.com",
		thoughts: [],
		friends: [],
	},
	{
		username: "Kate44",
		email: "kate@hotmail.com",
		thoughts: [],
		friends: [],
	},
	{
		username: "Mikey123",
		email: "mike@clams.com",
		thoughts: [],
		friends: [],
	},
	{
		username: "timbo",
		email: "tim@yahoo.com",
		thoughts: [],
		friends: [],
	},
	{
		username: "Victoriugh",
		email: "vicr5@gmail.com",
		thoughts: [],
		friends: [],
	},
];

const seedThoughts = [
	{
		thoughtText: "Thinking about the meaning of life...",
		username: "Drewww",
	},
	{
		thoughtText: "I love coding!",
		username: "Kate44",
	},
	{
		thoughtText: "Why is pizza so delicious?",
		username: "Mikey123",
	},
	{
		thoughtText: "I should travel more",
		username: "timbo",
	},
	{
		thoughtText: "Reading is a window to another world",
		username: "Victoriugh",
	},
];
const seedDatabase = async () => {
	try {
		await User.deleteMany({});
		await Thought.deleteMany({});

		const createdThoughts = await Thought.insertMany(seedThoughts);

		// Link the created thoughts to the respective users
		for (let thought of createdThoughts) {
			await User.findOneAndUpdate(
				{ username: thought.username },
				{ $push: { thoughts: thought._id } }
			);
		}

		await User.insertMany(seedUsers);
		console.log("Database seeded successfully with users and thoughts.");
	} catch (error) {
		console.error("Error seeding database: ", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
