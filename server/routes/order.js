require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')

const {
    verifyAuthorizations,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken.js')
const Order = require('../Models/Order')
const { route } = require('./user.js')

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const newOrder = new Order(req.body)
            await newOrder.validate()
            const savedOrder = await newOrder.save()
            res.status(200).send(savedOrder)
        } catch (error) {
            next(error)
        }
    }
)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )
            res.status(200).json(updatedOrder)
        } catch (error) {
            next(error)
        }
    }
)

router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        const { id } = req.params
        try {
            const orderDeleted = await Order.findByIdAndDelete(id)
            if (orderDeleted)
                return res.status(200).json('Order has been deleted')
            res.status(400).send('No match any order')
        } catch (error) {
            next(error)
        }
    }
)

//Get order
router.get(
    '/getcard/:userId',
    passport.authenticate('jwt', { session: false }),
    verifyAuthorizations,
    async (req, res, next) => {
        const { userId } = req.params
        try {
            await Order.find({ userId: userId })
                .then((order) => res.status(200).send(order))
                .catch((err) => res.status(400).send(err.message))
        } catch (error) {
            next(error)
        }
    }
)

// // // //get_all_carts

router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        try {
            const orders = await Order.find()
            res.status(200).send(orders)
        } catch (error) {
            next(error)
        }
    }
)

// get monthly income

router.get(
    '/income',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        try {
            const date = new Date()

            const lastMonth = new Date(date.setMonth(date.getMonth() - 1))

            const previousMonth = new Date(
                new Date().setMonth(lastMonth.getMonth() - 1)
            )

            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: {
                            $month: '$createdAt',
                        },
                        sales: '$amount',
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: '$sales' },
                    },
                },
            ])
            res.status(200).send(income)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
