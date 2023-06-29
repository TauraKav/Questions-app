const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const {
    INSERT_ANSWER,
    GET_QUESTION_WITH_ANSWERS,
    DELETE_ANSWER_BY_ID
} = require("../controllers/answers");


router.post("/question/:id/answer", authMiddleware, INSERT_ANSWER);
// router.get("/question/:id/answers", GET_QUESTION_WITH_ANSWERS);
// router.delete("/answer/:id", authMiddleware, DELETE_ANSWER_BY_ID);


module.exports = router;