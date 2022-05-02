import express from 'express'
import asyncHandler from 'express-async-handler'
import { protect } from '../middlewares/auth.js';
import Order from "../models/order.js"

const router = express.Router();

router.post('/', protect, asyncHandler(
    async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body

        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error("No order items")
            return
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })

            const createOrder = await order.save()
            res.status(201).json(createOrder)
        }
    })
)

router.get('/:id', protect, asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )

        if (order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error ("Order Not Found")
        }
    })
)
export default router