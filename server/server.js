import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/mongoDb.js'
import ImportData from './DataImport.js'
import productRouter from './routes/products.js'
import userRouter from './routes/user.js'
import orderRouter from './routes/order.js'
import { errorHandler, notFound } from './middlewares/errors.js'

dotenv.config()
connectDatabase()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 1000;

app.use('/api/import', ImportData)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on port ${PORT}`))