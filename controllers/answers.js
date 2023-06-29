const uniqid = require("uniqid");
const answerModel = require("../models/answer");
const questionModel = require("../models/question");

module.exports.INSERT_ANSWER = async (req, res) => {
  try {
    const answer = new answerModel({
      id: uniqid(),
      text: req.body.text,
      gained_likes_number: 0

    });
    const createdAnswer = await answer.save();

  questionModel.updateOne(
      { id: req.body.id },
      { $push: { answers_ids: createdAnswer.id } }
    ).exec();
    
    return res.status(200).json({ response: "Answer was added" });

  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ response: "ERROR" });
  }
};
