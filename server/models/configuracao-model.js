const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Configuracao = new Schema(
    {
        nome_configuracao : {type : String, required:true},
        horario_quantidade_alimentacao: { type: [{}], required: false },
        alimentado : {type : [Boolean] , required : false},
        movimento_agua : {type : Boolean, required: true},
        ativo : {type : Boolean, required : true},
        usuario_id : {type : mongoose.Schema.Types.ObjectId,ref : 'usuarios' , required : true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('configuracoe', Configuracao)
