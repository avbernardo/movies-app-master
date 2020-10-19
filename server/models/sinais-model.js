const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sinais = new Schema(
    {
        peso_agua : { type : Number, required: false},
        peso_racao: { type: Number, required: false },
        despejar_agua : {type : Boolean , required : false},
        despejar_racao : {type : Boolean, required: false},
        reabastecer_agua : {type : Boolean, required : false},
        reabastecer_racao : {type : Boolean , required : false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('sinais', Sinais)
