const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	age: Number,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	thoughts: {
		type: Schema.Types.ObjectId,
		ref: "Thought",
	},
	friends: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
