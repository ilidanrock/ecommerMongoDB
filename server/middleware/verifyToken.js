require('dotenv').config()
const jwt = require('jsonwebtoken')

const { SECRET } = process.env

const verifyAuthorizations = (req, res, next) => {
    try {
        const idHeader = req.params.id
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            let decoded = jwt.verify(token, SECRET)
            if (decoded._id === idHeader || decoded.isAdmin) {
                return next()
            }
            throw new Error(
                `${" User id doesn't match with token id or user isn't admin. "}`
            ).stack
        }
    } catch (error) {
        next(error)
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyAuthorizations(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You aren't allowed to do that")
        }
    })
}
module.exports = { verifyAuthorizations, verifyTokenAndAdmin }
