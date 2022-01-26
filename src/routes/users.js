const express = require('express')
const userController = require('../controllers/users')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('/customer/:id', userController.customerDetail)
route.post('/customer/signup', validator.customerSignUpValidation, userController.customerSignUp)
route.post('/customer/login', userController.customerLogin)
route.put('/customer/:id', userController.customerUpdate)

route.get('/seller/:id', userController.sellerDetail)
route.post('/seller/signup', validator.sellerSignUpValidation, userController.sellerSignUp)
route.post('/seller/login', userController.sellerLogin)
route.put('/seller/:id', validator.sellerUpdateValidation, userController.sellerUpdate)

module.exports = route