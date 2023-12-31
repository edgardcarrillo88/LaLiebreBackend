const express = require('express');
const datarouter = express.Router()
const datacontroller = require('../controllers/data')
const Upload =  require('../middleware/fileprocess')

datarouter.get('/options',datacontroller.loadoptions)
datarouter.get('/productid',datacontroller.productid)
datarouter.get('/getalldata',datacontroller.getalldata)
datarouter.get('/pending',datacontroller.pending)
datarouter.post('/singleregister',datacontroller.singleregister)
datarouter.post('/validation',datacontroller.validation)
datarouter.post('/registerdelivery',datacontroller.registerdelivery)
datarouter.get('/getdeliverydata',datacontroller.getdeliverydata)
datarouter.post('/setdelivery',datacontroller.setdelivery)

datarouter.post('/files',Upload.single('file'),datacontroller.uploadexcel)


module.exports = datarouter