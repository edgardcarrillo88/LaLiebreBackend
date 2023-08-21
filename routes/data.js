const express = require('express');
const datarouter = express.Router()
const datacontroller = require('../controllers/data')

datarouter.get('/options',datacontroller.loadoptions)
datarouter.get('/productid',datacontroller.productid)
datarouter.get('/getalldata',datacontroller.getalldata)
datarouter.post('/singleregister',datacontroller.singleregister)

module.exports = datarouter