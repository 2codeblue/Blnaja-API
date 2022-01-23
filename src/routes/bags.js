const express = require('express')
const bagsController = require('../controllers/bags')
const route = express.Router()
const validator = require('../middleware/validator')

route.get('/:id', bagsController.getItems)
route.get('/', bagsController.getAlltems)
route.post('/', bagsController.addItem)

module.exports = route