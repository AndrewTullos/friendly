const router = require("express").Router();
const express = require("express");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const postRoutes = require("./thoughtRoutes");

// Use the routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/thoughts", postRoutes);

module.exports = router;
