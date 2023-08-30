const mongoose = require('mongoose')

const productsdata = mongoose.Schema({
    id: Number,
    categoria: String,
    descripcion: String,
    unidadmedida:String,
    talla: String,
    marca: String,
    modelo: String,
    cantidad: Number,
    precio: Number,
    validacion: String,
    fecharegistro: String,   
    deleted: {type: Boolean, default:false}
},
{
    timestamps:true
})


const products = mongoose.model('products',productsdata, 'products')
module.exports = products