const { User, Thought } = require("../models");

module.exports = {
	getUser(req, res) {
		User.find({})
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},

	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.populate("thoughts")
			.populate("friends")
			.select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User found with that ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	createUser(req, res) {
		User.findOne({ username: req.body.username })
			.then((existingUser) => {
				if (existingUser) {
					return res.status(400).json({ message: "Username already taken." });
				}
				return User.create(req.body);
			})
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},

	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User found with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.json({ message: "No User found with this ID!" });
				}
				return Thought.deleteMany({ _id: { $in: user.thoughts } }).then(() =>
					res.json({ message: "User and User's Thoughts deleted!" })
				);
			})
			.catch((err) => {
				console.error("Error in deleteUser:", err); // Log the error to the console
				res
					.status(500)
					.json({ message: "Internal Server Error", error: err.message });
			});
	},

	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User found with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No User found with this ID!" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
