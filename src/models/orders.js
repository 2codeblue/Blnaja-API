const connection = require('../config/dbConfig')

const addOrder = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO orders SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateCustomerBag = (data, customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE customer_bags SET ? WHERE id = ?`
        connection.query(sql, [data, customer_bags_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const checkOrderByCustomerBag = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT order_id FROM customer_bags WHERE id = ?`
        connection.query(sql, customer_bags_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getOrdersByCustomerId = (customer_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT orders.id, orders.customer_id, orders.payment_method_id, 
        orders.address_id, orders.status, customer_bags.total_price, bag_item.product_id, bag_item.quantity 
        FROM customer_bags INNER JOIN orders ON customer_bags.order_id = orders.id INNER JOIN 
        bag_item ON customer_bags.id = bag_item.customer_bags_id WHERE orders.customer_id = ?`
        connection.query(sql, customer_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getOrderDetails = (order_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT orders.id, orders.customer_id, orders.payment_method_id, 
        orders.address_id, orders.status, customer_bags.total_price, customer_bags.total_quantity, 
        bag_item.product_id, bag_item.quantity, bag_item.size, bag_item.color 
        FROM customer_bags INNER JOIN orders ON customer_bags.order_id = orders.id 
        INNER JOIN bag_item ON customer_bags.id = bag_item.customer_bags_id 
        WHERE orders.status = 'Success' AND orders.id = ?`
        connection.query(sql, order_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


module.exports = {
    addOrder,
    updateCustomerBag,
    checkOrderByCustomerBag,
    getOrdersByCustomerId,
    getOrderDetails
}