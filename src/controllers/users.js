const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const userQuery = require('../models/users')

const customerSignUp = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const {name, email, password} = req.body
        const customerId = uuidv4()
        const hashedPassword = await bcrypt.hash(password, salt)
        const customerData = {
            id : customerId,
            name : name,
            email : email,
            password : hashedPassword,
            phone_number : `0821`
        }
        const result = await userQuery.customerSignUp(customerData)
        commonHelper.response(res, result, 200, `New Customer with id : ${customerId} is created`, null)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const customerLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const loginData = {
            email : email,
            password : password
        }
        const findCustomer = await userQuery.customerLogin(loginData)
        if (findCustomer) {
            const checkPassword = await bcrypt.compare(password, findCustomer[0].password)
            if (checkPassword) {
                commonHelper.response(res, findCustomer, 200, `Login Success, welcome customer ${findCustomer[0].id}`, null)
            } else {
                commonHelper.response(res, null, 401, `Your username or password is wrong`, null)
            }
        } else {
            commonHelper.response(res, null, 404, `Your username is not found`, null)
        }
    } catch (error) {
        const err = new createError.InternalServerError()
        next(err)
    }
}

const customerDetail = async (req, res, next) => {
    try {
        const customerId = req.params.id
        const result = await userQuery.customerDetail(customerId)
        commonHelper.response(res, result, 200, `Customer ${customerId} detail:`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const customerUpdate = async (req, res, next) => {
    try {
        const {name, email, phone_number, gender, DOB, profile_picture} = req.body
        const customerId = req.params.id
        const customerData = {
            name : name,
            email : email,
            phone_number : phone_number,
            gender : gender,
            DOB : DOB,
            profile_picture : profile_picture,
            updated_at : new Date()
        }
        const result = await userQuery.customerUpdate(customerData, customerId)
        commonHelper.response(res, result, 200, `Customer with id : ${customerId} is updated`)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const sellerSignUp = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const {name, email, password, phone_number, store_name} = req.body
        const sellerId = uuidv4()
        const hashedPassword = await bcrypt.hash(password, salt)
        const sellerData = {
            id : sellerId,
            name : name, 
            email : email,
            password : hashedPassword, 
            phone_number : phone_number,
            store_name : store_name
        }
        const result = userQuery.sellerSignUp(sellerData)
        commonHelper.response(res, result, 200, `New Seller with di : ${sellerId} is created`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const sellerLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const loginData = {
            email : email,
            password : password
        }
        const findSeller = await userQuery.sellerLogin(loginData)
        if (findSeller) {
            const checkPassword = await bcrypt.compare(password, findSeller[0].password)
            if (checkPassword) {
                commonHelper.response(res, findSeller, 200, `Login Successful! Welcome back seller ${findSeller[0].id}`)
            } else {
                commonHelper.response(res, null, 401, `Your username or password is wrong`, null)
            }
        } else {
            commonHelper.response(res, null, 404, `Your username is not found`, null)
        }
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const sellerDetail = async (req, res, next) => {
    try {
        const sellerId = req.params.id
        const result = await userQuery.sellerDetail(sellerId)
        commonHelper.response(res, result, 200, `Seller ${sellerId} details:`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const sellerUpdate = async (req, res, next) => {
    try {
        const sellerId = req.params.id
        const {name, email, phone_number, profile_picture, store_name, store_description} = req.body
        const sellerData = {
            name : name,
            email : email,
            phone_number : phone_number,
            profile_picture : profile_picture,
            store_name : store_name,
            store_description : store_description
        }
        const result = await userQuery.sellerUpdate(sellerData, sellerId)
        commonHelper.response(res, result, 200, `Seller ${sellerId} is updated`, null)
    } catch (error) {
        console.log(error);
        const err = new createError.InternalServerError()
        next(err)
    }
}

module.exports = {
    customerSignUp,
    customerLogin,
    customerDetail,
    customerUpdate,
    sellerSignUp,
    sellerLogin,
    sellerDetail,
    sellerUpdate
}