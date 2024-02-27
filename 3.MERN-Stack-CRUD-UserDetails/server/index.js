// used 'common js' format instead of 'module' format
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/UserModel");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
//  ENDPOINT 1: CREATE USER /createUser
app.post("/createUser", (request, response) => {
  UserModel.create(request.body)
    .then((users) => response.json(users))
    .catch((err) => response.status(400).json(err));
});
// simpleMernCRUD is database name
app.listen(5000, () => {
  console.log(`Server is Running at ${5000} `);
});
