require("dotenv").config();
var jwt = require('jsonwebtoken')

const { SECRET } = process.env;

function createToken (payload){
  return jwt.sign({ _id: payload._id, isAdmin: payload.isAdmin }, SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  createToken
};
