const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  text: { type: String, required: true, min: 3 },
  gained_likes_number: { type: Number, required: true },
});

module.exports = mongoose.model("answer", answerSchema);