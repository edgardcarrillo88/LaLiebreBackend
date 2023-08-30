const mongoose = require('mongoose')

const deliverydata = mongoose.Schema({
    id: String,
    DireccionOrigen: String,
    NoCasaOrigen: String,
    NombreOrigen: String,
    CelularOrigen: String,
    DistritoOrigen: String,
    ReferenciaOrigen: String,
    FechaOrigen: String,
    HoraOrigen: String,

    descripcion: String,
    talla: String,
    cantidad: Number,
    precio: Number,
    programado: String,
    
    DireccionDestino: String,
    NoCasaDestino: String,
    NombreDestino: String,
    CelularDestino: String,
    DistritoDestino: String,
    ReferenciaDestino: String,
    FechaDestino: String,
    HoraDestino: String,

    Motorizado: String,
    
    deleted: {type: Boolean, default:false}
},
{
    timestamps:true
})


const delivery = mongoose.model('delivery',deliverydata, 'delivery')
module.exports = delivery