const express = require('express')
const userController = require('../controllers/users')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('customer/:id')
route.post('customer/signup', validator.customerSignUpValidation, userController.customerSignUp)
route.post('customer/login', userController.customerLogin)
route.put('customer/:id', validator.customerUpdateValidation ,userController.customerUpdate)

route.post('seller/signup', validator.sellerSignUpValidation, userController.sellerSignUp)
route.post('seller/login', userController.sellerLogin)

module.exports = route