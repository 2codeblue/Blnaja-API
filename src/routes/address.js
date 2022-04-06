const express = require('express')
const addressController = require('../controllers/address')
const route = express.Router()

route.post('/', addressController.addAddress)
route.get('/:id', addressController.getAddresses)
route.get('/primary-address/:id', addressController.getPrimaryAddress)
route.put('/', addressController.updateAddress)
route.put('/primary-address', addressController.changePrimaryAddress)
route.delete('/', addressController.deleteAddress)

module.exports = route