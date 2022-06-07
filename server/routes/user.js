require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')
const CryptoJS = require('crypto-js')

const {
    verifyAuthorizations,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken.js')
const User = require('../Models/User.js')

const { SECRET } = process.env

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    verifyAuthorizations,
    async (req, res, next) => {
        console.log('Dentro de la ruta', req.user)
        try {
            const { password } = req.body
            let cryted = CryptoJS.AES.encrypt(password, SECRET).toString()

            if (cryted) {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: { ...req.body, password: cryted },
                    },
                    { new: true }
                )
                res.status(200).json(updatedUser)
            }
        } catch (error) {
            next(error)
        }
    }
)

router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const userDeleted = await User.findByIdAndDelete(id)
        if (userDeleted) return res.status(200).json('User has been deleted')
        res.status(400).send('No match any user')
    } catch (error) {
        next(error)
    }
})

//Get user
router.get(
    '/getuser/:id',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        const { id } = req.params
        try {
            await User.findById(id, 'username email isAdmin')
                .then((user) => res.status(200).send(user))
                .catch((err) => res.status(400).send(err.message))
        } catch (error) {
            next(error)
        }
    }
)

//get_all_users

router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        const { newuser } = req.query
        try {
            const users = newuser
                ? await User.find({}).sort({ _id: -1 }).limit(1)
                : await User.find({}, 'username email isAdmin')
            res.status(200).send(users)
        } catch (error) {
            next(error)
        }
    }
)

//GET USER STATS

router.get(
    '/stats',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: 1 },
                    },
                },
            ])
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
)
module.exports = router
