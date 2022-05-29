require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
var jwt = require("jsonwebtoken");

const { SECRET } = process.env;

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { id } = req.params;
    try {
      const token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, SECRET);
      if (decoded._id === id || decoded.isAdmin) {
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
