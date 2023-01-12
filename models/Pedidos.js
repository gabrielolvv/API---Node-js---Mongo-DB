const mongoose = require('mongoose')

const PedidosSchema = new mongoose.Schema({
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

const Pedidos = mongoose.model('Pedidos',PedidosSchema)

module.exports = Pedidos