import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.js';
import { admin, protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', asyncHandler(
    async (req, res) => {
        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            },
        } : {}

        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)).sort({ _id: -1 })
        res.json({ products, page, pages: Math.ceil(count / pageSize) })
    })
)

router.get('/all', protect, admin, asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 })
    res.json(products)
}))

router.get('/:id', asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

router.post('/:id/review', protect, asyncHandler(
    async (req, res) => {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )
            if (alreadyReviewed) {
                res.status(400)
                throw new Error("Product already reviewed")
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length

            await product.save()
            res.status(201).json({ message: "Reviewed Added" })
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

router.delete('/:id', protect, admin, asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.remove()
            res.json({ message: "Product deleted" })
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

router.post('/', protect, admin, asyncHandler(
    async (req, res) => {
        const { name, price, description, image, countInStock } = req.body
        const productExist = await Product.findOne({ name })
        if (productExist) {
            res.status(400)
            throw new Error('Product name already exists')
        } else {
            const product = new Product({
                name: name + ' ', price, description, image, countInStock,
                user: req.user._id
            })
            if (product) {
                const createdProduct = await product.save()
                res.status(201).json(createdProduct)
            } else {
                res.status(400)
                throw new Error("Invalid product data")
            }
        }
    })
)

router.put('/:id', protect, admin, asyncHandler(
    async (req, res) => {
        const { name, price, description, image, countInStock } = req.body
        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = name || product.name
            product.price = price || product.price
            product.description = description || product.description
            product.image = image || product.image
            product.countInStock = countInStock || product.countInStock

            const updateProduct = await product.save()
            res.json(updateProduct)
        } else {
            res.status(404)
            throw new Error("Product not found")
        }
    }
)

)

export default router