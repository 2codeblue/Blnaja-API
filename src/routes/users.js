const express = require('express')
const userController = require('../controllers/users')
const route = express.Router()
const validator = require('../middleware/validator')

route.post('customer/signup', validator.customerSignUpValidation, userController.customerSignUp)

route.post('seller/signup', validator.sellerSignUpValidation, userController.sellerSignUp) 
