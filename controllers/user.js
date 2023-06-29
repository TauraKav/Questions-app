const uniqid = require("uniqid");
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.REGISTER = async (req, res) => {
    try {
if ( req.body.email.includes('@') && /\d/.test(req.body.password) && req.body.password.length >= 6 ) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          const user = new userModel({
            id: uniqid(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            asked_questions_ids: []
          });
  
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {
              algorithm: "RS256",
            }
          );

          await user.save();
      
          return res.status(200).json({ response: "Registration was successfully", token });
        });
      });
    

} else {res.status(400).json({ response: "Registration failed" })}

    } catch (err) {
      res.status(500).json({ response: "User was not saved, please try later" });
    }
  };

  module.exports.LOGIN = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ response: "Bad data" });
      }
  
      bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {
              algorithm: "RS256",
            }
          );

          return res.status(200).json({ response: "You logged in", token, userId: user.id });
        } else {
          return res.status(404).json({ response: "Bad data" });
        }
      });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "ERROR, please try later" });
    }
  };

