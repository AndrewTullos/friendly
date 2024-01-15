const express = require("express");
const router = express.Router();

// Route to create a new thought/post
router.post("/create", (req, res) => {});

// Route to delete a thought/post
router.delete("/delete/:id", (req, res) => {});

module.exports = router;
