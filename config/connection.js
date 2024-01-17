const mongoose = require("mongoose");

const connectionString =
	process.env.MONGODB_URI || "mongodb://localhost:27017/friendlySocialDB";

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindAndModify: false,
	})
	.then(() => console.log("Connected to MongoDB."))
	.catch((err) => console.error("Could not connect to MongoDB:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
