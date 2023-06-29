const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const mongoose = require("mongoose");

const questionsRouter = require("./routes/questions");
const userRouter = require("./routes/user");
const answersRouter = require("./routes/answers");


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(questionsRouter);
app.use(userRouter);
app.use(answersRouter);

mongoose
  .connect(process.env.MONGO_CONNECT) 
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Your app is alive!!!!!");
});

