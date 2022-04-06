const commonHelper = require('../helper/common')
const paymentQuery = require('../models/payments')

const getPaymentMethods = async (req, res, next) => {
    try {
        const result = await paymentQuery.getPaymentMethods()
        commonHelper.response(res, result, 200, 'List of Payment Methods')
    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

module.exports = {
    getPaymentMethods
}