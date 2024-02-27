const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const UserModel = mongoose.model("users", UserSchema); //we create it here
// users : collectionName under  -->Database: simpleMernCRUD--> under cluster :clusterO
module.exports = UserModel;
