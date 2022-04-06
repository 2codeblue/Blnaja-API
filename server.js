const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4000
const commonHelper = require('./src/helper/common')
const userRoutes = require('./src/routes/users.js')
const productRoutes = require('./src/routes/products')
const bagsRoutes = require('./src/routes/bags')
const ordersRoutes = require('./src/routes/orders')
const addressRoutes = require('./src/routes/address')
const paymentRoutes = require('./src/routes/payments')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/bags', bagsRoutes)
app.use('/orders', ordersRoutes)
app.use('/addresses', addressRoutes)
app.use('/payment-methods', paymentRoutes)

app.use(commonHelper.handleURLNotFound)

app.use((err, req, res, next) => {
    const statusCode = err.status
    const message = err.message
    res.status(statusCode)
    res.json({
        status : statusCode,
        message : message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})