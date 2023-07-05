const express = require("express");
const router = express.Router();

const {
  SIGNUP,
  LOGIN,
} = require("../controllers/user");

router.post("/signup", SIGNUP);
router.post("/logIn", LOGIN);

module.exports = router;

