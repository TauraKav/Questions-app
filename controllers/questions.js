const uniqid = require("uniqid");
const questionModel = require("../models/question");
const userModel = require("../models/user");

module.exports.INSERT_QUESTION = async (req, res) => {
    try {
        const question = new questionModel({
            id: uniqid(),
            title: req.body.title,
            text: req.body.text,
            answers_ids: [],
        });

        const createdQuestion = await question.save();
console.log (req.body.id);
  userModel.updateOne(
      { id: req.body.id},
      { $push: { asked_questions_ids: createdQuestion.id } }
    ).exec();

        return res.status(200).json({ response: "Question was created" });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ response: "ERROR" });
    }
};

module.exports.GET_ALL_QUESTIONS = async (req, res) => {
    try {
      const questions = await questionModel.find();
      
      res.status(200).json({ questions: questions });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "ERROR, please try later" });
    }
  };

  module.exports.DELETE_QUESTION_BY_ID = async (req, res) => {
    try { 
    await questionModel.deleteOne({ id: req.params.id })
        res.status(200).json({ response: "Question was deleted"});
      } catch (err)  {
        console.log("err", err);
        res.status(500).json({ response: "Err in DB" });
      };
  };