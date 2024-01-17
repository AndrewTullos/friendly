const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			// REGEX Match
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address",
			],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);
// Middleware to delete user's thoughts when user is deleted
// UserSchema.pre("findOneAndDelete", async function (next) {
// 	const userId = this.getQuery()["_id"];
// 	await Thought.deleteMany({ userId: userId });
// 	next();
// });

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});
const User = model("User", UserSchema);

module.exports = User;
