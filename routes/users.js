const express = require('express');
const userrouter = express.Router()
const usercontroller = require('../controllers/users')
const validatetoken = require('../middleware/validatetoken')

userrouter.post('/',usercontroller.create)
userrouter.post('/login',usercontroller.verify)
userrouter.get('/profile',validatetoken, usercontroller.profile)

module.exports = userrouter






