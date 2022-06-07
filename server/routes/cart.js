require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')

const {
    verifyAuthorizations,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken.js')
const Cart = require('../Models/Cart')
const { route } = require('./user.js')

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const newCart = new Cart(req.body)
            await newCart.validate()
            const savedCart = await newCart.save()
            res.status(200).send(savedCart)
        } catch (error) {
            next(error)
        }
    }
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    verifyAuthorizations,
    async (req, res, next) => {
        try {
            const updatedCart = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )
            res.status(200).json(updatedCart)
        } catch (error) {
            next(error)
        }
    }
)

router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    verifyAuthorizations,
    async (req, res, next) => {
        const { id } = req.params
        try {
            const cartDeleted = await Cart.findByIdAndDelete(id)
            if (cartDeleted)
                return res.status(200).json('Cart has been deleted')
            res.status(400).send('No match any cart')
        } catch (error) {
            next(error)
        }
    }
)

//Get cart
router.get(
    '/getcard/:userId',
    passport.authenticate('jwt', { session: false }),
    verifyAuthorizations,
    async (req, res, next) => {
        const { userId } = req.params
        try {
            await Cart.findOne({ userId: userId })
                .then((cart) => res.status(200).send(cart))
                .catch((err) => res.status(400).send(err.message))
        } catch (error) {
            next(error)
        }
    }
)

// // //get_all_carts

router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        try {
            const carts = await Cart.find()
            res.status(200).send(carts)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
