const connection = require('../config/dbConfig')

const addAddress = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO addresses SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAddressesByCustomerId = (customer_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM addresses WHERE customer_id = ? ORDER BY address_primary = 1 DESC`
        connection.query(sql, customer_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


const updateAddress = (data, address_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE addresses SET ? WHERE id = ? AND `
        connection.query(sql, [data, address_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getCurrentPrimaryAddress = (customer_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id FROM addresses WHERE customer_id = ? AND address_primary = 1`
        connection.query(sql, customer_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const changePrimaryAddress = (value, address_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE addresses SET address_primary = ? WHERE id = ?`
        connection.query(sql, [value, address_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteAddress = (address_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `DELETE FROM addresses WHERE id = ?`
        connection.query(sql, address_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    addAddress,
    getAddressesByCustomerId,
    updateAddress,
    getCurrentPrimaryAddress,
    changePrimaryAddress,
    deleteAddress
}