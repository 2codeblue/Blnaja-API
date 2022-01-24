const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const bagsQuery = require('../models/bags')

const addItem = async (req, res, next) => {
    try {
        const { product_id, customer_bags_id, size, color, qty } = req.body
        const bag_item_id = uuidv4()
        const bagData = {
            id : customer_bags_id
        }
        const itemData = {
            id : bag_item_id,
            customer_bags_id : customer_bags_id,
            product_id : product_id,
            size : size,
            color : color,
            quantity : qty
        }
        console.log(itemData)
        const addIdToBag = await bagsQuery.addItemsToBags(bagData)
        const addItemToBag = await bagsQuery.addItem(itemData)
        const result = {
            addIdToBag,
            addItemToBag
        }
        commonHelper.response(res, result, 200, `Product ${product_id} is added to customer bags : ${customer_bags_id}`, null)
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
        commonHelper.response(res, result, 200, `List items of bags : ${customer_bags_id}`)
    } catch (error) {
        console.log(error.message)
        const err = new createError.InternalServerError()
        next(err)
    }
}


module.exports = {
    addItem,
    getItems
}