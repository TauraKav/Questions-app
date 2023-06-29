const uniqid = require("uniqid");
const answerModel = require("../models/answer");

module.exports.INSERT_QUESTION = async (req, res) => {
    try {
        const question = new questionModel({
            id: uniqid(),
            title: req.body.title,
            text: req.body.text,
            answers_ids: [],
        });

        await question.save();

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
    await questionModel.deleteOne({ _id: req.params.id })
        res.status(200).json({ response: "Question was deleted"});
      } catch (err)  {
        console.log("err", err);
        res.status(500).json({ response: "Err in DB" });
      };
  };