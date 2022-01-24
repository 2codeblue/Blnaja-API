const connection = require('../config/dbConfig')

const customerSignUp = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO customers SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const customerLogin = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, email, password FROM customers WHERE email = ?`
        connection.query(sql, data.email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const customerDetail = (customerId) => {
    return new Promise ((resolve, reject) => {
        // const sql = `SELECT customers.id, customers.name, customers.email, 
        // customers.phone_number, addresses.id, addresses.recipient_name, addresses.address, 
        // addresses.city, addresses.postal_code FROM customers INNER JOIN addresses ON 
        // customers.id = addresses.customer_id WHERE customers.id = ?`
        const sql = `SELECT * FROM customers WHERE id = ?`
        connection.query(sql, customerId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const customerUpdate = (data, customerId) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE customers SET ? WHERE id = ?`
        connection.query(sql, [data, customerId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

//Seler Queries//
const sellerSignUp = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO sellers SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const sellerLogin = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, email, password FROM sellers WHERE email = ?`
        connection.query(sql, data.email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const sellerDetail = (sellerId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, name, email, phone_number, profile_picture, 
        store_name, store_description FROM sellers WHERE id = ?`
        connection.query(sql, sellerId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const sellerUpdate = (data, sellerId) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE sellers SET ? WHERE id = ?`
        connection.query(sql, [data, sellerId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    customerSignUp,
    customerLogin,
    customerDetail,
    customerUpdate,
    sellerSignUp,
    sellerLogin,
    sellerDetail,
    sellerUpdate
}