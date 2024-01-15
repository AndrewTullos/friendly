const express = require("express");
const router = express.Router();
const {
	getUsers,
	getSingleUser,
	createUser,
} = require("../../controllers/userController");

// Route to create a new user
router.post("/register", (req, res) => {});

// Route to update a user profile
router.put("/update", (req, res) => {});

module.exports = router;

module.exports = router;
