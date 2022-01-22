const createError = require('http-errors')
const joi = require('joi')

const customerSignUpValidation = (req, res, next) => {
    const {name, email, password} = req.body
    const validateData = joi.object({
        name : joi.string().min(5).max(30).required(),
        email : joi.string().email().lowercase().required(),
        password : joi.string().min(8).max(16).alphanum().required()
    })
    
    const {error} = validateData.validate({
        name : name,
        email : email,
        password : password
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

const customerUpdateValidation = (req, res, next) => {
    const {name, email, phone_number, gender, DOB, profile_picture} = req.body
    const validationData = joi.object({
        name : joi.string().min(5).max(30).required(),
        email : joi.string().email().required(),
        phone_number : joi.number().required(),
        gender : joi.string().required(),
        DOB : joi.date().required(),
        profile_picture : joi.string().required()
    })
    const {error} = validationData.validate({
        name : name, email : email, phone_number : phone_number, gender : gender,
        DOB : DOB, profile_picture : profile_picture
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    }
}

const sellerSignUpValidation = (req, res, next) => {
    const {name, email, password, phone_number, store_name} = req.body
    const validationData = joi.object({
        name : joi.string().min(5).max(30).required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(16).alphanum().required(),
        phone_number : joi.number().required(),
        store_name : joi.string().min(5).max(30).required()
    })
    const {error} = validationData.validate({
        name : name, 
        email : email,
        password : password,
        phone_number : phone_number,
        store_name : store_name
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

const sellerUpdateValidation = (req, res, next) => {
    const {name, email, phone_number, profile_picture, store_name, store_description} = req.body
    const validationData = joi.object({
        name : joi.string().min(5).max(30).required(),
        email : joi.string().email().required(),
        phone_number : joi.number().required(),
        profile_picture : joi.string().required(),
        store_name : joi.string().min(5).max(30).required(),
        store_description : joi.string().required()
    })
    const {error} = validationData.validate({
        name : name, 
        email : email,
        phone_number : phone_number,
        profile_picture : profile_picture,
        store_name : store_name,
        store_description : store_description
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

const productFormValidation = (req, res, next) => {
    const {category_id, seller_id, name, price, condition, stock, description,
        image1, image2, image3, image4, image5} = req.body
    const validationData = joi.object({
        category_id : joi.string().required(),
        seller_id : joi.string().required(),
        name : joi.string().min(5).max(30).required(),
        price : joi.number().required(),
        condition : joi.string().required(),
        stock : joi.number().required(),
        description : joi.string().required(),
        image1 : joi.string().required(),
        image2 : joi.string().required(),
        image3 : joi.string().required(),
        image4 : joi.string().required(),
        image5 : joi.string().required()
    })
    const {error} = validationData.validate({
        category_id : category_id, seller_id : seller_id, name : name, 
        price : price, condition : condition, stock : stock, description : description,
        image1 : image1, image2 : image2, image3 : image3, image4 : image4, image5 : image5
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

const productCategoryForm = (req, res, next) => {
    const {name} = req.body
    const validationData = joi.object({
        name : joi.string().min(5).max(30).required()
    })
    const {error} = validationData.validate({
        name : name
    })
    if (error) {
        const errorMessage = error.details[0].message
        return next(createError(422, errorMessage))
    } else {
        next()
    }
}

module.exports = {
    customerSignUpValidation,
    customerUpdateValidation,
    sellerSignUpValidation,
    sellerUpdateValidation,
    productFormValidation,
    productCategoryForm
}