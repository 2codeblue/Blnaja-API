const { v4 : uuidv4 } = require('uuid')
const createError = require('http-errors')
const commonHelper = require('../helper/common')
const bagsQuery = require('../models/bags')

const addItem = async (req, res, next) => {
    try {
        const { product_id, customer_bags_id, size, color, qty } = req.body
        const customer_bag_1 = customer_bags_id
        const customer_bag_2 = await bagsQuery.findCustomerBagsId(customer_bag_1)
        console.log(customer_bag_2);
        if (customer_bag_2.length === 0) {
            const bag_item_id = uuidv4()
            const itemData = {
                id : bag_item_id,
                customer_bags_id : customer_bag_1,
                product_id : product_id,
                size : size,
                color : color,
                quantity : qty
            }
            const bagData = {
                id : customer_bag_1
            }
            const addIdToBag = await bagsQuery.addItemsToBags(bagData)
            const addItemToBag = await bagsQuery.addItem(itemData)
            const result = {
                addIdToBag,
                addItemToBag
            }
            commonHelper.response(res, result, 200, 
                `New Bag is created with id : ${customer_bag_1} and product ${product_id} is added to this bag`, null)
        } else if (customer_bag_1 === customer_bag_2[0].id) {
            const bag_item_id_target = await bagsQuery.findItemToUpdateQuantity(customer_bag_1, product_id)
            console.log(bag_item_id_target);
            if (bag_item_id_target.length === 0) {
                const bag_item_id = uuidv4()
                const itemData = {
                    id : bag_item_id,
                    customer_bags_id : customer_bag_1,
                    product_id : product_id,
                    size : size,
                    color : color,
                    quantity : qty
                }
                const addItemToBag = await bagsQuery.addItem(itemData)
                commonHelper.response(res, addItemToBag, 200, `Product ${product_id} is added to customer bags : ${customer_bag_1}`, null)
            } else if (bag_item_id_target[0].customer_bags_id === customer_bag_1 && bag_item_id_target[0].product_id === product_id) {
                const bag_item_id = bag_item_id_target[0].id
                const bag_item_qty = bag_item_id_target[0].quantity + qty
                const itemData = {
                    quantity : bag_item_qty
                }
                const updateItemInBag = await bagsQuery.updateQuantityItem(itemData, customer_bag_1, bag_item_id)
                commonHelper.response(res, updateItemInBag, 200, `Product ${bag_item_id}'s quantity in bag ${customer_bag_1} is updated`, null)
            }
        }
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const getItems = async (req, res, next) => {
    try {
        const customer_bags_id = req.params.id
        const result = await bagsQuery.getItems(customer_bags_id)
        commonHelper.response(res, result, 200, `List items of bags : ${customer_bags_id}`)
    } catch (error) {
        console.log(error.message)
        next({ status: 500, message: `${error.message}`})
    }
}


module.exports = {
    addItem,
    getItems
}