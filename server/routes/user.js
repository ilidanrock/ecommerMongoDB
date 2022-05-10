const router = require('express').Router()

router.get("/usertest", (req ,res ,next) => {
    res.send("user test is sucessfull")
})

router.post("/userposttest", (req,res,next) => {
    const { username , lastName } = req.body
    console.log(req.body);
    try {
        
        res.send("SHIRU")
    } catch (error) {
        
    }
})

module.exports = router
