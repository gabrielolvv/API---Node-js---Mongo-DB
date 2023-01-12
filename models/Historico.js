const mongoose = require('mongoose')

const HistoricoSchema = new mongoose.Schema({
    cliente:{
        type:String,
        required:true,
    },
    prato:{
        type:String,
        required:true,
    },
    valor:{
        type:Number,
        required:true,
    },
    dataPedido:{
        type:Date,
        required:true,
    },
    dataEntrega:{
        type:Date,
        required:true,
    },
    observacao:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        require:true
    },
})

const Historico = mongoose.model('Historico',HistoricoSchema)

module.exports = Historico