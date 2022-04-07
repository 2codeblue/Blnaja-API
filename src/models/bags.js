const connection = require('./../config/dbConfig')

const addItem = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO bag_item SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const addItemsToBags = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO customer_bags SET ?`
        connection.query(sql, customer_bags_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findCustomerBagsId = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id FROM customer_bags WHERE id = ?`
        connection.query(sql, customer_bags_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findItemToUpdateQuantity = (customer_bags_id, product_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, customer_bags_id, product_id, quantity FROM bag_item WHERE customer_bags_id = ? AND product_id = ?`
        connection.query(sql, [customer_bags_id, product_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateQuantityItem = (data, customer_bags_id, bag_item_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE bag_item SET ? WHERE customer_bags_id = ? AND id = ?`
        connection.query(sql, [data, customer_bags_id, bag_item_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getItems = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT bag_item.id, bag_item.product_id, bag_item.size, bag_item.color, 
        bag_item.quantity, products.name, products.price, products.image1, sellers.id as seller_id, 
        sellers.store_name FROM products INNER JOIN bag_item ON products.id = bag_item.product_id 
        INNER JOIN sellers ON products.seller_id = sellers.id 
        WHERE bag_item.customer_bags_id = ?`
        connection.query(sql, customer_bags_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// const deleteItem = (customer_bags_id, )


module.exports = {
    addItem,
    addItemsToBags,
    findCustomerBagsId,
    findItemToUpdateQuantity,
    updateQuantityItem,
    getItems
}