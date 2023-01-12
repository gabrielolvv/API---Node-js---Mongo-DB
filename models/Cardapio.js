const mongoose = require('mongoose')

const CardapioSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        unique:true
    },
    descricao:{
        type:String,
        required:true,
    },
    valorAtual:{
        type:Number,
        required:true,
    },
    valorAnterior:{
        type:Number,
        required:true,
    },
    valorOferta:{
        type:Number,
        required:true,
    },
    nomeRestaurante:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        require:true
    }, 
    foto:{
        type:String
    }
})

const Cardapio = mongoose.model('Cardapio',CardapioSchema)

module.exports = Cardapio