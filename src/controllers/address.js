const { v4 : uuidv4 } = require('uuid')
const commonHelper = require('../helper/common')
const addressQuery = require('../models/address')

const addAddress = async (req, res, next) => {
    try {
        const {
            address_type, 
            recipient_name, 
            recipient_phone_number, 
            address, postal_code, 
            city, 
            address_primary, 
            customer_id 
        } = req.body
        const id_address = uuidv4()
        let data = {
            id : id_address,
            customer_id : customer_id,
            address_type : address_type,
            recipient_name : recipient_name,
            recipient_phone_number : recipient_phone_number,
            address : address,
            postal_code : postal_code,
            city : city
        }
        if (address_primary) {
            const [currentPrimary] = await addressQuery.getCurrentPrimaryAddress(customer_id)
            await addressQuery.changePrimaryAddress(0, currentPrimary.id)
            data = {...data, address_primary : 1}
            const newAddress = await addressQuery.addAddress(data)
            if (newAddress.affectedRows > 0) {
                commonHelper.response(res, newAddress, 200, `New address ${address_type}`)
            }
        } else {
            data = {...data, address_primary : 0}
            const newAddress = await addressQuery.addAddress(data)
            if (newAddress.affectedRows > 0) {
                commonHelper.response(res, newAddress, 200, `New address ${address_type}`)
            }
        }
    } catch (error) {
        console.log(error)
        next({ status: 500, message: `${error.message}`})
    }
}

const getAddresses = async (req, res, next) => {
    try {
        const customer_id = req.params.id
        const result = await addressQuery.getAddressesByCustomerId(customer_id)
        commonHelper.response(res, result, 200, 'List all addresses')

    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const {
            address_id,
            address_type, 
            recipient_name, 
            recipient_phone_number, 
            address, 
            postal_code, 
            city
        } = req.body
        const data = {
            address_type, 
            recipient_name, 
            recipient_phone_number, 
            address, 
            postal_code, 
            city
        }
        const result = await addressQuery.updateAddress(data, address_id)
        if (result.affectedRows > 0) {
            commonHelper.response(res, result, 200, `Address with id : ${address_id} is updated`)
        }
    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

const getPrimaryAddress = async (req, res, next) => {
    try {
        const {customer_id} = req.params.id
        const result = await addressQuery.getCurrentPrimaryAddress(customer_id)
        commonHelper.response(res, result, 200, `Customer ${customer_id}'s current primary address`)
    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

const changePrimaryAddress = async (req, res, next) => {
    try {
        const {new_primary_address_id, customer_id} = req.body
        const [currentPrimary] = await addressQuery.getCurrentPrimaryAddress(customer_id)
        const changePrimaryAddress = await addressQuery.changePrimaryAddress(0, currentPrimary.id)
        if (changePrimaryAddress.affectedRows > 0) {
            const newPrimary = await addressQuery.changePrimaryAddress(1, new_primary_address_id)
            if (newPrimary.affectedRows > 0) {
                commonHelper.response(res, newPrimary, 200, `New primary address is changed to ${new_primary_address_id}`)
            }
        }
    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

const deleteAddress = async (req, res, next) => {
    try {
        const {address_id} = req.body
        const result = await addressQuery.deleteAddress(address_id)
        if (result.affectedRows > 0) {
            commonHelper.response(res, newPrimary, 200, `Address ${address_id} is deleted`)
        }
    } catch (error) {
        next({ status: 500, message: `${error.message}`})
    }
}

module.exports = {
    addAddress,
    getAddresses,
    updateAddress,
    getPrimaryAddress,
    changePrimaryAddress,
    deleteAddress
}