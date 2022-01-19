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

const customerDetail = (customerId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT customers.id, customers.name, customers.email, 
        customers.phone_number, addresses.id, addresses.recipient_name, addresses.address, 
        addresses.city, addresses.post_code FROM customers INNER JOIN addresses ON 
        customers.id = addresses.customer_id WHERE customers.id = ?`
        connection.query(sql, customerId, (error, result) => {
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
    sellerSignUp,
    sellerLogin
}