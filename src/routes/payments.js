const express = require('express')
const paymentController = require('../controllers/payments')
const route = express.Router()

route.get('/', paymentController.getPaymentMethods)

module.exports = route