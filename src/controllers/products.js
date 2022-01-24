const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const productQuery = require('../models/products')


const getProducts = async (req, res, next) => {
    try {
        const result = await productQuery.getProducts()
        commonHelper.response(res, result, 200, `List all products: `, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const getProductDetail = async (req, res, next) => {
    try {
        const productId = req.params.id
        const result = await productQuery.getProductDetail(productId)
        commonHelper.response(res, result, 200, `Product ${productId} detail: `, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const getProductCategory = async (req, res, next) => {
    try {
        const result = await productQuery.getProductCategory()
        commonHelper.response(res, result, 200, `List all product categories: `, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const addProduct = async (req, res, next) => {
    try {
        const {category_id, seller_id, name, price, product_condition, stock, description,
                image1, image2, image3, image4, image5} = req.body
        const productId = uuidv4()
        const productData = {
            id : productId, category_id : category_id, seller_id : seller_id, name : name, 
            price : price, product_condition : product_condition, stock : stock, description : description,
            image1 : image1, image2 : image2, image3 : image3, image4 : image4, image5 : image5
        }
        const result = await productQuery.addProduct(productData)
        commonHelper.response(res, result, 200, `Adding product ${productId} to ${seller_id}`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const getDetailProductCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id
        const result = await productQuery.getDetailProductCategory(categoryId)
        commonHelper.response(res, result, 200, `Detail ${categoryId}`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const addProductCategory = async (req, res, next) => {
    try {
        const {name} = req.body
        const categoryId = uuidv4()
        const categoryData = {
            id : categoryId,
            name : name,
        }
        const result = await productQuery.addProductCategory(categoryData)
        commonHelper.response(res, result, 200, `Product category : ${name} is added`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const {category_id, seller_id, name, price, product_condition, stock, description,
            image1, image2, image3, image4, image5} = req.body
        const productData = {
            category_id : category_id, seller_id : seller_id, name : name, 
            price : price, product_condition : product_condition, stock : stock, description : description,
            image1 : image1, image2 : image2, image3 : image3, image4 : image4, image5 : image5
        }
        const result = await productQuery.updateProduct(productData, productId)
        commonHelper.response(res, result, `Product ${productId} is updated`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    getProducts,
    getProductDetail,
    getProductCategory,
    addProduct,
    getDetailProductCategory,
    addProductCategory,
    updateProduct,
}