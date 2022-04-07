const express = require('express')
const ordersController = require('../controllers/orders')
const route = express.Router()

route.get('/:id', ordersController.getOrdersByCustomerId)
route.post('/add-order/', ordersController.addOrder)
route.get('/details/:id', ordersController.getOrderDetails)

module.exports = route