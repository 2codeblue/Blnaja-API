const connection = require('./../config/dbConfig')

const getProducts = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT products.name, products.price, sellers.name FROM products INNER JOIN 
        sellers ON products.seller_id = sellers.id`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getProductDetail = (productId) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT products.id, products.name, products.price, products.price, 
        products.condition, products.stock, products.description, products.image1, products.image2, products.image3, 
        products.image4, products.image5, product_category.name, sellers.store_name FROM products 
        INNER JOIN product_category ON products.category_id = product_category.id INNER JOIN sellers 
        ON products.seller_id = sellers.id WHERE products.id = ?`
        connection.query(sql, productId, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getProductCategory = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM product_category`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const addProduct = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO products SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const addProductCategory = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO product_category SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateProduct = (data, productId) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE products SET ? WHERE id = ?`
        connection.query(sql, [data, productId], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getProducts,
    getProductDetail,
    getProductCategory,
    addProduct,
    addProductCategory,
    updateProduct,
}