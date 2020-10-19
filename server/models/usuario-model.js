const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema(
    {
        usuario: { type: String, required: true , unique:true },
        senha: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('usuario', Usuario)
