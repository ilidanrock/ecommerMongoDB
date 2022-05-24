const router = require('express').Router()
const User = require("../Models/User")


//Register

router.post("/register", async (req,res,next) => {

    const { username , email , password , isAdmin } = req.body
    const newUser =  new User({
        username : username,
        email: email,
        password: password,
        isAdmin: isAdmin
    })

    await newUser.validate()
    newUser.save(function (err) {
        if (err) return console.log(err);
        // saved!
      });
})

module.exports = router