const express = require("express");
const app = express();
const userRoutes = require("./userRoutes");
const expressListEndpoints = require("express-list-endpoints");

app.use("/users", userRoutes);
console.log(expressListEndpoints(app));
