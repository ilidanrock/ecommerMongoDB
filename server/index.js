require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var morgan = require("morgan");

const useRoutes = require("./routes/index");

const { URI } = process.env;

mongoose
  .connect(URI)
  .then(() => console.log("DBconnection Successfull"))
  .catch((err) => {
    console.log("DB connection error", err);
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use("/api", useRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
