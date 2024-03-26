const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const {questions} from "./"
const Questions = require("./question");

const questionCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
  },
});

module.exports = mongoose.model("Category", questionCategorySchema);
