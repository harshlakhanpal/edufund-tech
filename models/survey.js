const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const surveySchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  responses: [
    {
      body: String,
      userId: String,
      createdAt: String,
    },
  ],
  minAge: { type: Number },
  genderSpecific: { type: String, enum: ["male", "female", "all"] },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("Survey", surveySchema);
