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

const getItems = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT bag_item.id, bag_item.product_id, bag_item.size, bag_item.color, 
        bag_item.quantity, products.name, sellers.store_name FROM products INNER JOIN 
        bag_item ON products.id = bag_item.product_id INNER JOIN sellers ON products.seller_id = 
        sellers.id WHERE bag_item.id = ?`
        connection.query(sql, customer_bags_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


module.exports = {
    addItem,
    getItems
}