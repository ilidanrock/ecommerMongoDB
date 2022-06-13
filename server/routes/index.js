const router = require('express').Router()

const user = require('./user')
const auth = require('./auth')
const cart = require('./cart')
const order = require('./order')
const product = require('./product')
const stripe = require('./stripe')

router.use('/user', user)
router.use('/auth', auth)
router.use('/cart', cart)
router.use('/order', order)
router.use('/product', product)
router.use('/stripe', stripe)

module.exports = router
