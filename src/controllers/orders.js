const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const ordersQuery = require('../models/orders')

const addOrder = async (req, res, next) => {
    try {
        const {customer_bags_id, total_price, total_quantity, customer_id} = req.body
        const order_id = uuidv4()
        const updateCustomerBagData = {
            total_price : total_price,
            total_quantity : total_quantity,
            status : `Success`
        }
        const addOrderData = {
            id : order_id,
            customer_id : customer_id
        }
        const updateCustomerBag = await ordersQuery.updateCustomerBag(updateCustomerBagData, customer_bags_id)
        const addOrder = await ordersQuery.addOrder(addOrderData)
        const result = {
            updateCustomerBag,
            addOrder
        }
        commonHelper.response(res, result, 200, `Customer Bag ${customer_bags_id} is updated and new order ${order_id} is created`, null)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const getOrdersByCustomerId = async (req, res, next) => {
    try {
        const {customer_id} = req.params.id
        const result = await ordersQuery.getOrdersByCustomerId(customer_id)
        commonHelper.response(res, result, 200, `Order ${result[0].id} of customer ${customer_id}`, null)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}


module.exports = {
    addOrder,
    getOrdersByCustomerId
}