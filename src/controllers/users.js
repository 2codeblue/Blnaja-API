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
        const err = new createError.InternalServerError()
        next(err)
    }
}

