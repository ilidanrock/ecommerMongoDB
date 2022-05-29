require("dotenv").config();
var jwt = require('jsonwebtoken')

const { SECRET } = process.env;

function createToken (payload){
  return jwt.sign({ id: payload.id, email: payload.isAdmin }, SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  createToken
};
