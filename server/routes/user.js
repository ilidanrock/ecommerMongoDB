require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const CryptoJS = require("crypto-js");

const {verifyToken} = require("../middleware/verifyToken.js");
const User = require("../Models/User.js");

const { SECRET } = process.env;

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyToken,
  async (req, res, next) => {
    console.log("Dentro de la ruta", req.user);
    try {
      const { password } = req.body;
      let cryted = CryptoJS.AES.encrypt(password, SECRET).toString();

      if (cryted) {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: { ...req.body, password: cryted },
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
