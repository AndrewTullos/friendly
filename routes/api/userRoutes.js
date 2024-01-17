const router = require("express").Router();

const {
	getUser,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/userController");

// Get a user and create a new
// /api/users
router.route("/").get(getUser).post(createUser);

// Get update delete single user by Id
// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
