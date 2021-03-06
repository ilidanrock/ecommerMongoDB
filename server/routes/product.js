require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')

const {
    verifyAuthorizations,
    verifyTokenAndAdmin,
} = require('../middleware/verifyToken.js')
const Product = require('../Models/Product')

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    verifyTokenAndAdmin,
    async (req, res, next) => {
        try {
            const newProduct = new Product(req.body)
            await newProduct.validate()
            const savedProduct = await newProduct.save()
            res.status(200).send(savedProduct)
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
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: { ...req.body },
                },
                { new: true }
            )
            res.status(200).json(updatedProduct)
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
            const productDeleted = await Product.findByIdAndDelete(id)
            if (productDeleted)
                return res.status(200).json('Product has been deleted')
            res.status(400).send('No match any product')
        } catch (error) {
            next(error)
        }
    }
)

//Get product
router.get('/getproduct/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        await Product.findById(id, 'title desc img categories size color price')
            .then((product) => res.status(200).send(product))
            .catch((err) => res.status(400).send(err.message))
    } catch (error) {
        next(error)
    }
})

// //get_all_products

router.get('/products', async (req, res, next) => {
    const { qNew, qCategory } = req.query
    try {
        let products
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            })
        } else {
            products = await Product.find()
        }
        res.status(200).send(products)
    } catch (error) {
        next(error)
    }
})

module.exports = router
