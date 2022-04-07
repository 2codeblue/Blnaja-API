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

const updateBagItem = (customer_bags_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE bag_item SET status = 'Success' WHERE customer_bags_id = ?`
        connection.query(sql, customer_bags_id, (error, result) => {
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
        const sql = `SELECT orders.id, orders.status, ANY_VALUE(customer_bags.total_price), customer_bags.total_quantity, 
        bag_item.product_id FROM customer_bags INNER JOIN orders ON customer_bags.order_id = orders.id INNER JOIN 
        bag_item ON customer_bags.id = bag_item.customer_bags_id WHERE orders.customer_id = ? GROUP BY customer_bags.order_id`
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
        const sql = `SELECT orders.id, addresses.recipient_name, addresses.recipient_phone_number, addresses.address_type, addresses.address, 
        payment_methods.name, orders.status, customer_bags.total_price, customer_bags.total_quantity, customer_bags.status 
        FROM orders INNER JOIN addresses ON orders.address_id = addresses.id INNER JOIN payment_methods ON orders.payment_method_id = payment_methods.id 
        INNER JOIN customer_bags ON orders.id = customer_bags.order_id WHERE orders.id = ?`
        connection.query(sql, order_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getItemsByOrderId = (order_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT products.name, products.price, products.image1, bag_item.size, bag_item.color, bag_item.quantity 
        FROM bag_item INNER JOIN products ON bag_item.product_id = products.id INNER JOIN customer_bags ON bag_item.customer_bags_id = customer_bags.id 
        WHERE customer_bags.order_id = ?`
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
    updateBagItem,
    checkOrderByCustomerBag,
    getOrdersByCustomerId,
    getOrderDetails,
    getItemsByOrderId
}