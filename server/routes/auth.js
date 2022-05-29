require("dotenv").config();
const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const { createToken } = require("../token/createtoken");

const { SECRET } = process.env;

//Register

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const newUser = new User({
      username: username,
      email: email,
      password: CryptoJS.AES.encrypt(password, SECRET),
      isAdmin: isAdmin,
    });
    await newUser.validate();
    await newUser
      .save()
      .then((savedUser) => res.status(200).json(savedUser))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  const { email } = req.body;
  const pass = req.body.password;

  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.status(401).json("Wrong email");

    const disHashed = CryptoJS.AES.decrypt(user.password, SECRET);
    const passString = disHashed.toString(CryptoJS.enc.Utf8);
    let { password, ...rest } = user._doc;
    let token = createToken(user);
    passString === pass
      ? res.status(200).json({ token, ...rest })
      : next(new Error("User password don't match"));
  } catch (error) {
    next(error);
  }
});



module.exports = router;
