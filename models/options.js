const mongoose = require('mongoose')
const optionsquema = mongoose.Schema(
    {
        categoria: { type: String },
        unidadmedida: { type: String },
        talla: { type: String },
        deleted: { type: Boolean, default: false }
    }, {
    timestamps: true
})
//MODELO
const setting = mongoose.model('setting', optionsquema, 'setting')
module.exports = setting