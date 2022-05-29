require("dotenv").config();
import { Strategy, ExtractJwt } from "passport-jwt";
const User = require("../Models/User");

const { SECRET } = process.env;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};
export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById({ _id: payload._id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    throw error;
  }
});
