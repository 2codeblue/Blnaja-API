const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const bagsQuery = require('../models/bags')


const addItem = async (req, res, next) => {
    try {
        const {product_id, customer_bags_id, size, color, quantity} = req.body
        customer_bags_id ? customer_bags_id : uuidv4()
        const bag_item_id = uuidv4()
        const itemData = {
            bag_item_id : bag_item_id,
            product_id : product_id,
            customer_bags_id : customer_bags_id,
            size : size,
            color : color,
            quantity :quantity
        }
        const result = await bagsQuery.addItem(itemData)
        commonHelper.response(res, result, 200, `Item ${bag_item_id} is added to ${customer_bags_id}`, null)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const getItems = async (req, res, next) => {
    try {
        const customer_bags_id = req.params.id
        const result = await bagsQuery.getItems(customer_bags_id)
        commonHelper.response(res, result, 200, `All items in cart ${customer_bags_id}`)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const {bag_item_id, customer_bags_id, quantity} = req.body
        const itemData = {
            quantity : quantity
        }
        const result = await bagsQuery.updateItem(itemData, bag_item_id, customer_bags_id)
        commonHelper.response(res, result, 200, `Item ${bag_item_id} of ${customer_bags_id} is updated`)
    } catch (error) {
        console.log(error)
        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    addItem,
    getItems,
    updateItem,

}