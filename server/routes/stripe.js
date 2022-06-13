require('dotenv').config()
const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/payment', async (req, res, next) => {
    console.log("ENTRENADO A LA RUTA", req.body);
    await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }).then(stripeSuccess => {
        res.status(200).send(stripeSuccess)
    }).catch(stripeErr => {
        res.status(500).send(stripeErr)
    })
})
module.exports = router
