const connection = require('../config/dbConfig')

const getPaymentMethods = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM payment_methods`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getPaymentMethods
}