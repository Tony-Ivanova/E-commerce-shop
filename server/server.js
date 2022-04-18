import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './config/mongoDb.js'
import ImportData from './DataImport.js'
import router from './routes/products.js'

dotenv.config()
connectDatabase()

const app = express()

const PORT = process.env.PORT || 1000;

app.use('/api/import', ImportData)
app.use('/api/products', router)

app.get('/', (req, res) => {
    res.send('API is running')
})

app.listen(PORT, console.log(`Server running on port ${PORT}`))