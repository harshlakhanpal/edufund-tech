const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  isCoordinator: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
