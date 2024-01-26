const express = require("express");
const userModel = require("./models/userModel");
const app = express();
const port = 3000;

// Create the user table when the application starts
userModel.createUserTable();

// Seed data into the users table
userModel.seedData();

app.get("/", (req, res) => {
  res.send({ status_code: "Hello, Express!!" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
