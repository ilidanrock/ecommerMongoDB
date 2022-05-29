require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
var morgan = require("morgan");
const passport = require('passport')
const strategy = require("./middleware/passMiddle")

const useRoutes = require("./routes/index");

const { URI } = process.env;

mongoose
  .connect(URI)
  .then(() => console.log("DBconnection Successfull"))
  .catch((err) => {
    console.log("DB connection error", err);
  });

app.use(passport.initialize())
passport.use(strategy)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api", useRoutes);


app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  let status = err.status || 500;
  let message = err.message || err;
  (err.message === "User password don't match")? status = 401 : status
  console.error("ERROR IN INDEX",err);
  res.status(status).send(message);
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
