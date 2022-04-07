const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const ordersQuery = require('../models/orders')
const addressQuery = require('../models/address')
const productQuery = require('../models/products')

const addOrder = async (req, res, next) => {
    try {
        const {customer_bags_id, total_price, total_quantity, customer_id, payment_method_id} = req.body
        const order_id = uuidv4()
        const updateCustomerBagData = {
            order_id : order_id,
            total_price : total_price,
            total_quantity : total_quantity,
            status : `Success`
        }
        const [primaryAddress] = await addressQuery.getCurrentPrimaryAddress(customer_id, 1)
        const addOrderData = {
            id : order_id,
            customer_id : customer_id,
            address_id  : primaryAddress.id,
            payment_method_id : payment_method_id,
            status : 'Success'
        }
        const addOrder = await ordersQuery.addOrder(addOrderData)
        const updateCustomerBag = await ordersQuery.updateCustomerBag(updateCustomerBagData, customer_bags_id)
        const updateBagItem = await ordersQuery.updateBagItem(customer_bags_id)
        const result = {
            updateCustomerBag,
            addOrder,
            updateBagItem
        }
        commonHelper.response(res, result, 200, `Customer Bag ${customer_bags_id} is updated and new order ${order_id} is created`, null)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const getOrdersByCustomerId = async (req, res, next) => {
    try {
        const customer_id = req.params.id
        const result = []
        let listOrders = await ordersQuery.getOrdersByCustomerId(customer_id)
        for (let i = 0; i < listOrders.length; i++) {
            const [productDisplay] = await productQuery.getProductDetail(listOrders[i].product_id)
            const order = {
                orderDetails : listOrders[i],
                productDisplay : {
                    name : productDisplay.name,
                    category : productDisplay.category_name,
                    price : productDisplay.price,
                    image : productDisplay.image1,
                    store : productDisplay.store_name
                }
            }
            result.unshift(order)
        }
        commonHelper.response(res, result, 200, `List orders of customer ${customer_id}`, null)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const getOrderDetails = async (req, res, next) => {
    try {
        const order_id = req.params.id
        const orderDetails = await ordersQuery.getOrderDetails(order_id)
        const items = await ordersQuery.getItemsByOrderId(order_id)
        const result = {
            orderDetails : orderDetails,
            listItems : items
        }
        commonHelper.response(res, result, 200, `Order ${order_id} details.`)
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}


module.exports = {
    addOrder,
    getOrdersByCustomerId,
    getOrderDetails
}