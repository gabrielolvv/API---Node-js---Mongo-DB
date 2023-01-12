const mongoose = require('mongoose')

const ClientesSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    cpf:{
        type:Number,
        required:true,
        unique:true
    },
    telefone:{
        type:Number,
        required:true,
    },
    cep:{
        type:String,
        required:true,
    },
    bairro:{
        type:String,
        required:true,
    },
    rua:{
        type:String,
        required:true,
    },
    numero:{
        type:String,
        require:true
    },
})

const Clientes = mongoose.model('Clientes',ClientesSchema)

module.exports = Clientes