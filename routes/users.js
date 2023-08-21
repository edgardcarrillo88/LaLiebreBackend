const express = require('express');
const userrouter = express.Router()
const usercontroller = require('../controllers/users')

userrouter.post('/',usercontroller.create)
userrouter.get('/',usercontroller.verify)

module.exports = userrouter