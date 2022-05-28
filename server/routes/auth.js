const router = require("express").Router();
const User = require("../Models/User");
const errorHandler = require("../errorHandlers");

//Register

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const newUser = new User({
      username: username,
      email: email,
      password: password,
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

module.exports = router;
