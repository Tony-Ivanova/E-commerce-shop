import express from 'express'
import products from './data/Products.js'
import dotenv from 'dotenv'
import connectDatabase from './config/mongoDb.js'

dotenv.config()
connectDatabase()
const app = express()

const PORT = process.env.PORT || 1000;


app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.get('/', (req, res) => {
    res.send('API is running')
})



app.listen(PORT, console.log(`Server running on port ${PORT}`))