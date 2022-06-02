require("dotenv").config();
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../Models/User");
const { SECRET } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

const strategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    throw error;
  }
});

module.exports = strategy;
