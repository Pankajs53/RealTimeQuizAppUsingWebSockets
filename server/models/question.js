const mongoose = require("mongoose");
// const {Schema} = mongoose;

const questionSchema = new mongoose.Schema({
  Question: {
    type: String,
    require: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Questions", questionSchema);
