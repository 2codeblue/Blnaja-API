const express = require('express')
const productController = require('../controllers/products')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('/', productController.getProducts)
route.get('/details/:id', productController.getProductDetail)
route.get('/category/', productController.getProductCategory)
route.get('/category/:id', productController.getDetailProductCategory)
route.post('/', validator.productFormValidation, productController.addProduct)
route.post('/category', validator.productCategoryForm, productController.addProductCategory)
route.put('/:id', validator.productFormValidation, productController.updateProduct)
route.delete('/:id')

module.exports = route