const express = require('express')
const bagsController = require('../controllers/bags')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('/:id', bagsController.getItems)
route.get('/items', bagsController.getAlltems)
route.post('/add-item', bagsController.addItem)

module.exports = route