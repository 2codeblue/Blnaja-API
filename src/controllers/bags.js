const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const bagsQuery = require('../models/bags')

const addItem = async (req, res, next) => {
    try {
        const { product_id, customer_bags_id, size, qty, color } = req.body
        const bag_item_id = uuidv4()
        const itemData = {
            id : bag_item_id,
            customer_bags_id : customer_bags_id,
            product_id : product_id,
            size : size,
            color : color,
            quantity : qty
        }
        const result = await bagsQuery.addItem(itemData)
        commonHelper.response(res, result, 200, `Product ${product_id} is added to customer bags : ${customer_bags_id}`, null)
    } catch (error) {
        console.log(error.message)
        const err = new createError.InternalServerError()
        next(err)
    }
}

const getItems = async (req, res, next) => {
    try {
        const customer_bags_id = req.params.id
        const result = await bagsQuery.getItems(customer_bags_id)
        commonHelper.response(res, result, 200, `List items of bags : ${customer_bags_id}`)
    } catch (error) {
        
    }
}

const getAlltems = async (req, res, next) => {
    try {
        const result = await bagsQuery.getItems()
        commonHelper.response(res, result, 200, `List items`)
    } catch (error) {
        
    }
}

module.exports = {
    addItem,
    getItems,
    getAlltems
}