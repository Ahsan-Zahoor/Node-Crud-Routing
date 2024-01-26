// userRoutes.js
const express = require("express");
const userModel = require("../models/userModel"); // Adjust the path accordingly

const router = express.Router();

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await userModel.createUser(req.body); // Assuming you have a createUser method in userModel

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.getAllUsers(); // Assuming you have a getAllUsers method in userModel

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a specific user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id); // Assuming you have a getUserById method in userModel

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body); // Assuming you have an updateUser method in userModel

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a user partially by ID
router.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.updateUserPartial(
      req.params.id,
      req.body
    ); // Assuming you have an updateUserPartial method in userModel

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated partially", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id); // Assuming you have a deleteUser method in userModel

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
