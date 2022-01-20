const createError = require('http-errors')
const joi = require('joi')

const customerSignUpValidation = (req, res, next) => {
    const {name, email, password} = req.body
    const validateData = joi.object({
        name : joi.string().min(5).max(30).required,
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
        phone_number : joi.number().min(11).max(15).required(),
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
        name : joi.string().min(5).max(30).required,
        email : joi.string().email().required(),
        password : joi.string().min(8).max(16).alphanum().required(),
        phone_number : joi.number().min(11).max(15).required(),
        store_name : joi.string().min(5).max(30).required
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

module.exports = {
    customerSignUpValidation,
    customerUpdateValidation,
    sellerSignUpValidation
}