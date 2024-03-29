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

//  ENDPOINT 2: GET USERS
app.get("/", (request, response) => {
  UserModel.find()
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
});
// -------------------EDIT ENDPOINTS--------------
// ENDPOINT 3: GET USER BY ID (to edit details in ui for particular user first we need to get their details with id)
app.get("/getUser/:id", (request, response) => {
  const id = request.params.id; //from client
  const _id = id; //but in database we have _id ,so assign that 'id' from client to '_id' variable of database and search
  UserModel.findById({ _id })
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
});
// ENDPOINT 4: EDIT USER Which has  USER BY ID (to edit details in ui for particular user first we need to get put request details by their  id)
app.put("/editUser/:id", (request, response) => {
  const id = request.params.id; //from client
  const _id = id; //but in database we have _id ,so assign that 'id' from client to '_id' variable of database and search
  UserModel.findByIdAndUpdate(
    { _id },
    {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age,
    }
  )
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
});
// ------------------DELETE ENDPOINT-----------

// ENDPOINT 5: DELETE USER Which has  USER BY ID (to Delete details in ui for particular user first we need to  delete request details by their  id)
app.delete("/deleteUser/:id", (request, response) => {
  const id = request.params.id; //from client
  const _id = id; //but in database we have _id ,so assign that 'id' from client to '_id' variable of database and search
  UserModel.findByIdAndDelete(
    { _id },
    {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age,
    }
  )
    .then((users) => response.json(users))
    .catch((err) => response.json(err));
});
// simpleMernCRUD is database name
app.listen(5000, () => {
  console.log(`Server is Running at ${5000} `);
});
