const router = require('express').Router()

router.get("/usertest", (req ,res ,next) => {
    res.send("user test is sucessfull")
})

router.post("/userposttest", (req,res,next) => {
    const { username , lastName } = req.body
    try {
        console.log(username);
    } catch (error) {
        
    }
})

module.exports = router
