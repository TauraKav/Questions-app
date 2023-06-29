const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  title: { type: String, required: true, min: 3 },
  text: { type: String, required: true, min: 3 },
  answers_ids: { type: Array, required: false },
});

module.exports = mongoose.model("question", questionSchema);