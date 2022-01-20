const express = require('express')
const productController = require('../controllers/products')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('/', productController.getProducts)
route.get('/:id', productController.getProductDetail)
route.get('/category', productController.getProductCategory)
route.post('/', validator.productFormValidation, productController.addProduct)
route.put('/:id', validator.productFormValidation, productController.updateProduct)

module.exports = route